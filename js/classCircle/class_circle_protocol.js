/**
 * 班级圈协议
 * 使用前必须先引入jQuery,PublicProtocol.js,storageutil.js
 */
var classCircleProtocol = (function(mod) {
	//模块
	mod.USERSPACE = "userSpace/";
	//公共参数，必传
	mod.PUBDATA = {
		uuid: "",
		appid: "",
		token: "",
		sign: ""
	}

	/**
	 * 17.（用户空间）获取多用户空间所有用户动态列表
	 * @param {Object} data
	 * @param {Object} callback
	 */
	mod.getAllUserSpacesByUser = function(data, callback) {
		jQAjaxPost(storageutil.CLASSCIRCLEMAIN + mod.USERSPACE + "getAllUserSpacesByUser", JSON.stringify($.extend(data, mod.PUBDATA)), callback);
	}

	return mod;
})(window.classCircleProtocol || {});