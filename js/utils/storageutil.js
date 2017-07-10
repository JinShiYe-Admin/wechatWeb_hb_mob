//在本地存取永久或临时数据，和存取时的key值
var storageutil = (function(mod) {
	mod.KEY = 0; //0,开发;1,测试;2,外网
	if(mod.KEY == 0) {
		//开发
		mod.QNPBDOMAIN = 'http://qn-kfpb.jiaobaowang.net/'; //七牛公开空间域名
		mod.QNGETUPLOADTOKEN = 'http://114.215.222.186:8004/Api/QiNiu/GetUpLoadToKen'; //七牛获取上传token的url
		mod.QNGETDOWNLOADTOKEN = 'http://114.215.222.186:8004/Api/QiNiu/GetAccess'; //七牛获取下载token的url
		mod.QNGETDELETETOKEN = 'http://114.215.222.186:8004/Api/QiNiu/Delete'; //获取批量删除七牛文件的token的url
	} else if(mod.KEY == 1) {
		//测试
		mod.QNPBDOMAIN = 'http://qn-cspb.jiaobaowang.net/'; //七牛公开空间域名
		mod.QNGETUPLOADTOKEN = 'http://114.215.222.186:8005/Api/QiNiu/GetUpLoadToKen'; //七牛获取上传token的url
		mod.QNGETDOWNLOADTOKEN = 'http://114.215.222.186:8005/Api/QiNiu/GetAccess'; //七牛获取下载token的url
		mod.QNGETDELETETOKEN = 'http://114.215.222.186:8005/Api/QiNiu/Delete'; //获取批量删除七牛文件的token的url
	} else {
		//外网
		mod.QNPBDOMAIN = 'http://qn-cspb.jiaobaowang.net/'; //七牛公开空间域名
		mod.QNGETUPLOADTOKEN = 'http://114.215.222.186:8005/Api/QiNiu/GetUpLoadToKen'; //七牛获取上传token的url
		mod.QNGETDOWNLOADTOKEN = 'http://114.215.222.186:8005/Api/QiNiu/GetAccess'; //七牛获取下载token的url
		mod.QNGETDELETETOKEN = 'http://114.215.222.186:8005/Api/QiNiu/Delete'; //获取批量删除七牛文件的token的url
	}

	mod.WEBSITECONFIG = 'websiteConfig' //网站配置

	/**
	 * 在本地存永久数据
	 * @param {Object} key
	 * @param {Object} value
	 */
	mod.setLocalStorage = function(key, value) {
		localStorage.setItem(key, value);
	}

	/**
	 * 取永久数据
	 * @param {Object} key
	 */
	mod.getLocalStorage = function(key) {
		return localStorage.getItem(key);
	}

	/**
	 * 删除单个永久数据
	 * @param {Object} key
	 */
	mod.removeLocalStorage = function(key) {
		localStorage.removeItem(key);
	}

	/**
	 * 删除所有的永久数据
	 */
	mod.clearLocalStorage = function() {
		localStorage.clear();
	}

	/**
	 * 在本地存临时数据
	 * @param {Object} key
	 * @param {Object} value
	 */
	mod.setSessionStorage = function(key, value) {
		sessionStorage.setItem(key, value);
	}

	/**
	 * 取临时数据
	 * @param {Object} key
	 */
	mod.getSessionStorage = function(key) {
		return sessionStorage.getItem(key);
	}

	/**
	 * 删除单个临时数据
	 * @param {Object} key
	 */
	mod.removeSessionStorage = function(key) {
		sessionStorage.removeItem(key);
	}

	/**
	 * 删除所有的临时数据
	 */
	mod.clearSessionStorage = function() {
		sessionStorage.clear();
	}
	return mod;
})(window.storageutil || {});