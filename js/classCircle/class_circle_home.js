window.onload = function() {
	//	console.log("window.onload");
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
			$("#list").append("<p> 我是新加载的内容 </p>");
			loading = false;
		}, 1500); //模拟延迟
	});
//	var pb1 = $.photoBrowser({
//		items: [
//			"https://www.baidu.com/img/bd_logo1.png",
//			"../../image/config/func_actssm.jpg",
//			"http://www.w3school.com.cn/i/bg_flower_small.gif"
//		]
//	});
//	pb1.open();
//	pb1.slideTo(1, 1000);
}