//我的个人信息model,查看参数详细信息请访问:http://open.work.weixin.qq.com/wwopen/doc#10019
var mineUserInfo = {};
//记录我所处的部门的所有人的用户信息
var departUserInfo = {
	key: [],
	value: {}
};
var temp_data; //临时变量;用于查询我所处部门的所有成员
var show_class_circle_app = true; //是否显示班级圈app
var router; //路由
var router_user_space; //个人空间路由
//班级圈主页数据
var home_data = {
	is_on: 0, //当前显示的列表
	data: [{
		id: "all_trends_0", //tab列表的id
		title: "全部动态", //tab的名称
		scrollTop: 0, //tab列表的滚动距离
		leave: false, //是否离开
		init_getData: false, //首次显示列表时是否获取数据
		allow_loaddata: false, //允许下刷新或者加载中
		init_loadmore: true, //是否初始化加载更多
		show_loadmore: true, //是否显示加载中
		show_loadmore_loading: true, //是否显示加载中的转圈图标
		show_loadmore_content: "加载中", //加载中元素的文字
		data: [] //tab列表的数据
	}, {
		id: "mine_trends_1",
		title: "我的动态",
		scrollTop: 0,
		leave: false,
		init_getData: true, //首次显示列表时是否获取数据
		allow_loaddata: false, //允许下刷新或者加载中
		init_loadmore: true, //是否初始化加载更多
		show_loadmore: true, //是否显示加载中
		show_loadmore_loading: true, //是否显示加载中的转圈图标
		show_loadmore_content: "加载中", //加载中元素的文字
		data: []
	}, {
		id: "relate_to_me_2",
		title: "与我相关",
		scrollTop: 0,
		leave: false,
		init_getData: true, //首次显示列表时是否获取数据
		allow_loaddata: false, //允许下刷新或者加载中
		init_loadmore: true, //是否初始化加载更多
		show_loadmore: true, //是否显示加载中
		show_loadmore_loading: true, //是否显示加载中的转圈图标
		show_loadmore_content: "加载中", //加载中元素的文字
		data: [1, 2]
	}]
};
var space_data = {}; //空间的所有数据

window.onload = function() {
	mui.init({
		beforeback: function() {
			console.log("beforeback:");
			router.back();
			return false;
		}
	});

	//console.log("href:" + window.location.href);
	//$.showLoading('正在加载');
	initRouter();
	//获取我的信息
	//getUserInfo("");

	//$.hideLoading();
	temp_data = null;
	//	//显示班级圈主页
	router.push('home');
	//	//禁止全部动态列表进行下拉刷新和上拉加载中
	//	home_data.data[0].allow_loaddata = false;
	//	//获取全部动态
	getHomeTrends(0, 1);
}

