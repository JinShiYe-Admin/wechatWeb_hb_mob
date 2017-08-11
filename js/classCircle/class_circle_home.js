window.onload = function() {
	console.log("window.onload");
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
		loading = true;
		setTimeout(function() {
			$("#list").append("<p> 我是新加载的内容 </p>");
			loading = false;
		}, 1500); //模拟延迟
	});
}