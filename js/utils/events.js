var events = (function(mod) {
	/**
	 * 在本地储存数组中 添加 或删除 value
	 * @param {Object} key 键值
	 * @param {Object} value 要存储或删除的值
	 * @param {Object} isAdd 0删除 1添加
	 */
	mod.toggleValueInSessionArray = function(key, value, isAdd) {
		var arr = mod.getSessionArray(key);
		console.log("获取的本地的值：" + JSON.stringify(arr));
		sessionStorage.setItem(key, JSON.stringify(mod.toggleValueInArray(arr, value, isAdd)));
	}
	/**
	 * 数组中删除或添加值
	 * @param {Object} arr 数组
	 * @param {Object} value 要添加或删除的值
	 * @param {Object} isAdd 0删除 1添加
	 */
	mod.toggleValueInArray = function(arr, value, isAdd) {
		console.log("是否添加数据？" + isAdd + ",要处理的值:" + value);
		var arrs = mod.isExistInArray(arr, value);
		if(isAdd) {
			if(arrs[1] < 0) {
				arrs[0].push(value);
			}
		} else {
			if(arrs[1] >= 0) {
				arrs[0].splice(arrs[1], 1);
			}
		}
		console.log("加载或删除后的数组：" + JSON.stringify(arrs[0]));
		return arrs[0];
	}
	/**
	 * 获取存储在本地的localStorage
	 * @param {Object} key 数组对应的key值
	 */
	mod.getSessionArray = function(key) {
		var arr;
		if(sessionStorage.getItem(key)) {
			arr = JSON.parse(sessionStorage.getItem(key));
		} else {
			arr = [];
		}
		console.log("获取的本地存储数组：" + JSON.stringify(arr));
		return arr;
	}
	mod.isExistInSessionArray = function(key, value) {
		var arr = mod.getSessionArray(key);
		return mod.isExistInArray(arr, value);
	}
	mod.isExistInArray = function(arr, value) {
		var arrs = [arr, arr.indexOf(value)];
		console.log("获取的是否值是否存在于数组中：" + JSON.stringify(arrs));
		return arrs;
	}
	mod.getSessionMap = function(key) {
		if(sessionStorage.getItem(key)) {
			return JSON.parse(sessionStorage.getItem(key));
		}
		return {};
	}
	mod.getSessionMapValue = function(storageKey, key) {
		var map = mod.getSessionMap(storageKey);
		if(map[key]) {
			return map[key];
		}
		return [];
	}
	mod.setSesionMapValue = function(storageKey, key, value) {
		var map = mod.getSessionMap(storageKey);
		map[key] = value;
		sessionStorage.setItem(storageKey, map);
	}
	return mod;
})(events || {})