//设置路由
function initRouter() {
	//班级圈主页
	var class_circle_home = {
		template: "#router_class_circle_home",
		data: function() {
			return home_data;
		},
		methods: {
			/**
			 * 改变显示的列表
			 * @param {Object} index
			 */
			clickItem: function(index) {
				if(index == this.is_on) {
					return;
				}
				console.log("clickItem:" + index);
				//首次显示获取数据
				if(this.data[index].init_getData) {
					this.data[index].init_getData = false;
					if(index == 1) {
						console.log("获取我的动态的数据");
						getHomeTrends(1, 1)
					} else if(index == 2) {
						console.log("获取与我相关的数据");
					}
				}

				this.data[this.is_on].scrollTop = $("#" + this.data[this.is_on].id).scrollTop();
				this.is_on = index;
				if(this.data[this.is_on].leave) {
					this.data[this.is_on].leave = false;
					var timeId = setInterval(function() {
						homeToBeforePosition(timeId, home_data.is_on);
					}, 100);
				}
			},
			/**
			 * 点击发布动态者的头像或者名称或者评论者(回复者)的名称
			 * @param {String} userId 用户id
			 */
			clickPerson: showPersonTrends,
			/**
			 * 显示动态的详细内容或者查看全部按钮
			 * @param {Number} listIndex 列表的序号
			 * @param {Number} valueIndex 数据的序号
			 */
			clickContent: function(listIndex, valueIndex) {
				console.log("clickContent:" + listIndex + ":" + valueIndex);
				showTrendsDetails(this.data[listIndex].data[valueIndex])
			},
			/**
			 * 点击动态的赞，评论，删除按钮
			 * @param {Number} listIndex 列表的序号
			 * @param {Number} valueIndex 数据的序号
			 * @param {Number} type 按钮序号 0,赞;1,评论;2,删除;
			 */
			clickFunction: function(listIndex, valueIndex, type) {
				console.log("clickFunction:" + listIndex + " " + valueIndex + " " + type);
				var trendsValue = this.data[listIndex].data[valueIndex];
				switch(type) {
					case 0:
						changePraise(trendsValue);
						break;
					case 1:
						showAddComments(trendsValue);
						break;
				}
			},
			/**
			 * 点击评论或者回复的内容
			 * @param {Number} listIndex 列表的序号
			 * @param {Number} valueIndex 数据的序号
			 * @param {Object} commentIndex 评论的序号
			 * @param {Object} replysIndex 回复的序号
			 */
			clickComment: function(listIndex, valueIndex, commentIndex, replysIndex) {
				console.log("clickComment:" + listIndex + " " + valueIndex + " " + commentIndex + " " + replysIndex);
				addReplys(this.data[listIndex].data[valueIndex], commentIndex, replysIndex);
			},
			/**
			 * 点击发布动态
			 */
			clickAddTrends: function() {
				router.push({
					name: 'add',
					params: {
						id: 'addTrend',
					}
				});
			}
		},
		/**
		 * 组件显示之前
		 */
		beforeRouteEnter: function(to, from, next) {
			console.log("路由-班级圈主页-显示之前:from:" + from.path + " to:" + to.path);
			if(show_class_circle_app) {
				next(function() {
					//初始化滚动
					initHomePullToRefresh();
					//回滚到之前的位置
					for(var i = 0; i < home_data.data.length; i++) {
						$("#" + home_data.data[i].id).scrollTop(home_data.data[i].scrollTop);
					}
					home_data.data[home_data.is_on].leave = false;
				});
			} else {
				next(false);
			}
		},
		/**
		 * 组件离开之前
		 */
		beforeRouteLeave: function(to, from, next) {
			console.log("路由-班级圈主页-离开之前:from:" + from.path + " to:" + to.path);
			this.data[this.is_on].scrollTop = $("#" + this.data[this.is_on].id).scrollTop();
			this.data[0].leave = true;
			this.data[1].leave = true;
			this.data[2].leave = true;
			next();
		}
	};

	//发布动态或者进行评论
	var trends_add = {
		template: "#router_add_trends",
		data: function() {
			console.log("trends_add:data:")
			return {
				allowBack: false, //允许返回
				content: "", //文字，
				showMedia: false, //是否显示添加图片，视频功能
				images: [], //图片，限制9张
				video: '', //视频，限制一个
				maxlength: 200, //动态限制6000字，评论回复限制200
				placeholder: "不能为空" //输入框提示语
			};
		},
		methods: {
			/**
			 * 点击添加多媒体
			 * @param {Object} type 0,图库;1,相机
			 */
			addMedia: function(type) {
				console.log("trends_add-addMedia:" + type);
			},
			/**
			 * 点击提交按钮
			 */
			submitData: function() {
				console.log("trends_add-submitData:");
				var submitDataContent = $.trim(this.content);
				console.log("submitDataContent:" + submitDataContent);
				if(submitDataContent === "") {
					$.toast("请输入内容", "forbidden");
					return false;
				} else {
					$.showLoading('正在上传数据');
					this.allowBack = false;
					switch(this.$route.params.id) {
						case "addTrend":
							//发布动态
							var submitData = {
								userId: mineUserInfo.userid, //用户ID
								msgTitle: "", //记事标题
								msgContent: submitDataContent, //记事内容
								encType: 3, //附件类型;1图片;2视频;3仅文字;4音频;5图文混排
								encLen: 0, //音视频时长
								encAddr: "", //附件地址
								encImg: "", //附件缩略图地址
								encIntro: "", //附件简介
								noteType: 2, //信息类型
								userIds: [], //推送用户ID
								pubScopes: [1], //发布范围
								pubArea: "" //发布区域
							}
							addTrend(this, submitData);
							break;
						case "addComment":
							//发布评论
							addComment(this, submitDataContent, this.$route.params.trendsValue);
							break;
						case "addReply":
							//发布回复
							addReply(this, submitDataContent, this.$route.params.trendsValue, this.$route.params.replyUserId, this.$route.params.commentIndex, this.$route.params.replysIndex)
							break;
					}
				}
			},
			/**
			 * 组件内的content变化的监控
			 * @param {Object} val
			 */
			contentChange: function(val) {
				this.content = val; //组件内外content双向绑定
			}
		},
		beforeRouteEnter: function(to, from, next) {
			console.log("路由-发布动态或评论-显示之前:from:" + from.path + " to:" + to.path);
			if("/" == from.path || to.params.id == undefined) {
				showClassCircleApp(next);
			} else {
				next(function(vm) {
					console.log("trends_add:id:" + vm.$route.params.id);
					if(vm.$route.params.trendsValue != undefined) {
						console.log("trends_add:trendsValue:", vm.$route.params.trendsValue);
						console.log("trends_add:commentIndex:" + vm.$route.params.commentIndex);
						console.log("trends_add:replysIndex:" + vm.$route.params.replysIndex);
					} else {
						console.log("trends_add:trendsValue:" + vm.$route.params.trendsValue);
					}
					vm.allowBack = true;
					if(vm.$route.params.id == "addTrend") {
						//发布动态
						vm.showMedia = true;
						vm.maxlength = 6000;
						vm.placeholder = "动态:不能为空,最多6000字!";
					} else if(vm.$route.params.id == "addComment") {
						//发布评论
						vm.showMedia = false;
						vm.maxlength = 200;
						vm.placeholder = "评论:不能为空,最多200字!";
					} else if(vm.$route.params.id == "addReply") {
						vm.showMedia = false;
						vm.maxlength = 200;
						vm.placeholder = "回复" + departUserInfo.value[vm.$route.params.replyUserId].name + ":不能为空,最多200字!";
					}
				});
			}
		},
		beforeRouteLeave: function(to, from, next) {
			console.log("路由-发布动态或评论-离开之前:from:" + from.path + " to:" + to.path);
			next(this.allowBack);
		}
	};

	//动态详情
	var trends_details = {
		template: "#router_trends_details",
		data: function() {
			return {
				allowBack: false,
				data: []
			}
		},
		methods: {
			clickPerson: showPersonTrends,
			clickFunction: function(valueIndex, type) {
				console.log("clickFunction:" + valueIndex + " " + type);
				var trendsValue = this.data[valueIndex];
				switch(type) {
					case 0:
						changePraise(trendsValue);
						break;
					case 1:
						showAddComments(trendsValue);
						break;
				}

			},
			clickComment: function(valueIndex, commentIndex, replysIndex) {
				console.log("clickComment:" + valueIndex + " " + commentIndex + ' ' + replysIndex);
				addReplys(this.data[valueIndex], commentIndex, replysIndex);
			}
		},
		beforeRouteEnter: function(to, from, next) {
			console.log("路由-动态详情-显示之前:from:" + from.path + " to:" + to.path);
			if("/" == from.path) {
				showClassCircleApp(next);
			} else {
				next(function(vm) {
					vm.allowBack = true;
					console.log("vm.$route.params:", vm.$route.params)
					if(vm.$route.params.data != undefined) {
						vm.data = [vm.$route.params.data]
					}
				});
			}
		},
		beforeRouteLeave: function(to, from, next) {
			console.log("路由-动态详情-离开之前:from:" + from.path + " to:" + to.path);
			next(this.allowBack);
		}
	}

	/**
	 * 用户个人空间
	 */
	var user_space = {
		template: "#router_user_space",
		methods: {
			/**
			 * 头像加载成功
			 * @param {Object} e
			 */
			headLoad: function(e) {
				var img = e.target;
				var imgWidth = img.width;
				var imgHeight = img.height;
				if(imgWidth > imgHeight) {
					img.style.height = "80px";
					img.style.width = 'initial';
				}
			},
			/**
			 * 头像加载失败
			 * @param {Object} e
			 */
			headError: function(e, level) {
				e.target.src = utils.updateHeadImage("", level);
			},
			/**
			 * 点击发布动态者的头像或者名称或者评论者(回复者)的名称
			 * @param {String} userId 用户id
			 */
			clickPerson: function(userId) {
				console.log();
				if(userId == this.userId) {
					return false;
				}
				showPersonTrends(userId);
			},
			/**
			 * 显示动态的详细内容或者查看全部按钮
			 * @param {Number} valueIndex 数据的序号
			 */
			clickContent: function(valueIndex) {
				console.log("showTrendsDetails:" + valueIndex);
				showTrendsDetails(space_data[this.$route.params.id].data[valueIndex]);
			},
			/**
			 * 点击动态的赞，评论，删除按钮
			 * @param {Number} valueIndex 数据的序号
			 * @param {Number} type 按钮序号 0,赞;1,评论;2,删除;
			 */
			clickFunction: function(valueIndex, type) {
				console.log("clickFunction:" + valueIndex + " " + type);
				var trendsValue = space_data[this.$route.params.id].data[valueIndex];
				switch(type) {
					case 0:
						changePraise(trendsValue);
						break;
					case 1:
						showAddComments(trendsValue);
						break;
				}
			},
			/**
			 * 点击评论或者回复的内容
			 * @param {Number} valueIndex 数据的序号
			 * @param {Object} commentIndex 评论的序号
			 * @param {Object} replysIndex 回复的序号
			 */
			clickComment: function(valueIndex, commentIndex, replysIndex) {
				console.log("clickComment:" + valueIndex + " " + commentIndex + " " + replysIndex);
				addReplys(space_data[this.$route.params.id].data[valueIndex], commentIndex, replysIndex);
			},
			/**
			 * 初始化数据
			 * @param {Object} id 个人空间数据的id
			 * @param {Object} update 是否是复用
			 */
			initData: function(id, leave) {
				console.log("initData:id:", id);
				console.log("initData:space_data:", space_data);
				router_user_space = this;
				var temp_scrollTop = 0;
				if(space_data[id] != undefined) {
					temp_scrollTop = space_data[id].scrollTop;
					temp_leave = space_data[id].leave;
					this.userId = space_data[id].userId;
					this.allow_loaddata = space_data[id].allow_loaddata;
					this.init_loadmore = space_data[id].init_loadmore;
					this.show_loadmore = space_data[id].show_loadmore;
					this.show_loadmore_loading = space_data[id].show_loadmore_loading;
					this.show_loadmore_content = space_data[id].show_loadmore_content;
					if(space_data[id].data == undefined) {
						//未获取数据则获取空间数据
						getUserSpace(space_data[id].userId, 1, id);
					} else {
						this.data = space_data[id].data;
					}
					initSpacePullToRefresh(id);
				}
				if(leave) {
					//复用并且返回上一个页面
					space_data[id].leave = false;
					var timeId = setInterval(function() {
						userSpaceToBeforePosition(timeId, id, temp_scrollTop);
					}, 100);
				} else {
					$(".class-circle-user-space .weui-tab__bd-item").scrollTop(0);
				}
			}
		},
		data: function() {
			return {
				userId: "",
				allow_loaddata: false, //允许下刷新或者加载中
				init_loadmore: true, //是否初始化加载更多
				show_loadmore: true, //是否显示加载中
				show_loadmore_loading: true, //是否显示加载中的转圈图标
				show_loadmore_content: "加载中", //加载中元素的文字
				data: []
			};
		},
		beforeRouteUpdate: function(to, from, next) {
			console.log("路由-用户空间-复用:from.path:" + from.path);
			console.log("路由-用户空间-复用:to.path:" + to.path);
			//记录原页面的滚动距离
			var from_data = space_data[from.params.id];
			if(from_data != undefined) {
				from_data.scrollTop = $(".class-circle-user-space #user_space_" + from.params.id + ".weui-tab__bd-item").scrollTop();
				from_data.leave = true;

			}
			var leave = space_data[to.params.id]
			this.initData(to.params.id, leave);
			//if(from.params.id > to.params.id) {
			//返回上一个空间
			//如果上一个页面的请求还未完成，删除数据会导致赋值异常
			//	delete space_data[from.params.id];
			//}
			next();
		},
		beforeRouteEnter: function(to, from, next) {
			console.log("路由-用户空间-显示之前:from:" + from.path + " to:" + to.path);
			if("/" == from.path) {
				showClassCircleApp(next);
			} else {
				next(function(vm) {
					vm.initData(to.params.id);
				});
			}
		},
		beforeRouteLeave: function(to, from, next) {
			console.log("路由-用户空间-离开之前:from:" + from.path + " to:" + to.path);
			if("/home" == to.path) {
				//回到主页清空空间数据
				space_data = null;
				space_data = {};
			}
			next();
		}
	}

	//配置路由
	router = new VueRouter({
		routes: [{
			path: '/home',
			name: 'home',
			component: class_circle_home,
			mate: {
				keepAlive: true
			}
		}, {
			path: '/trends_add',
			name: 'add',
			component: trends_add,
			mate: {
				keepAlive: false
			}
		}, {
			path: '/trends_details/:id',
			name: 'details',
			component: trends_details,
			mate: {
				keepAlive: true
			}
		}, {
			path: '/user_space/:id',
			name: 'space',
			component: user_space,
			mate: {
				keepAlive: true
			}
		}]
	});

	var class_circle_app = new Vue({
		router: router
	}).$mount('#router_class_circle_app');
}

