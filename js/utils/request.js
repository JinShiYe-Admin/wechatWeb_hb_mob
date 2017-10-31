/**
 * 依赖jquery
 * 依赖consts.js
 */
var request = (function(mod) {
	mod.getData = function(url, data, callback) {
		jQuery.getJSON(url, data, callback);
	}
	mod.postData = function(url, data, callback) {
		jQuery.post(url, data, function(data) {
			if(data.RspCode == 13) {
				alert("用户没有登录或已超时，关闭当前页面，从新从企业管理端登录")
			} else {
				callback(data);
			}
		});
	}
	mod.getDepartList = function(callback) {
		mod.postData(consts.MAINURL, JSON.stringify({
			cmd: 'persondepartsadmin',
			type: 'findpage'
		}), function(response) {
			console.log("获取的部门列表值：" + JSON.stringify(response));
			if(response.RspCode == 0) {
				callback(JSON.parse(response.RspData));
			}
		})
	}
	mod.getDepartPersons = function(id, colv, callcol, callback) {
		if(callcol) {
			callcol = 'info';
		} else {
			callcol = 'base';
		}
		if(typeof(id.value) !== "undefined") {
			id = id.value;
		}
		mod.postData(consts.MAINURL, JSON.stringify({
			cmd: "departpersonsadmin",
			type: 'findpage',
			colid: id,
			colv: colv,
			callcol: callcol
		}), function(response) {
			console.log("获取的部门人员列表列表值：" + JSON.stringify(response));
			if(response.RspCode == 0) {
				callback(response.RspData);
			} else {
				callback([]);
			}
		})
	}
	mod.publishMessage = function(users, content, callback) {

		var comData = {
			cmd: 'msg',
			type: 'text',
			touser: userids.join('|'),
			toparty: '',
			totag: '',
			content: content,
			tousername: usernames.join('|'),
			topartyname: '',
			totagname: ''
		}
		mod.postData(consts.MAINURL, JSON.stringify(comData), function(response) {
			console.log("发布消息返回的值：" + JSON.stringify(response));
			callback(response);
		})
	}
	/**
	 * 发送消息
	 * @param {Object} users 用户
	 * @param {Object} dataInfo 发送的数据信息
	 */
	mod.postMessage = function(users, dataInfo, callback) {
		var userids = users.map(function(user) {
			return user.userid;
		})
		var usernames = users.map(function(user) {
			return user.name;
		})
		var comData = {
			cmd: 'msg',
			touser: userids.join('|'),
			toparty: '',
			totag: '',
			safe: 0,
			tousername: usernames.join('|'),
			topartyname: '',
			totagname: ''
		}
		jQuery.extend(comData, dataInfo);
		console.log("发布信息传递的值：" + JSON.stringify(comData));
		mod.postData(consts.MAINURL, JSON.stringify(comData), function(response) {
			console.log("发布消息返回的值：" + JSON.stringify(response));
			callback(response);
		})
	}
	return mod;
})(request || {})