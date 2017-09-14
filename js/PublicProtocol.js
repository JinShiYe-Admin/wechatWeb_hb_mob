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
	jQAjaxPost('https://jsypay.jiaobaowang.net/wxth/appschweb/schwebapi.aspx', JSON.stringify(data0), callback);
}

/**
 * 发送 jQuery ajax post 的请求
 * @param {Object} url 路径
 * @param {Object} data 数据
 * @param {Object} callback 回调
 */
var jQAjaxPost = function(url, data, callback) {
	console.log('jQAP-Url:', url);
	console.log('jQAP-Data:', data);
	jQuery.ajax({
		url: url,
		type: "POST",
		data: data,
		timeout: 10000,
		dataType: "json",
		async: true,
		success: function(success_data) { //请求成功的回调
			console.log('jQAP-Success:', success_data);
			callback(success_data);
		},
		error: function(xhr, type, errorThrown) {
			console.log('jQAP-Error:', xhr, type);
			callback({
				RspCode: 404,
				RspData: null,
				RspTxt: "网络连接失败,请重新尝试一下"
			});
		}
	});
}