/**
 * 初始化主页下拉刷新
 */
function initHomePullToRefresh() {
	//初始化下拉刷新
	$("#class_circle_home .weui-tab__bd-item").pullToRefresh();
	$("#class_circle_home .weui-tab__bd-item").on("pull-to-refresh", function() {
		var listIds = this.id.split("_");
		var listId = listIds[listIds.length - 1] * 1;
		if(!home_data.data[listId].allow_loaddata) {
			//禁止下拉刷新和上拉加载中
			$(this).pullToRefreshDone();
			return false;
		}
		console.log("主页下拉刷新:" + listId);
		home_data.data[listId].allow_loaddata = false;
		home_data.data[listId].init_loadmore = true;
		initHomeLoadmore(this.id);
		if(listId === 0 || listId === 1) {
			getHomeTrends(listId, 1, this);
		}
	});

	for(var i = 0; i < home_data.data.length; i++) {
		if(home_data.data[i].init_loadmore) {
			initHomeLoadmore(home_data.data[i].id);
		} else {
			$("#" + home_data.data[i].id + ".weui-tab__bd-item").destroyInfinite();
		}
	}
}

/**
 * 初始化列表加载更多
 */
function initHomeLoadmore(id) {
	$("#" + id + ".weui-tab__bd-item").infinite();
	$("#" + id + ".weui-tab__bd-item").infinite().on("infinite", function() {
		var listIds = this.id.split("_");
		var listId = listIds[listIds.length - 1] * 1;
		if(!home_data.data[listId].allow_loaddata) {
			return false;
		}
		console.log("上拉加载更多:" + listId);
		//禁止下拉刷新和上拉加载中
		home_data.data[listId].allow_loaddata = false;
		if(listId === 0 || listId === 1) {
			getHomeTrends(listId, home_data.data[listId].pageIndex + 1);
		}
	});
}

