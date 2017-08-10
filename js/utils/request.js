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
	mod.getDepartList = function(data, callback) {
		mod.postData(consts.MAINURL, {
			cmd: 'persondeparts',
			type: 'findpage'
		}, function(response) {
			if(response.RspCode === 0) {
				callback(response.RspData);
			}
		})
	}
	mod.getDepartPersons = function(id, callback) {
		mod.postData(consts.MAINURL, {
			cmd: departpersons,
			type: 'findpage',
			colid: id
		}, function(response) {
			if(response.RspCode == 0) {
				callback(response.RspData);
			}
		})
	}
	return mod;
})(request || {})