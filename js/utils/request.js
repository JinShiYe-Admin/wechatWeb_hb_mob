/**
 * 依赖jquery
 * 依赖consts.js
 */
var request = (function(mod) {
	mod.getData = function(url, data, callback) {
		jQuery.getJSON(url, data, callback);
	}
	mod.postData = function(url, data, callback) {
		jQuery.post(url, data, callback, 'json');
	}
	//获取token
	mod.getToken = function(callback) {
		if(consts.ACCESS_TOKEN.access_token) {
			if(mod.isInTime(consts.ACCESS_TOKEN)) {
				callback(consts.ACCESS_TOKEN);
				return;
			}
		}
		mod.getData(consts.ACCESS_TOKEN_URL, {
			corpid: consts.CORPID,
			corpsecret: consts.CORPSECRET
		}, function(response) {
			console.log("获取的token值：" + JSON.stringify(response));
			if(response.errcode == 0) {
				mod.setEndTime(response, callback);
			}
		})
	}
	//设置失效时间
	mod.setEndTime = function(token, callback) {
		var now = parseInt(Date.now() / 1000);
		token.endTime = now + token.expires_in;
		consts.ACCESS_TOKEN = token;
		callback(consts.ACCESS_TOKEN);
	}
	//判断是否在失效时间内
	mod.isInTime = function(token) {
		if(parseInt(Date.now() / 1000) > token.endTime) {
			return false;
		}
		return true;
	}
	/**
	 * 获取部门列表
	 * @param {Object} callback 回调
	 * @param {Object} id 部门id 可选参数
	 */
	mod.getDepartList = function(callback, id) {

		mod.getToken(function(token) {
			var postData = {
				access_token: token.access_token
			}
			if(typeof(id) !== 'undefined') {
				postData.id = id;
			}
			mod.getData(consts.DEPARTMENT_LIST_URL, postData, function(response) {
				if(response.errcode == 0) {
					callback(response.department);
				}
			});
		})
	}
	/**
	 * 获取部门人员详情
	 * @param {int} id 部门id
	 * @param {Object} callback 回调
	 * @param {Object} isFetchChild 1/0是否递归获取子部门人员 可选参数
	 */
	mod.getDepartUserList = function(id, callback, isFetchChild) {
		mod.getToken(function(token) {
			var postData = {
				access_token: token.access_token,
				department_id: id
			}
			if(typeof(isFetchChild) !== 'undefined') {
				postData.fetch_child = isFetchChild;
			}
			mod.getData(consts.DEPART_USERLIST_URL, postData, function(response) {
				if(response.errcode == 0) {
					callback(response.userlist);
				}
			})
		})
	}
	return mod;
})(request || {})