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
	mod.getDepartList = function(data, callback) {
		mod.postData(consts.MAINURL, JSON.stringify({
			cmd: 'persondeparts',
			type: 'findpage'
		}), function(response) {
			console.log("获取的部门列表值：" + JSON.stringify(response));
			if(response.RspCode === 0) {
				callback(response.RspData);
			}
		})
	}
	mod.getDepartPersons = function(id, callback) {
		mod.postData(consts.MAINURL, JSON.stringify({
			cmd: departpersons,
			type: 'findpage',
			colid: id
		}), function(response) {
			console.log("获取的部门人员列表列表值：" + JSON.stringify(response));
			if(response.RspCode == 0) {
				callback(response.RspData);
			}
		})
	}
	return mod;
})(request || {})