/**
 * 初始化空间下拉刷新
 */
function initSpacePullToRefresh(spaceId) {
	console.log("initSpacePullToRefresh:" + spaceId);
	//初始化下拉刷新
	$(".class-circle-user-space #user_space_" + spaceId + ".weui-tab__bd-item").pullToRefresh();
	$(".class-circle-user-space #user_space_" + spaceId + ".weui-tab__bd-item").on("pull-to-refresh", function() {
		var ids = this.id.split("_");
		var id = ids[ids.length - 1];
		if(!space_data[id].allow_loaddata) {
			$(this).pullToRefreshDone();
			return false;
		}
		console.log("个人空间下拉刷新:" + id);
		space_data[id].allow_loaddata = false;
		space_data[id].init_loadmore = true;
		getUserSpace(space_data[id].userId, 1, id, this);

	});
	if(space_data[spaceId].init_loadmore) {
		$(".class-circle-user-space #user_space_" + spaceId + ".weui-tab__bd-item").infinite();
		$(".class-circle-user-space #user_space_" + spaceId + ".weui-tab__bd-item").infinite().on("infinite", function() {
			var ids = this.id.split("_");
			var id = ids[ids.length - 1];
			if(!space_data[id].allow_loaddata) {
				return false;
			}
			console.log("个人空间加载更多");
			space_data[id].allow_loaddata = false;
			getUserSpace(space_data[id].userId, space_data[id].pageIndex + 1, id, this);
		});
	}
}

