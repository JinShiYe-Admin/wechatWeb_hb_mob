//

//获取界面需要的config参数
var getConfigParameter = function(callback) {
	var url = window.location.href;
	var cncodeUrl = encodeURIComponent(url);
	jQuery.post('https://jsypay.jiaobaowang.net/wxth/jssdkapi.aspx', {
		reuri: cncodeUrl
	}, function(data) {
		callback(JSON.parse(data));
	});
}

//发送微信的config协议
var sendConfigPro = function(configmsg, apiList) {
	wx.config({
		debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		appId: configmsg.appId, // 必填，公众号的唯一标识
		timestamp: configmsg.timestamp, // 必填，生成签名的时间戳
		nonceStr: configmsg.nonceStr, // 必填，生成签名的随机串
		signature: configmsg.signature, // 必填，签名
		jsApiList: apiList // 必填，需要使用的JS接口列表
	});
}

//发送对应的网站协议，根据页面传送的data
var unitWebsitePro = function(data0, callback) {
	jQuery.post('https://jsypay.jiaobaowang.net/wxth/appschweb/schwebapi.aspx', JSON.stringify(data0), function(data1) {
		//		alert('协议返回:'+JSON.stringify(data1));
		console.log('协议返回:' + JSON.stringify(data1));
		callback(data1);
	});
}

