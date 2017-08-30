//显示用户名的过滤器
Vue.filter('userName', function(userId) {
	var userInfo = departUserInfo.value[userId];
	if(userInfo != undefined) {
		return userInfo.name; //返回人员信息中的名字
	} else {
		return userId; //返回传入的值
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
		clickPerson: function(publisherId) {
			this.$emit("click-person", publisherId);
		},
		clickContent: function(id, index) {
			this.$emit("click-content", id, index);
		},
		clickFunction: function(type, id, index) {
			this.$emit("click-function", type, id, index);
		},
	}
});

//添加动态组件
Vue.component("add-trends", {
	template: "#temp_add_trends_com",
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
		commit: function() {
			this.$emit("commit");
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
	props: ["id", "value", "index"],
	computed: {
		showPraiseComment: function() {
			//是否显示点赞和评论区域
			return this.value.LikeUsers.length > 0 || this.value.Comments.length > 0;
		},
		showLine: function() {
			//是否显示点赞和评论之间的横线
			return this.value.LikeUsers.length > 0 && this.value.Comments.length > 0;
		},
		PublisherImage: function() {
			//发布者的头像
			var userInfo = departUserInfo.value[this.value.PublisherId];
			if(userInfo != undefined && userInfo.avatar != "") {
				return userInfo.avatar + "100";
			} else {
				return utils.updateHeadImage("", 2);
			}
		}
	},
	methods: {
		/**
		 * 是否显示删除按钮
		 * @param {Object} publisherId
		 */
		showTrash: function(publisherId) {
			if(publisherId == mineUserInfo.userid) {
				return true;
			} else {
				return false;
			}
		},
		/**
		 * 点击发布动态者的头像或名称
		 * @param {String} id
		 */
		clickPerson: function(publisherId) {
			this.$emit("click-person", publisherId);
		},
		/**
		 * 点击动态的内容
		 * @param {String} id 动态的列表id
		 * @param {Number} index 动态在列表中的序号
		 */
		clickContent: function(id, index) {
			this.$emit("click-content", id, index);
		},
		/**
		 * 点击动态的赞，评论，删除按钮
		 * @param {String} type 按钮序号 0,赞;1,评论;2,删除;
		 * @param {String} id 动态的列表id
		 * @param {Number} index 动态在列表中的序号
		 */
		clickFunction: function(type, id, index) {
			this.$emit("click-function", type, id, index);
		},
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
		clickComment: function(comment_index, replys_index) {
			console.log("clickComment:" + comment_index + " " + replys_index);
		}
	}
});
//显示图片组件
Vue.component("image-item", {
	template: "#temp_show_image",
	props: ["images", "imagesThumb"],
	methods: {
		showImage: function(index) {
			var pb = $.photoBrowser({
				initIndex: index,
				items: this.images
			});
			pb.open();
		}
	}
});