/**
 * 主页到原来的位置
 * @param {Object} timeId
 * @param {Object} index
 */
function homeToBeforePosition(timeId, index) {
	console.log("homeToBeforePosition:" + index);
	var scrollTop_0 = $("#" + home_data.data[index].id).scrollTop();
	var scrollTop_1 = home_data.data[index].scrollTop;
	if(scrollTop_0 == 0 && scrollTop_0 != scrollTop_1) {
		//之前设置回滚到初始位置无效
		$("#" + home_data.data[index].id).scrollTop(home_data.data[index].scrollTop);
	} else {
		clearInterval(timeId);
	}
}

/**
 * 个人空间到原来的位置
 * @param {Object} timeId
 * @param {Object} index
 */
function userSpaceToBeforePosition(timeId, id, scrollTop) {
	console.log("userSpaceToBeforePosition:" + id);
	var ele = $(".class-circle-user-space #user_space_" + id + ".weui-tab__bd-item");
	if(ele.length != 0) {
		ele.scrollTop(scrollTop);
		clearInterval(timeId);
	}
}

/**
 * 获取用户的信息
 * @param {Object} id
 */
function getUserInfo(id) {
	var tempData = {
		cmd: 'userinfo',
		type: 'findpage',
		colv: id
	}
	unitWebsitePro(tempData, function(data) {
		console.log('getUserInfo:', data);
		if(data.RspCode == 0 && data.RspData.userid != undefined) {
			if(id == "") {
				//成功获取我的信息
				mineUserInfo = data.RspData;
				//获取我所属的部门的所有成员
				temp_data = 0;
				getDepartmentMember(mineUserInfo.department[temp_data]);
			}
		} else {
			$.hideLoading();
			$.alert(data.RspTxt, "加载失败");
		}
	});
}

/**
 * 处理获取的成员信息
 * @param {Object} data
 */
