//显示用户名的过滤器
Vue.filter('userName', function(userId) {
	var userInfo = departUserInfo.value[userId];
	if(userInfo !== undefined) {
		return userInfo.name; //返回人员信息中的名字
	} else {
		//return userId; //返回传入的值
		return "未知";
	}
});
//显示用户的头像的过滤器
Vue.filter('userImage', function(userId) {
	var userInfo = departUserInfo.value[userId];
	if(userInfo != undefined && userInfo.avatar != "") {
		return userInfo.avatar;
	} else {
		return utils.updateHeadImage("", 2);
	}
});
//显示用户的缩略图头像的过滤器
Vue.filter('userThumbImage', function(userId) {
	var userInfo = departUserInfo.value[userId];
	if(userInfo != undefined && userInfo.avatar != "") {
		return userInfo.avatar + "100";
	} else {
		return utils.updateHeadImage("", 2);
	}
});
//显示图片的过滤器
Vue.filter('imagesArray', function(imagePaths) {
	var images = imagePaths.split('|');
	return images;
});

//显示评论的过滤器
Vue.filter('commentArray', function(commentArray) {
	var limit = 20; //只显示前20条
	var filterArray = [];
	for(var i = 0; i < commentArray.length; i++) {
		if(limit == 0) {
			break;
		}
		//console.log("commentArray[" + i + "]:" + JSON.stringify(commentArray[i]));
		limit--;
		filterArray.push($.extend(true, {}, commentArray[i]));
		filterArray[i].Replys = [];

		for(var j = 0; j < commentArray[i].Replys.length; j++) {
			//console.log("commentArray[" + i + "].Replys[" + j + "]:" + JSON.stringify(commentArray[i].Replys[j]));
			if(limit == 0) {
				break;
			}
			limit--;
			filterArray[i].Replys.push($.extend(true, {}, commentArray[i].Replys[j]));
		}
	}
	return filterArray;
});
//显示评论查看全部的过滤器
Vue.filter('showAllButton', function(commentArray) {
	var isShow = false;
	var limit = 20; //超过20条显示查看全部按钮
	for(var i = 0; i < commentArray.length; i++) {
		limit--;
		if(limit == -1) {
			isShow = true;
			break;
		}
		for(var j = 0; j < commentArray[i].Replys.length; j++) {
			limit--;
			if(limit == -1) {
				isShow = true;
				break;
			}
		}
	}
	return isShow;
});

//班级圈主页tab顶部导航
Vue.component("home-navbar-item", {
	template: "#temp_trends_navbar_item",
	props: ["value", "index", "is_on"],
	computed: {
		isOnClass: function() {
			return {
				'weui-bar__item--on': this.index == this.is_on //计算点中的选项
			}
		}
	},
	methods: {
		/**
		 * 点击顶部导航选项
		 * @param {Object} index
		 */
		click: function(index) {
			this.$emit("click-item", index);
		}
	}
});
//班级圈主页tab列表
Vue.component("home-bd-item", {
	template: "#temp_trends_tab_bd_item",
	props: ["value", "index", "is_on"],
	computed: {
		isOnClass: function() {
			return {
				'weui-tab__bd-item--active': this.index == this.is_on //计算显示的列表
			}
		}
	},
	methods: {
		clickPerson: function(userId) {
			this.$emit("click-person", userId);
		},
		clickContent: function(valueIndex) {
			this.$emit("click-content", this.index, valueIndex);
		},
		clickFunction: function(valueIndex, type) {
			this.$emit("click-function", this.index, valueIndex, type);
		},
		clickComment: function(valueIndex, commentIndex, replysIndex) {
			this.$emit("click-comment", this.index, valueIndex, commentIndex, replysIndex);
		}
	}
});

