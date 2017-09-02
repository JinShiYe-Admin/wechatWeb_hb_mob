//班级圈主页数据
var home_data = {
	is_on: 0, //当前显示的列表
	home_tab: [{
		id: "all_trends", //tab列表的id
		title: "全部动态", //tab的名称
		scrollTop: 0, //tab列表的滚动距离
		leave: false, //是否离开
		show_loadmore: true, //是否显示加载更多
		allow_loadmore: false, //允许加载更多
		data: [{
			"LikeUsers": [],
			"TabId": 3,
			"Comments": [{
				"CommentDate": "2017-01-10 09:24:13",
				"TabId": 92,
				"Replys": [],
				"ReplyId": "0",
				"CommentContent": "你好这是对527号评论的回复这是对527号评论的回复这是对527号评论的回复这是对527号评论的回复",
				"UserId": "1",
				"UpperId": 0
			}, {
				"CommentDate": "2017-08-11 11:20:11",
				"TabId": 527,
				"Replys": [{
					"CommentDate": "2017-08-11 11:37:15",
					"TabId": 528,
					"ReplyId": "1",
					"CommentContent": "这是对527号评论的回复这是对527号评论的回复这是对527号评论的回复",
					"UserId": "11",
					"UpperId": 527
				}, {
					"CommentDate": "2017-08-14 10:18:56",
					"TabId": 530,
					"ReplyId": "1",
					"CommentContent": "8-14测试回复",
					"UserId": "1",
					"UpperId": 527
				}, {
					"CommentDate": "2017-08-14 10:21:27",
					"TabId": 531,
					"ReplyId": "123",
					"CommentContent": "8-14测试回复",
					"UserId": "1",
					"UpperId": 527
				}, {
					"CommentDate": "2017-08-14 10:22:10",
					"TabId": 532,
					"ReplyId": "1",
					"CommentContent": "8-14测试回复",
					"UserId": "231",
					"UpperId": 527
				}],
				"ReplyId": "0",
				"CommentContent": "这是8月11号的评论内容的测试",
				"UserId": "1",
				"UpperId": 0
			}, {
				"CommentDate": "2017-08-14 10:32:20",
				"TabId": 533,
				"Replys": [],
				"ReplyId": "0",
				"CommentContent": "8-14测试评论",
				"UserId": "231",
				"UpperId": 0
			}],
			"MsgContent": "<html>\n <head></head>\n <body>\n <p><br><img src=\"http://qn-kfpb.jiaobaowang.net/jbypc/pc/9498620170615111755.jpg\" title=\"01.jpg\" alt=\"01.jpg\" width=\"100%\"><br></p>\n </body>\n</html>",
			"EncTypeStr": "图文混排",
			"EncType": 1,
			"EncAddr": "http://qn-kfpb.jiaobaowang.net/jbypc/pc/9498620170615111755.jpg|http://static.firefoxchina.cn/img/201708/8_59a61038ec68a0.jpg|http://jqweui.com/dist/demos/images/swiper-2.jpg",
			"NoteType": 2,
			"MsgContentTxt": "",
			"PublisherId": "chenuodong",
			"EncImgAddr": "http://qn-kfpb.jiaobaowang.net/jbypc/pc/9498620170615111755.jpg|http://qn-kfpb.jiaobaowang.net/jbypc/pc/9498620170615111755.jpg",
			"InShow": 1,
			"NoteTypeStr": "个人空间动态",
			"EncIntro": "",
			"ReadCnt": 7,
			"EncLen": 0,
			"IsLike": 0,
			"PublishDate": "2017-06-15 11:18:04"
		}] //tab列表的数据
	}, {
		id: "mine_trends",
		title: "我的动态",
		scrollTop: 0,
		leave: false,
		show_loadmore: true,
		allow_loadmore: false,
		data: [{
			"LikeUsers": [],
			"TabId": 3,
			"Comments": [{
				"CommentDate": "2017-01-10 09:24:13",
				"TabId": 92,
				"Replys": [],
				"ReplyId": "0",
				"CommentContent": "你好这是对527号评论的回复这是对527号评论的回复这是对527号评论的回复这是对527号评论的回复",
				"UserId": "1",
				"UpperId": 0
			}, {
				"CommentDate": "2017-08-11 11:20:11",
				"TabId": 527,
				"Replys": [{
					"CommentDate": "2017-08-11 11:37:15",
					"TabId": 528,
					"ReplyId": "1",
					"CommentContent": "这是对527号评论的回复这是对527号评论的回复这是对527号评论的回复",
					"UserId": "11",
					"UpperId": 527
				}, {
					"CommentDate": "2017-08-14 10:18:56",
					"TabId": 530,
					"ReplyId": "1",
					"CommentContent": "8-14测试回复",
					"UserId": "1",
					"UpperId": 527
				}, {
					"CommentDate": "2017-08-14 10:21:27",
					"TabId": 531,
					"ReplyId": "123",
					"CommentContent": "8-14测试回复",
					"UserId": "1",
					"UpperId": 527
				}, {
					"CommentDate": "2017-08-14 10:22:10",
					"TabId": 532,
					"ReplyId": "1",
					"CommentContent": "8-14测试回复",
					"UserId": "231",
					"UpperId": 527
				}],
				"ReplyId": "0",
				"CommentContent": "这是8月11号的评论内容的测试",
				"UserId": "1",
				"UpperId": 0
			}, {
				"CommentDate": "2017-08-14 10:32:20",
				"TabId": 533,
				"Replys": [],
				"ReplyId": "0",
				"CommentContent": "8-14测试评论",
				"UserId": "moshanglin",
				"UpperId": 0
			}],
			"MsgContent": "<html>\n <head></head>\n <body>\n <p><br><img src=\"http://qn-kfpb.jiaobaowang.net/jbypc/pc/9498620170615111755.jpg\" title=\"01.jpg\" alt=\"01.jpg\" width=\"100%\"><br></p>\n </body>\n</html>",
			"EncTypeStr": "图文混排",
			"EncType": 1,
			"EncAddr": "http://qn-kfpb.jiaobaowang.net/jbypc/pc/9498620170615111755.jpg|http://static.firefoxchina.cn/img/201708/8_59a61038ec68a0.jpg|http://jqweui.com/dist/demos/images/swiper-2.jpg",
			"NoteType": 2,
			"MsgContentTxt": "",
			"PublisherId": "moshanglin",
			"EncImgAddr": "http://qn-kfpb.jiaobaowang.net/jbypc/pc/9498620170615111755.jpg|http://qn-kfpb.jiaobaowang.net/jbypc/pc/9498620170615111755.jpg",
			"InShow": 1,
			"NoteTypeStr": "个人空间动态",
			"EncIntro": "",
			"ReadCnt": 7,
			"EncLen": 0,
			"IsLike": 0,
			"PublishDate": "2017-06-15 11:18:04"
		}]
	}, {
		id: "relate_to_me",
		title: "与我相关",
		scrollTop: 0,
		leave: false,
		show_loadmore: true,
		allow_loadmore: false,
		data: [1, 2]
	}]
};