function disposeMemberData(data) {
	console.log("处理获取的成员信息:", data);
	if(data.RspCode == 0) {
		for(var i = 0; i < data.RspData.length; i++) {
			if(departUserInfo.value[data.RspData[i].userid] === undefined) {
				var userId = data.RspData[i].userid.toString();
				departUserInfo.key.push(userId);
				departUserInfo.value[userId] = $.extend({}, data.RspData[i]);
			}
		}
	}
	if(temp_data == mineUserInfo.department.length - 1) {
		//处理完我所处部门的所有成员
		console.log("处理完我所处部门的所有成员:", departUserInfo);
		$.hideLoading();
		if(departUserInfo.key.length != 0) {
			temp_data = null;
			show_class_circle_app = true;
			//显示班级圈主页
			router.push('home');
			//禁止全部动态列表进行下拉刷新和上拉加载中
			home_data.data[0].allow_loaddata = false;
			//获取全部动态
			getHomeTrends(0, 1);
		} else {
			$.alert(data.RspTxt, "加载失败");
		}
	} else {
		temp_data++;
		getDepartmentMember(mineUserInfo.department[temp_data]);
	}
}

/**
 * 发送请求获取部门的所有的成员
 * @param {Object} 部门id
 */
function getDepartmentMember(id) {
	var tempData = {
		cmd: 'departpersons',
		type: 'findpage',
		colid: id,
		colv: 0,
		callcol: "info"
	}
	unitWebsitePro(tempData, disposeMemberData);
}

/**
 * 进入动态的详情
 * @param {Object} trendsValue 动态详情的数据
 */
function showTrendsDetails(trendsValue) {
	console.log("showTrendsDetails:", trendsValue);
	router.push({
		name: 'details',
		params: {
			id: new Date().getTime().toString(),
			data: trendsValue
		}
	});
}

/**
 * 进入用户的空间
 * @param {Object} userId 用户id
 */
function showPersonTrends(userId) {
	console.log("showPersonTrends:" + userId);
	var userInfo = departUserInfo.value[userId];
	if(userInfo !== undefined) {
		console.log("userInfo:" + JSON.stringify(userInfo));
		var model = {
			id: new Date().getTime().toString(),
			userId: userId, //用户id
			scrollTop: 0, //滚动距离
			allow_loaddata: false, //允许下刷新或者加载中
			init_loadmore: true, //是否初始化加载更多
			show_loadmore: true, //是否显示加载中
			show_loadmore_loading: true, //是否显示加载中的转圈图标
			show_loadmore_content: "加载中", //加载中元素的文字
			leave: false //是否
		}
		space_data[model.id] = model;
		router.push({
			name: 'space',
			params: model
		});
		//跳转到这个用户的个人空间
	} else {
		console.log("无此人资料");
		//不做任何处理
	}
}

/**
 * 修改动态的赞
 * @param {Object} trendsValue
 */
function changePraise(trendsValue) {
	console.log("changePraise:", trendsValue);
	var submitData = {
		userId: mineUserInfo.userid, //用户ID
		userSpaceId: trendsValue.TabId
	}
	if(trendsValue.IsLike == 0) {
		//设置为点赞
		classCircleProtocol.setUserSpaceLikeByUser(submitData, function(data) {
			if(data.RspCode == 0 && data.RspData.Result == 1) {
				trendsValue.IsLike = 1;
				trendsValue.LikeUsers.push({
					operDate: utils.getCurentTime(),
					userId: mineUserInfo.userid
				})
			} else {
				$.alert(data.RspTxt, "操作失败");
			}
		});
	} else {
		//取消点赞
		classCircleProtocol.delUserSpaceLikeByUser(submitData, function(data) {
			if(data.RspCode == 0 && data.RspData.Result == 1) {
				trendsValue.IsLike = 0;
				for(var i = 0; i < trendsValue.LikeUsers.length; i++) {
					if(trendsValue.LikeUsers[i].userId == mineUserInfo.userid) {
						trendsValue.LikeUsers.splice(i, 1);
						break;
					}
				}
			} else {
				$.alert(data.RspTxt, "操作失败");
			}
		});
	}
}

/**
 * 显示班级圈主页
 * @param {Object} next
 */
function showClassCircleApp(next) {
	if(show_class_circle_app) {
		next({
			path: '/home'
		});
	} else {
		next(false);
	}
}

/**
 * 主页获取动态
 * @param {Number} type 主页列表序号
 * @param {Number} pageIndex 页码
 * @param {Object} element
 */