//添加动态组件
Vue.component("add-trends", {
	template: "#temp_add_trends_com",
	props: ["showMedia"],
	data: function() {
		return {
			com_content: "" //组件内的content
		}
	},
	methods: {
		/**
		 * 点击添加多媒体
		 * @param {Object} type 0,图库;1,相机
		 */
		addMedia: function(type) {
			this.$emit("add-media", type);
		},
		/**
		 * 点击提交按钮
		 */
		submitData: function() {
			this.$emit("submitData");
		}
	},
	watch: {
		/**
		 * 监控组件外的content
		 * @param {Object} val
		 */
		content: function(val) {
			this.com_content = val;
		},
		/**
		 * 监控组件内的content
		 * @param {Object} val
		 */
		com_content: function(val) {
			this.$emit("content-change", val);
		}
	}
});
//动态组件
Vue.component("trends-item", {
	template: "#template_trends",
	props: ["value", "index", "detail"],
	computed: {
		showPraiseComment: function() {
			//是否显示点赞和评论区域
			return this.value.LikeUsers.length > 0 || this.value.Comments.length > 0;
		},
		/**
		 * 是否显示删除按钮
		 */
		showTrash: function() {
			if(this.value.PublisherId === mineUserInfo.userid) {
				return true;
			} else {
				return false;
			}
		},
		showLine: function() {
			//是否显示点赞和评论之间的横线
			return this.value.LikeUsers.length > 0 && this.value.Comments.length > 0;
		}
	},
	methods: {
		/**
		 * 点击发布动态者的头像或名称
		 */
		clickPerson: function() {
			this.$emit("click-person", this.value.PublisherId);
		},
		/**
		 * 点击动态的内容
		 * @param {Number} index 动态在列表中的序号
		 */
		clickContent: function() {
			this.$emit("click-content", this.index);
		},
		/**
		 * 点击动态的赞，评论，删除按钮
		 * @param {String} type 按钮序号 0,赞;1,评论;2,删除;
		 */
		clickFunction: function(type) {
			this.$emit("click-function", this.index, type);
		},
		/**
		 * 点击评论或者回复的内容
		 * @param {Object} commentIndex 评论的序号
		 * @param {Object} replysIndex 回复的序号
		 */
		clickComment: function(commentIndex, replysIndex) {
			this.$emit("click-comment", this.index, commentIndex, replysIndex);
		},
		/**
		 * 点击评论区域的查看全部按钮
		 */
		clickShowAll: function() {
			this.$emit("click-content", this.index);
		},
		/**
		 * 点击评论者或者回复者的名字
		 * @param {Object} userId 用户的id
		 */
		clickName: function(userId) {
			this.$emit("click-person", userId);
		},
		/**
		 * 头像加载成功
		 * @param {Object} e
		 */
		headLoad: function(e) {
			var img = e.target;
			var imgWidth = img.width;
			var imgHeight = img.height;
			if(imgWidth > imgHeight) {
				img.style.height = imgWidth + "px";
				img.style.width = 'initial';
			}
		},
		/**
		 * 头像加载失败
		 * @param {Object} e
		 */
		headError: function(e, level) {
			e.target.src = utils.updateHeadImage("", level);
		}
	}
});
//与我相关组件
Vue.component("relate-item", {
	template: "#temp_relate_to_me",
	props: ["value"]
});
//评论组件
Vue.component("comments-item", {
	template: "#temp_comments",
	props: ["value", "show"],
	methods: {
		/**
		 * 点击评论或者回复的内容
		 * @param {Object} commentIndex 评论的序号
		 * @param {Object} replysIndex 回复的序号
		 */
		clickComment: function(commentIndex, replysIndex) {
			this.$emit("click-comment", commentIndex, replysIndex);
		},
		/**
		 * 点击评论区域的查看全部按钮
		 */
		clickShowAll: function() {
			this.$emit("click-show-all");
		},
		/**
		 * 点击评论者或者回复者的名字
		 * @param {Object} userId 用户的id
		 */
		clickName: function(userId) {
			this.$emit("click-name", userId);
		}
	}
});
//显示图片组件
Vue.component("image-item", {
	template: "#temp_show_image",
	props: ["images", "imagesThumb"],
	methods: {
		/**
		 * 浏览图片原图
		 * @param {Object} index 需要显示的图片的序号
		 */
		showImage: function(index) {
			var pb = $.photoBrowser({
				initIndex: index,
				items: this.images
			});
			pb.open();
		}
	}
});