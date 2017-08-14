var events = (function(mod) {
	/**
	 * 在本地储存数组中 添加 或删除 value
	 * @param {Object} key 键值
	 * @param {Object} value 要存储或删除的值
	 * @param {Object} isAdd 0删除 1添加
	 */
	mod.toggleValueInLocalArray = function(key, value, isAdd) {
		var arr = localStorage.getItem(key)||[];
		console.log("获取的本地的值："+JSON.stringify(arr));
		localStorage.setItem(key, mod.toggleValueInArray(arr, value, isAdd));
	}
	/**
	 * 数组中删除或添加值
	 * @param {Object} arr 数组
	 * @param {Object} value 要添加或删除的值
	 * @param {Object} isAdd 0删除 1添加
	 */
	mod.toggleValueInArray = function(arr, value, isAdd) {
		var arrs = mod.isExistInLocalArray(arr, value);
		if(isAdd) {
			if(arrs[1] < 0) {
				arrs[0].push(value);
			}
		} else {
			if(arrs[1] >= 0)
				arr[0].splice(arrs[1], 1);
		}
		console.log("保存的值："+JSON.stringify(arrs[0]));
		return arrs[0];
	}
	/**
	 * 获取存储在本地的localStorage
	 * @param {Object} key 数组对应的key值
	 */
	mod.getLocalArray = function(key) {
		return localStorage.getItem(key) || [];
	}
	mod.isExistInLocalArray = function(key, value) {
		var arr = mod.getLocalArray(key);
		return [arr, arr.indexOf(value)];
	}
	return mod;
})(events || {})