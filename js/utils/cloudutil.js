//七牛相关的公共方法
var cloudutil = (function(mod) {

	/**
	 * 获取应用对应的密钥
	 * @param {Object} appId app的id
	 */
	mod.getAppKey = function(appId) {
		var desKey = "";
		switch(appId) {
			case storageutil.QNQYWXKID: //企业微信
				desKey = storageutil.QNQYWXKEY;
				break;
			default:
				break;
		}
		return desKey;
	}

	/**
	 * 设置七牛持久化命令
	 * @param {Object} data 必填
	 * @param {Object.option} data.option 必填 命令相关参数
	 * @param {Object.option.type} data.option.type 必填 命令类型
	 * @param {Object.option.width} data.option.width 选填 命令参数
	 * @param {Object.option.height} data.option.height 选填 命令参数
	 * @param {Object.saveSpace} data.saveSpace 必填 保存空间
	 * @param {Object.mainSpace} data.mainSpace 必填 主空间
	 * @param {Object.qnFileName} data.qnFileName 必填 文件名
	 */
	mod.setQNCmd = function(data) {
		console.log("setQNCmd:" + JSON.stringify(data));
		var returnData = {};
		switch(data.option.type) {
			case 0: //只传原文件，不执行七牛的持久化命令
				returnData = null;
				break;
			case 1: //等比缩放生成缩略图
				var thumbSpace = data.saveSpace + storageutil.QNTHUMB;
				var fileNames = data.qnFileName.split(".");
				var width = 100; //缩略图的长边
				var height = 100; //缩略图的短边
				if(utils.checkData(data.option.width)) {
					width = data.option.width;
				}
				if(utils.checkData(data.option.height)) {
					height = data.option.height;
				}
				returnData.thumbKey = Qiniu.URLSafeBase64Encode(data.mainSpace + ":" + thumbSpace + fileNames[0] + ".png");
				returnData.ops = "imageView2/0/w/" + width + "/h/" + height + "/format/png|saveas/" + returnData.thumbKey;
				break;
			default:
				break;
		}
		console.log("returnData.ops:" + returnData.ops);
		return returnData;
	}

	/**
	 * 获取文件的uptoken
	 * @param {Object} data 必填
	 * @param {Object.appId} data.appId 必填 项目id
	 * @param {Object.mainSpace} data.mainSpace 必填 文件存放在私有空间或公有空间
	 * @param {Object.saveSpace} data.saveSpace 必填 文件存放的空间(第二前缀名)
	 * @param {Object.qnCmdOption} data.qnCmdOption 必填 七牛的持久化命令类型
	 * @param {Object.fileSplit} data.fileSplit 必填 文件路径分割类型
	 * @param {Object.fileArray} data.fileArray 必填 文件数组
	 * @param {Object.fileArray.filePath} data.fileArray.filePath 必填 文件路径
	 * @param {Object.fileArray.qnFileName} data.fileArray.qnFileName 选填 自定义七牛的文件名，默认使用文件路径中的文件名
	 * @param {Object.fileArray.qnCmdType} data.fileArray.qnCmdType 选填 自定义文件处理命令类型，默认使用data.qnCmdType的命令类型
	 * @param {Object} callback 必填 回调
	 */
	mod.getFileUpTokens = function(data, callBack) {
		console.log("getFileUpToken:" + JSON.stringify(data));
		var appId = data.appId; //项目id
		var desKey = mod.getAppKey(data.appId); //项目名称
		var mainSpace = data.mainSpace; //文件存放在私有空间或公有空间
		var saveSpace = data.saveSpace; //文件存放的空间(第二前缀名)
		var qnCmdOption = data.qnCmdOption; //七牛的持久化命令类型
		var fileSplit = data.fileSplit; //文件路径分割类型

		var configure = {}; //配置的数据
		configure.thumbKey = []; //持久化命令
		var params = []; //配置的参数信息
		for(var i in data.fileArray) {
			var param = {}; //文件的配置参数
			param.Bucket = mainSpace;

			//七牛的文件名
			var qnFileName;
			if(utils.checkData(data.fileArray[i].qnFileName)) {
				//自定义七牛上的文件名
				qnFileName = data.fileArray[i].qnFileName;
			} else {
				//默认使用文件路径中的文件名
				var filePaths = data.fileArray[i].filePath.split(fileSplit);
				qnFileName = filePaths[filePaths.length - 1];
			}

			param.Key = saveSpace + qnFileName;

			//设置持久化命令
			var setQNCmdData = {
				option: {},
				saveSpace: saveSpace,
				mainSpace: mainSpace,
				qnFileName: qnFileName
			};
			if(utils.checkData(data.fileArray[i].qnCmdOption)) {
				//自定义七牛文件的命令类型
				setQNCmdData.option = data.fileArray[i].qnCmdOption;
			} else {
				//默认使用data.qnCmdType的命令类型
				setQNCmdData.option = qnCmdOption;
			}
			var opsData = mod.setQNCmd(setQNCmdData);

			if(opsData != null) {
				param.Pops = opsData.ops;
				configure.thumbKey.push(opsData.thumbKey);
			} else {
				param.Pops = "";
			}
			param.NotifyUrl = '';
			params.push(param);
		}
		configure.options = {
			AppID: appId,
			Param: encryptByDES(desKey, JSON.stringify(params))
		}

		mod.getUpTokenRequest(configure.options, function(tokenData) {
			console.log("getFileUpTokens:tokenData:" + JSON.stringify(tokenData));
			if(tokenData.code == 1 && tokenData.data.Status == 1) {
				callBack({
					code: 1,
					data: tokenData.data,
					message: tokenData.message
				});
			} else {
				callBack({
					code: 0,
					message: tokenData.message
				});
			}
		});
	}

	/**
	 * 发送获取uptoken的请求
	 * @param {Object} requestData
	 * @param {Object} callBack 请求的回调
	 */
	mod.getUpTokenRequest = function(requestData, callBack) {
		jQuery.ajax({
			url: storageutil.QNGETUPLOADTOKEN,
			type: "POST",
			data: requestData,
			timeout: 30000,
			dataType: "json",
			async: false,
			success: function(data) { //请求成功的回调
				console.log("getUpTokenRequest:success:" + JSON.stringify(data));
				callBack({
					code: 1,
					data: data,
					message: data.Message
				});
			},
			error: function(xhr, type, errorThrown) {
				console.log("getUpTokenRequest:error:" + type);
				callBack({
					code: 0,
					message: type
				});
			}
		});
	}

	/**
	 * 转换数据格式
	 * @param {int} size
	 */
	mod.transformSize = function(size) {
		var sizeString = "";
		if(size == 0) {
			sizeString = "0B";
		} else if(size < 1024) {
			sizeString = size + "B";
		} else if(size < 1048576) {
			sizeString = (size / 1024).toFixed(2) + "KB";
		} else if(size < 1073741824) {
			sizeString = (size / 1048576).toFixed(2) + "MB";
		} else {
			sizeString = (size / 1073741824).toFixed(2) + "GB";
		}
		return sizeString;
	}

	return mod;
})(window.cloudutil || {});