function getHomeTrends(type, pageIndex, element) {
	var submitData = {
		userId: mineUserInfo.userid, //用户ID
		pageIndex: pageIndex, //当前页数
		pageSize: 10 //每页记录数
	}
	if(type == 1) {
		submitData.publisherIds = [mineUserInfo.userid]; //发布者ID
	} else {
		submitData.publisherIds = departUserInfo.key; //发布者ID
	}
	classCircleProtocol.getAllUserSpacesByUser(submitData, function(data) {
		console.log("getHomeTrends:", data);
		//允许下拉刷新或者上拉加载更多
		home_data.data[type].allow_loaddata = true;
		if(data.RspCode == 0) {
			if(submitData.pageIndex == 1) {
				//下拉刷新或者获取第一页的内容
				home_data.data[type].data = data.RspData.Data;
				//收起下拉刷新
				if(element != undefined) {
					$(element).pullToRefreshDone();
				}
			} else {
				Array.prototype.push.apply(home_data.data[type].data, data.RspData.Data);
			}
			home_data.data[type].pageIndex = pageIndex; //当前页数
			home_data.data[type].TotalPage = data.RspData.TotalPage; //总页数
			if(home_data.data[type].pageIndex >= home_data.data[type].TotalPage) {
				console.log("没有下一页")
				//没有下一页
				//调整插件信息
				home_data.data[type].init_loadmore = false;
				home_data.data[type].show_loadmore_loading = false;
				home_data.data[type].show_loadmore_content = "没有更多了";
				//销毁插件
				$("#" + home_data.data[type].id + ".weui-tab__bd-item").destroyInfinite();
			}
		} else {
			$.alert(data.RspTxt, "加载失败");
		}
		console.log("home_data", home_data);
	});
}

/**
 * 获取用户空间的动态
 * @param {String} publisherIds 发布者ID
 * @param {Number} pageIndex 页码
 * @param {Object} id 路由对象的id
 * @param {Object} element
 */
function getUserSpace(publisherIds, pageIndex, id, element) {
	var submitData = {
		userId: mineUserInfo.userid, //用户ID
		publisherIds: [publisherIds], //发布者ID
		pageIndex: pageIndex, //当前页数
		pageSize: 10 //每页记录数
	}
	classCircleProtocol.getAllUserSpacesByUser(submitData, function(data) {
		console.log("getUserSpace:", data);

		var vm_data = {};
		//允许下拉刷新或者上拉加载更多
		vm_data.allow_loaddata = true;
		//收起下拉刷新
		if(data.RspCode == 0) {
			//收起下拉刷新
			if(element != undefined) {
				$(element).pullToRefreshDone();
			}
			vm_data.data = data.RspData.Data;
			vm_data.pageIndex = pageIndex; //当前页数
			vm_data.TotalPage = data.RspData.TotalPage; //总页数
			if(vm_data.pageIndex >= vm_data.TotalPage) {
				console.log("没有下一页")
				//没有下一页
				//调整插件信息
				vm_data.init_loadmore = false;
				vm_data.show_loadmore_loading = false;
				vm_data.show_loadmore_content = "没有更多了";
				//销毁插件
				$(".class-circle-user-space #user_space_" + id + ".weui-tab__bd-item").destroyInfinite();
			}
		} else {
			$.alert(data.RspTxt, "加载失败");
		}
		try {
			if(space_data[id] != undefined) {
				space_data[id].pageIndex = vm_data.pageIndex;
				space_data[id].TotalPage = vm_data.TotalPage;
				space_data[id].allow_loaddata = vm_data.allow_loaddata;
				space_data[id].init_loadmore = vm_data.init_loadmore;
				space_data[id].show_loadmore_loading = vm_data.show_loadmore_loading;
				space_data[id].show_loadmore_content = vm_data.show_loadmore_content;
				if(submitData.pageIndex == 1) {
					//下拉刷新或者获取第一页的内容
					space_data[id].data = vm_data.data;
				} else {
					Array.prototype.push.apply(space_data[id].data, vm_data.data);
				}
			}
			if(id == router_user_space.$route.params.id) {
				router_user_space.allow_loaddata = space_data[id].allow_loaddata;
				router_user_space.init_loadmore = space_data[id].init_loadmore;
				router_user_space.show_loadmore = space_data[id].show_loadmore;
				router_user_space.show_loadmore_loading = space_data[id].show_loadmore_loading;
				router_user_space.show_loadmore_content = space_data[id].show_loadmore_content;
				router_user_space.data = space_data[id].data;
			}
		} catch(e) {
			console.log("error:" + e.message);
		}
	});
}

/**
 * 进入评论页面
 * @param {Number} trendsValue 动态
 */
function showAddComments(trendsValue) {
	console.log("showAddComments:", trendsValue);
	router.push({
		name: 'add',
		params: {
			id: 'addComment',
			trendsValue: trendsValue,
		}
	});
}

/**
 * 进入回复页面
 * @param {Number} trendsValue 动态
 * @param {Object} commentIndex 评论的序号
 * @param {Object} replysIndex 回复的序号
 */
