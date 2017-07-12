//七牛相关的公共方法
var cloudutil = (function(mod) {

	/**
	 * 获取应用对应的密钥
	 * @param {Object} appId app的id
	 */
	mod.getAppKey = function(appId) {
		var desKey = "";
		switch(appId) {
			case storageutil.QNQYWXKID:
				desKey = storageutil.QNQYWXKEY;
				break;
			default:
				break;
		}
		return desKey;
	}

	/**
	 * 设置七牛持久化命令
	 * @param {Object} data
	 * @param {Object.option} data.option 处理参数
	 * @param {Object.saveSpace} data.saveSpace 保存空间
	 * @param {Object.mainSpace} data.mainSpace 主空间
	 * @param {Object.qnFileName} data.qnFileName 文件名
	 */
	mod.setQNCommand = function(data) {
		var returnData = {};
		//		switch(data.option.type) {
		//			case value:
		//				break;
		//			default:
		//				break;
		//		}
		return returnData;
	}

	/**
	 * 获取文件的uptoken
	 * @param {Object} data
	 * @param {Object} callback
	 */
	mod.getFileUpToken = function(data, callback) {

	}
	return mod;
})(window.cloudutil || {});