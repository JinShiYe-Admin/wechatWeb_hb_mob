window.onload = function() {
	console.log("window.onload");
	$(document.body).pullToRefresh();
	//	$(document.body).on("pull-to-refresh", function() {
	//		setTimeout(function() {
	//			$(document.body).pullToRefreshDone();
	//		}, 2000);
	//	});
}