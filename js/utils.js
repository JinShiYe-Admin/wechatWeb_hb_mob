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
	return mod;
})(window.utils || {});