var mineUserInfo = {
	"userid": "moshanglin",
	"name": "莫尚霖",
	"department": [
		11
	],
	"order": [
		0
	],
	"position": "",
	"mobile": null,
	"english_name": "",
	"gender": 1,
	"isleader": 0,
	"telephone": null,
	"email": null,
	"weixinid": null,
	"avatar": "http://shp.qpic.cn/bizmp/LlAHpaR9WIamIqUyfAicDggv1icib12xUv983mowPgnEeMwjJRENdrYhg/",
	"status": 1,
	"extattr": null,
	"errcode": 0,
	"errmsg": "ok",
	"P2PData": null
}; //我的个人信息model,查看参数详细信息请访问:http://open.work.weixin.qq.com/wwopen/doc#10019
var departUserInfo = {
	key: ["moshanglin"],
	value: {
		"moshanglin": {
			"userid": "moshanglin",
			"name": "莫尚霖",
			"department": [
				11
			],
			"order": [
				0
			],
			"position": "",
			"mobile": null,
			"english_name": "",
			"gender": 1,
			"isleader": 0,
			"telephone": null,
			"email": null,
			"weixinid": null,
			"avatar": "http://shp.qpic.cn/bizmp/LlAHpaR9WIamIqUyfAicDggv1icib12xUv983mowPgnEeMwjJRENdrYhg/",
			"status": 1,
			"extattr": null,
			"errcode": 0,
			"errmsg": "ok",
			"P2PData": null
		}
	}
}; //记录所有人的用户信息
var temp_data; //临时变量;用于查询我所处部门的所有成员
var router; //路由

