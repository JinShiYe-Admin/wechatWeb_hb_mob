//动态组件
Vue.component("trends-item", {
	template: "#template_trends",
	props: ["value", "message"]
});
window.onload = function() {
	$.toast("window.onload");
	initRouter();
}

//设置路由
function initRouter() {
	var class_circle_home = {
		template: "#temp_class_circle_home",
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
	if(from.path == "/") {
		initVue();
	}
}

function initVue() {
	console.log("initVue");
	var all_trends = new Vue({
		el: "#all_trends",
		data: {
			message: "message",
			trends: []
		}
	});
}