function addReplys(trendsValue, commentIndex, replysIndex) {
	console.log("addReplys:", trendsValue);
	var Comment;
	if(replysIndex == undefined) {
		//点击评论
		Comment = trendsValue.Comments[commentIndex];
	} else {
		//点击回复
		Comment = trendsValue.Comments[commentIndex].Replys[replysIndex];
	}
	console.log("Comment:", Comment);
	if(Comment.UserId == mineUserInfo.userid) {
		//评论者是自己
		console.log("评论者是自己");
		return false;
	}
	if(departUserInfo.value[Comment.UserId] == undefined) {
		//评论者没有对应资料
		console.log("无此人资料");
		return false;
	}
	router.push({
		name: 'add',
		params: {
			id: 'addReply',
			trendsValue: trendsValue, //动态
			replyUserId: Comment.UserId, //回复人id
			commentIndex: commentIndex, //评论的序号
			replysIndex: replysIndex, //回复的序号
		}
	});
}

/**
 * 发布动态
 * @param {Object} routeAdd 路由对象
 * @param {Object} submitData 提交的数据
 */
function addTrend(routeAdd, submitData) {
	console.log("addTrend:submitData:", submitData);
	classCircleProtocol.addUserSpace(submitData, function(data) {
		console.log("新增动态:", data);
		$.hideLoading();
		routeAdd.allowBack = true;
		if(data.RspCode == 0 && data.RspData.Result != 0) {
			$.toast("发布成功");
			var newTrends = {
				"LikeUsers": [],
				"TabId": data.RspData.Result,
				"Comments": [],
				"MsgContent": submitData.msgContent,
				"EncTypeStr": "",
				"EncType": 3,
				"EncAddr": "",
				"NoteType": 2,
				"MsgContentTxt": submitData.msgContent,
				"PublisherId": submitData.userId,
				"EncImgAddr": "",
				"InShow": 0,
				"NoteTypeStr": "",
				"EncIntro": "",
				"ReadCnt": 0,
				"EncLen": 0,
				"IsLike": 0,
				"PublishDate": utils.getCurentTime()
			}
			home_data.data[0].data.unshift($.extend({}, newTrends));
			home_data.data[1].data.unshift($.extend({}, newTrends));
			router.back();
		} else {
			$.alert(data.RspTxt, "发布失败");
		}
	});
}

/**
 * 添加评论
 * @param {Object} routeAdd 路由对象
 * @param {Object} commentContent 评论内容
 * @param {Object} trendsValue 动态数据
 */
function addComment(routeAdd, commentContent, trendsValue) {
	console.log("addComment:", commentContent, trendsValue);
	var submitData = {
		userId: mineUserInfo.userid, //用户ID
		userSpaceId: trendsValue.TabId, //用户空间ID
		commentContent: commentContent //评论内容
	}
	classCircleProtocol.addUserSpaceComment(submitData, function(data) {
		console.log("新增评论:", data);
		$.hideLoading();
		routeAdd.allowBack = true;
		if(data.RspCode == 0) {
			$.toast("发布成功");
			var newComment = {
				"CommentDate": utils.getCurentTime(),
				"TabId": data.RspData.Result,
				"Replys": [],
				"ReplyId": "0",
				"CommentContent": commentContent,
				"UserId": mineUserInfo.userid,
				"UpperId": 0
			}
			trendsValue.Comments.unshift(newComment);
			router.back();
		} else {
			$.alert(data.RspTxt, "发布失败");
		}
	});
}

/**
 * 添加回复
 * @param {Object} routeAdd 路由对象
 * @param {Object} commentContent 回复内容
 * @param {Object} trendsValue 动态数据
 * @param {Object} replyUserId 回复ID
 * @param {Object} commentIndex 评论的序号
 * @param {Object} replysIndex 回复的序号
 */
function addReply(routeAdd, commentContent, trendsValue, replyUserId, commentIndex, replysIndex) {
	console.log("addReply:", commentContent, trendsValue, replyUserId, commentIndex, replysIndex);
	var submitData = {
		userId: mineUserInfo.userid, //用户ID
		upperId: trendsValue.Comments[commentIndex].TabId, //主评论ID
		replyUserId: replyUserId, //回复ID
		userSpaceId: trendsValue.TabId, //用户空间ID
		commentContent: commentContent //回复内容
	}
	classCircleProtocol.addUserSpaceCommentReply(submitData, function(data) {
		console.log("新增回复:", data);
		$.hideLoading();
		routeAdd.allowBack = true;
		if(data.RspCode == 0) {
			$.toast("发布成功");
			var newReply = {
				"CommentDate": utils.getCurentTime(),
				"TabId": data.RspData.Result,
				"ReplyId": replyUserId,
				"CommentContent": commentContent,
				"UserId": mineUserInfo.userid,
				"UpperId": trendsValue.Comments[commentIndex].TabId
			}
			trendsValue.Comments[commentIndex].Replys.push(newReply);
			router.back();
		} else {
			$.alert(data.RspTxt, "发布失败");
		}
	});
};