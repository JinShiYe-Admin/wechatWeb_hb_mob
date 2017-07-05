//出错的监听
window.onerror = function(errorMessage, scriptURI, lineNumber, columnNumber, errorObj) {
	//	console.log("---ERROR---start---");
	//	console.log("错误信息-0:" + JSON.stringify(errorMessage.detail));
	//	console.log("错误信息-1:" + errorMessage);
	//	console.log("出错文件:" + scriptURI);
	//	console.log("出错行号:" + lineNumber);
	//	console.log("出错列号:" + columnNumber);
	//	console.log("错误详情:" + errorObj);
	alert("错误信息-0:" + JSON.stringify(errorMessage.detail) + "\n错误信息-1:" + errorMessage + "\n出错文件:" + scriptURI + "\n出错行号:" + lineNumber + "\n出错列号:" + columnNumber + "\n错误详情:" + errorObj);
}

//公共方法
var utils = (function(mod) {

	/**
	 * 获取url中的数据
	 * @param {String} url
	 */
	mod.getDataFromUrl = function(url) {
		var data = {};
		var index = url.indexOf("?");
		if(index != -1) {
			var dataStr = url.substring(index + 1, url.length);
			data = JSON.parse(decodeURIComponent(dataStr));
		}
		console.log("getDataFromUrl url " + url);
		console.log("getDataFromUrl data " + JSON.stringify(data));
		return data;
	}

	/**
	 * 用mui打开一个页面，通过url传递数据
	 * @param {String} url 路径
	 * @param {Object} data 数据对象
	 */
	mod.mOpenWithData = function(url, data) {
		data = data || {};
		var ids = url.split("/");
		var dataStr = JSON.stringify(data);
		console.log("mOpen " + url + ' ' + dataStr);
		mui.openWindow(url + "?" + encodeURIComponent(dataStr), ids[ids.length - 1]);
	}

	/**
	 * 用window打开一个页面，通过url传递数据
	 * @param {String} url 路径
	 * @param {Object} data 数据对象
	 */
	mod.wOpenWithData = function(url, data) {
		data = data || {};
		var ids = url.split("/");
		var dataStr = JSON.stringify(data);
		console.log("wOpen " + url + ' ' + dataStr);
		window.open(url + "?" + encodeURIComponent(dataStr), ids[ids.length - 1]);
	}

	/**
	 *初始化mui的scroll
	 * @param {Object} muiString
	 */
	mod.muiInitScroll = function(muiString) {
		muiString = muiString || ".mui-scroll-wrapper";
		mui(muiString).scroll({
			scrollY: true, //是否竖向滚动
			scrollX: false, //是否横向滚动
			indicators: true, //是否显示滚动条
			deceleration: 0.003, //阻尼系数,系数越小滑动越灵敏
			bounce: true, //是否启用回弹
		});
	}

	return mod;
})(window.utils || {});