/**
 * 依赖jquery
 * 依赖consts.js
 */
var request = (function(mod) {
	mod.getData = function(url, data, callback) {
		jQuery.getJSON(url, data, callback);
	}
	mod.postData = function(url, data, callback) {
		jQuery.post(url, data, callback);
	}
	mod.getDepartList = function(callback) {
		mod.postData(consts.MAINURL, JSON.stringify({
			cmd: 'persondeparts',
			type: 'findpage'
		}), function(response) {
			console.log("获取的部门列表值：" + JSON.stringify(response));
			if(response.RspCode == 0) {
				callback(response.RspData);
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
			cmd: "departpersons",
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
		var userids = users.map(function(user) {
			return user.userid
		})
		var usernames = users.map(function(user) {
			return user.name
		})
		var comData = {
			cmd: 'msg',
			type: 'text',
			touser: userids.join('|'),
			toparty: '',
			totag: '',
			msgtype: 'text',
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
	return mod;
})(request || {})