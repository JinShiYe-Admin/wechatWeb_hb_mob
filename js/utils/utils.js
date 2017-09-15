//出错的监听
window.onerror = function(errorMessage, scriptURI, lineNumber, columnNumber, errorObj) {
	console.log("---ERROR---start---");
	console.log("错误信息-0:" + JSON.stringify(errorMessage.detail));
	console.log("错误信息-1:" + errorMessage);
	console.log("出错文件:" + scriptURI);
	console.log("出错行号:" + lineNumber);
	console.log("出错列号:" + columnNumber);
	console.log("错误详情:" + errorObj);
	console.log("---ERROR---end---");
}

//公共方法
var utils = (function(mod) {

	/**
	 * 获取url中的数据
	 * @param {String} url
	 */
	mod.getDataFromUrl = function(url) {
		var data = {};
		var index = url.indexOf("&");
		if(index != -1) {
			var dataStr = url.substring(index + 6, url.length);
			console.log("getDataFromUrl dataStr " + dataStr);
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
		mui.openWindow(url + "?v=" + Math.random() + "&data=" + encodeURIComponent(dataStr), ids[ids.length - 1]);
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
		window.open(url + "?v=" + Math.random() + "&data=" + encodeURIComponent(dataStr), ids[ids.length - 1]);
	}

	/**
	 *初始化mui的scrollY
	 * @param {Object} muiString
	 */
	mod.muiInitScrollY = function(muiString) {
		muiString = muiString || ".mui-scroll-wrapper";
		mui(muiString).scroll({
			scrollY: true, //是否竖向滚动
			scrollX: false, //是否横向滚动
			indicators: true, //是否显示滚动条
			deceleration: 0.003, //阻尼系数,系数越小滑动越灵敏
			bounce: true, //是否启用回弹
		});
	}

	/**
	 * 判断数据是否是undefined，null,""
	 * @param {Object} data
	 */
	mod.checkData = function(data) {
		if(data !== undefined && data !== null && data !== "") {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * 给头像添加默认值
	 * @param {Object} string 传过来的头像url
	 * @param {Object} flag 当前调用界面对于默认头像的层级关系
	 */
	mod.updateHeadImage = function(string, flag) {
		var tempStr = '';
		//判断img是否为null，或者空
		if(string == '' || string == null || string == 'null' || string == undefined) { //赋值
			switch(flag) {
				case 0:
					tempStr = 'image/utils/default_personalimage.png';
					break;
				case 1:
					tempStr = '../image/utils/default_personalimage.png';
					break;
				case 2:
				default:
					tempStr = '../../image/utils/default_personalimage.png';
					break;
				case 3:
					tempStr = '../../image/utils/default_personalimage.png';
					break;
			}
		} else {
			tempStr = string;
		}
		return tempStr;
	}

	/**
	 * 获取时间 YYYY-MM-DD HH-MM-SS(2017-9-8 11:56:40)
	 */
	mod.getCurentTime = function() {
		var myDate = new Date();
		var year = myDate.getFullYear(); //年
		var month = myDate.getMonth() + 1; //月
		var day = myDate.getDate(); //日
		var hh = myDate.getHours(); //时
		var mm = myDate.getMinutes(); //分
		var ss = myDate.getSeconds(); //秒
		var clock = year + "-";
		if(month < 10) {
			clock += "0";
		}
		clock += month + "-";
		if(day < 10) {
			clock += "0";
		}
		clock += day + " ";
		if(hh < 10) {
			clock += "0";
		}
		clock += hh + ":";
		if(mm < 10) {
			clock += '0';
		}
		clock += mm + ":";
		if(ss < 10) {
			clock += '0';
		}
		clock += ss;
		return clock;
	}

	return mod;
})(window.utils || {});