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
	 * @param {Object} url
	 */
	mod.getDataFromUrl = function(url) {
		var data = {};
		var index = url.indexOf("?");
		if(index != -1) {
			var dataStr = url.substring(index + 1, url.length);
			var dataArray = dataStr.split("&");
			for(var i in dataArray) {
				var keyValue = dataArray[i].split("=");
				data[keyValue[0]] = keyValue[1];
			}
		}
		console.log("getDataFromUrl url " + url);
		console.log("getDataFromUrl data " + JSON.stringify(data));
		return data;
	}
	return mod;
})(window.utils || {});