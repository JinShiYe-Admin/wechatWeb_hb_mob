//班级圈主页tab顶部导航
Vue.component("home-navbar-item", {
	template: "#temp_trends_navbar_item",
	props: ["value", "index", "is_on"],
	computed: {
		isOnClass: function() {
			return {
				'weui-bar__item--on': this.index == this.is_on
			}
		}
	},
	methods: {
		/**
		 * 点击item
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
				'weui-tab__bd-item--active': this.index == this.is_on
			}
		}
	}
});
//动态组件
Vue.component("trends-item", {
	template: "#template_trends",
	props: ["value"]
});
//与我相关组件
Vue.component("relate-item", {
	template: "#temp_relate_to_me",
	props: ["value"]
});
var class_circle_home_data = {
	is_on: 0, //当前显示的列表
	home_tab: [{
		id: "all_trends",
		title: "全部动态",
		data: ['1', '2']
	}, {
		id: "mine_trends",
		title: "我的动态",
		data: []
	}, {
		id: "relate_to_me",
		title: "与我相关",
		data: []
	}]
}; //班级圈主页数据

window.onload = function() {
	$.toast("window.onload");
	initRouter();
}

//设置路由
function initRouter() {
	//班级圈主页
	var class_circle_home = {
		template: "#temp_class_circle_home",
		data: function() {
			return class_circle_home_data;
		},
		methods: {
			/**
			 * 改变显示的列表
			 * @param {Object} index
			 */
			clickItem: function(index) {
				class_circle_home_data.is_on = index;
			}
		},
		beforeRouteEnter: function(to, from, next) {
			console.log("beforeRouteEnter:");
			next(function() {
				initClassCircleHome(to, from);
			});
		},
		beforeRouteLeave: function(to, from, next) {
			console.log("beforeRouteLeave:");
			console.log("to:" + to.path);
			console.log("from:" + from.path);
			next();
		}
	};
	//发布动态
	var add_trends = {
		template: "#temp_add_trends"
	};

	var routes = [{
		path: '/home',
		component: class_circle_home
	}, {
		path: '/add',
		component: add_trends
	}];

	var router = new VueRouter({
		routes: routes
	});

	var class_circle_app = new Vue({
		router: router
	}).$mount('#class_circle_app');

	router.push('home');
}

function initScroll() {
	console.log("initScroll:" + $(".weui-tab__bd-item").length)
	$(".weui-tab__bd-item").pullToRefresh();
	$(".weui-tab__bd-item").infinite();
	$(".weui-tab__bd-item").on("pull-to-refresh", function() {
		var self = this
		setTimeout(function() {
			$(self).pullToRefreshDone();
		}, 2000)
	});
	var loading = false; //状态标记
	$(".weui-tab__bd-item").infinite().on("infinite", function() {
		if(loading) return;
		console.log("loading");
		loading = true;
		setTimeout(function() {
			loading = false;
		}, 1500); //模拟延迟
	});
}

function initClassCircleHome(to, from) {
	console.log("initClassCircleHome:");
	console.log("to:" + to.path);
	console.log("from:" + from.path);
	initScroll();
}