window.onload = function() {
	console.log("href:" + window.location.href);
	$.showLoading('正在加载');
	initRouter();
	//获取我的信息
	//getUserInfo(0);
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
				this.home_tab[this.is_on].scrollTop = $("#" + this.home_tab[this.is_on].id).scrollTop();
				this.is_on = index;
				if(this.home_tab[this.is_on].leave) {
					this.home_tab[this.is_on].leave = false;
					var timeId = setInterval(function() {
						homeToBeforePosition(timeId, home_data.is_on);
					}, 100);
				}
			},
			/**
			 * 点击发布动态者的头像或者名称或者评论者(回复者)的名称
			 * @param {String} userId 用户id
			 */
			showPersonTrends: showPersonTrends,
			/**
			 * 显示动态的详细内容或者查看全部按钮
			 * @param {Number} listIndex 列表的序号
			 * @param {Number} valueIndex 数据的序号
			 */
			showTrendsDetails: function(listIndex, valueIndex) {
				console.log("showTrendsDetails:" + listIndex + ":" + valueIndex);
				showTrendsDetails(this.home_tab[listIndex].data[valueIndex])
			},
			/**
			 * 点击动态的赞，评论，删除按钮
			 * @param {Number} listIndex 列表的序号
			 * @param {Number} valueIndex 数据的序号
			 * @param {Number} type 按钮序号 0,赞;1,评论;2,删除;
			 */
			clickFunction: function(listIndex, valueIndex, type) {
				console.log("clickFunction:" + listIndex + " " + valueIndex + " " + type);
				var trendsValue = this.home_tab[listIndex].data[valueIndex];
				console.log("trendsValue:" + JSON.stringify(trendsValue))
				switch(type) {
					case 0:
						changePraise(trendsValue);
						break;
					case 1:
						router.push({
							name: 'add',
							params: {
								id: 'addComment',
								trendsValue: trendsValue,
							}
						});
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
				router.push({
					name: 'add',
					params: {
						id: 'addReplys',
						trendsValue: this.home_tab[listIndex].data[valueIndex],
						commentIndex: commentIndex,
						replysIndex: replysIndex
					}
				});
			},
			/**
			 * 点击发布动态
			 */
			clickAddTrends: function() {
				router.push({
					name: 'add',
					params: {
						id: 'addTrends',
					}
				});
			}
		},
		/**
		 * 组件显示之前
		 */
		beforeRouteEnter: function(to, from, next) {
			console.log("路由-班级圈主页-显示之前:from:" + from.path + " to:" + to.path);
			next(function() {
				//初始化滚动
				initScroll();
				//回滚到之前的位置
				for(var i = 0; i < home_data.home_tab.length; i++) {
					$("#" + home_data.home_tab[i].id).scrollTop(home_data.home_tab[i].scrollTop);
				}
				home_data.home_tab[home_data.is_on].leave = false;
			});
		},
		/**
		 * 组件离开之前
		 */
		beforeRouteLeave: function(to, from, next) {
			console.log("路由-班级圈主页-离开之前:from:" + from.path + " to:" + to.path);
			this.home_tab[this.is_on].scrollTop = $("#" + this.home_tab[this.is_on].id).scrollTop();
			this.home_tab[0].leave = true;
			this.home_tab[1].leave = true;
			this.home_tab[2].leave = true;
			next();
		}
	};
	//发布动态或者进行评论
	var trends_add = {
		template: "#router_add_trends",
		data: function() {
			return {
				allowBack: false, //允许返回
				content: "", //文字，限制6000字
				showMedia: false, //是否显示添加图片，视频功能
				images: [], //图片，限制9张
				video: '' //视频，限制一个
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
			commit: function() {
				console.log("trends_add-commit:");
				var commitContent = $.trim(this.content);
				console.log("commitContent:" + commitContent);
				if(commitContent === "") {
					$.toast("请输入内容", "forbidden");
					return
				} else {
					$.showLoading('正在上传数据');
					this.allowBack = false;
					setTimeout(function() {
						$.hideLoading();
						$.toast("发布成功");
						this.allowBack = true;
					}, 3000);
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
		beforeRouteUpdate: function(to, from, next) {
			console.log("路由-发布动态或评论-复用:from:" + from.path + " to:" + to.path);
			next();
		},
		beforeRouteEnter: function(to, from, next) {
			console.log("路由-发布动态或评论-显示之前:from:" + from.path + " to:" + to.path);
			if("/" == from.path) {
				next({
					path: '/home'
				})
			} else {
				next(function(vm) {
					vm.allowBack = true;
					console.log("trends_add:id:" + vm.$route.params.id);
					if(vm.$route.params.trendsValue != undefined) {
						console.log("trends_add:trendsValue:" + JSON.stringify(vm.$route.params.trendsValue));
						console.log("trends_add:commentIndex:" + vm.$route.params.commentIndex);
						console.log("trends_add:replysIndex:" + vm.$route.params.replysIndex);
					} else {
						console.log("trends_add:trendsValue:" + vm.$route.params.trendsValue);
					}
					if(vm.$route.params.id === "addTrends") {
						//发布动态
						vm.showMedia = true;
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
			console.log("trends_details:data:" + this.$route.params.data);
			if(this.$route.params.data != undefined) {
				return {
					allowBack: false, //允许返回
					data: [this.$route.params.data]
				}
			} else {
				return {
					allowBack: false,
					data: []
				}
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
						router.push({
							name: 'add',
							params: {
								id: 'addComment',
								trendsValue: trendsValue,
							}
						});
						break;
				}

			},
			clickComment: function(valueIndex, commentIndex, replysIndex) {
				console.log("clickComment:" + valueIndex + " " + commentIndex + ' ' + replysIndex);
				router.push({
					name: 'add',
					params: {
						id: 'addReplys',
						trendsValue: this.data[valueIndex],
						commentIndex: commentIndex,
						replysIndex: replysIndex
					}
				});
			}
		},
		beforeRouteUpdate: function(to, from, next) {
			console.log("路由-动态详情-复用:from:" + from.path + " to:" + to.path);
			next();
		},
		beforeRouteEnter: function(to, from, next) {
			console.log("路由-动态详情-显示之前:from:" + from.path + " to:" + to.path);
			if("/" == from.path) {
				next({
					path: '/home'
				})
			} else {
				next(function(vm) {
					vm.allowBack = true;
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
		data: function() {
			var space_data = {
				userId: "",
				data: []
			};
			space_data.data[0] = $.extend({}, home_data.home_tab[0].data[0]);
			space_data.data[1] = $.extend({}, home_data.home_tab[1].data[0]);
			console.log("trends_details:id:" + this.$route.params.id);
			console.log("trends_details:userId:" + this.$route.params.userId);
			if(this.$route.params.userId != undefined) {
				space_data.userId = this.$route.params.userId;
			}
			return space_data;
		},
		methods: {
			/**
			 * 点击发布动态者的头像或者名称或者评论者(回复者)的名称
			 * @param {String} userId 用户id
			 */
			showPersonTrends: function(userId) {
				if(userId == this.userId) {
					return false;
				}
				showPersonTrends(userId)
			},
			/**
			 * 显示动态的详细内容或者查看全部按钮
			 * @param {Number} valueIndex 数据的序号
			 */
			showTrendsDetails: function(valueIndex) {
				console.log("showTrendsDetails:" + valueIndex);
			},
			/**
			 * 点击动态的赞，评论，删除按钮
			 * @param {Number} valueIndex 数据的序号
			 * @param {Number} type 按钮序号 0,赞;1,评论;2,删除;
			 */
			clickFunction: function(valueIndex, type) {
				console.log("clickFunction:" + valueIndex + " " + type);
				var trendsValue = this.data[valueIndex];
				switch(type) {
					case 0:
						changePraise(trendsValue);
						break;
					case 1:
						router.push({
							name: 'add',
							params: {
								id: 'addComment',
								trendsValue: trendsValue,
								component: this
							}
						});
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
			}
		},
		beforeRouteUpdate: function(to, from, next) {
			console.log("路由-用户空间-复用:from:" + from.path + " to:" + to.path);
			next();
		},
		beforeRouteEnter: function(to, from, next) {
			console.log("路由-用户空间-显示之前:from:" + from.path + " to:" + to.path);
			next();
		},
		beforeRouteLeave: function(to, from, next) {
			console.log("路由-用户空间-离开之前:from:" + from.path + " to:" + to.path);
			next();
		}
	}

	//配置路由
	router = new VueRouter({
		routes: [{
			path: '/home',
			name: 'home',
			component: class_circle_home
		}, {
			path: '/trends_add',
			name: 'add',
			component: trends_add
		}, {
			path: '/trends_details/:id',
			name: 'details',
			component: trends_details
		}, {
			path: '/user_space/:id',
			name: 'space',
			component: user_space
		}]
	});

	var class_circle_app = new Vue({
		router: router
	}).$mount('#router_class_circle_app');

	$.hideLoading();
	//显示班级圈主页
	router.push('/home');
}

function initScroll() {
	/**
	 * 初始化下拉刷新
	 */
	$(".weui-tab__bd-item").pullToRefresh();
	$(".weui-tab__bd-item").on("pull-to-refresh", function() {
		var self = this
		setTimeout(function() {
			$(self).pullToRefreshDone();
		}, 2000)
	});

	//初始化加载更多
	//	$(".weui-tab__bd-item").infinite();
	//	$(".weui-tab__bd-item").infinite().on("infinite", function() {
	//		console.log("loadmore:" + this.id)
	//	});
}

/**
 * 回滚到原来的位置
 * @param {Object} timeId
 * @param {Object} index
 */
function homeToBeforePosition(timeId, index) {
	console.log("homeToBeforePosition:" + index);
	var scrollTop_0 = $("#" + home_data.home_tab[index].id).scrollTop();
	var scrollTop_1 = home_data.home_tab[index].scrollTop;
	if(scrollTop_0 == 0 && scrollTop_0 != scrollTop_1) {
		//之前设置回滚到初始位置无效
		$("#" + home_data.home_tab[index].id).scrollTop(home_data.home_tab[index].scrollTop);
	} else {
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
		colid: id
	}
	unitWebsitePro(tempData, function(data) {
		console.log('getUserInfo:' + JSON.stringify(data));
		if(data.RspCode == 0 && data.RspData.userid != undefined) {
			if(id == 0) {
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
				departUserInfo.key.push(data.RspData[i].userid);
				departUserInfo.value[data.RspData[i].userid] = $.extend({}, data.RspData[i]);
			}
		}
	}
	if(temp_data == mineUserInfo.department.length - 1) {
		//查询完我所处部门的所有成员
		console.log("查询完我所处部门的所有成员:", departUserInfo);
		//显示班级圈主页
		router.push('home');
		$.hideLoading();
		//获取全部动态
		getAllUserSpaces(1);
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

//获取全部动态
function getAllUserSpaces(pageIndex) {
	var postData = {
		userId: mineUserInfo.userid, //用户ID
		publisherIds: departUserInfo.key, //发布者ID
		pageIndex: pageIndex, //当前页数
		pageSize: 10 //每页记录数
	}
	classCircleProtocol.getAllUserSpacesByUser(postData, function(data) {
		console.log("获取全部动态:", data);
		if(data.RspCode == 0) {
			//console.log("log-8:" + JSON.stringify(data.RspData.Data[8]));
			for(var i = 0; i < data.RspData.Data.length; i++) {
				//设置发布者的信息
				var temp_0 = data.RspData.Data[i];
				//temp_0.PublisherId="moshanglin";
				//temp_0.EncType = 1;
				//console.log("value.encType:" + temp_0.EncType);
				temp_0.EncAddr_array = temp_0.EncAddr.split("|");
				temp_0.EncImgAddr_array = temp_0.EncImgAddr.split("|");
				home_data.home_tab[0].data.push(temp_0);
			}
			console.log("home_data.home_tab:", home_data.home_tab);
		} else {
			$.alert(data.RspTxt, "加载失败");
		}
	});
}

/**
 * 进入动态的详情
 * @param {Object} trendsValue 动态详情的数据
 */
function showTrendsDetails(trendsValue) {
	router.push({
		name: 'details',
		params: {
			id: new Date().getTime(),
			data: $.extend({}, trendsValue)
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
		router.push({
			name: 'space',
			params: {
				id: new Date().getTime(),
				userId: userId
			}
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
	trendsValue.IsLike = !trendsValue.IsLike;
}