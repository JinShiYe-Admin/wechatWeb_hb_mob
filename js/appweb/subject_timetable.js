Vue.component("time-table", {
	props: ["title", "subtitle", "items_array", "show_add"],
	template: '#time-table',
	data: function() {
		return {
			list_array: ["daytype", "timespan", "mon", "tues", "wed", "thur", "fri", "sat", "sun"]
		}
	},
	methods: {
		/**
		 * 点击底部的添加按钮
		 */
		clickAddButton: function() {
			this.$emit("click-add-button");
		},
		/**
		 * 点击某一个item
		 * @param {Object} index 第几行
		 * @param {Object} callcol 对应的操作
		 */
		clickItem: function(index, callcol) {
			this.$emit("click-item", index, callcol);
		}
	}
});

//课程表
var vm_time_table = new Vue({
	el: "#time_table",
	data: {
		title: "2017秋季课程表",
		subtitle: "开发部 2017/8/1 0:00:00时效:201709至201802",
		items_array: [],
		departs_array: [],
		sub_array: []
	},
	methods: {
		/**
		 * 点击底部的添加按钮
		 */
		addTableItem: function() {
			var item = {
				daytype: "上午",
				timespan: "8:00-9:00",
				monsubname: "",
				monuname: "",
				tuessubname: "",
				tuesuname: "",
				wedsubname: "",
				weduname: "",
				thursubname: "",
				thuruname: "",
				frisubname: "",
				friuname: "",
				satsubname: "",
				satuname: "",
				sunsubname: "",
				sununame: ""
			};
			vm_time_table.items_array.push(item);
		},
		/**
		 * 点击某一个item
		 * @param {Object} index 第几行
		 * @param {Object} callcol 对应的操作
		 */
		clickItem: function(index, callcol) {
			console.log("clickItem:" + index + " " + callcol);
			if(callcol == "del") {
				//删除某一行
				$.confirm({
					title: '提示',
					text: '确认删除?',
					onOK: function() {
						vm_time_table.items_array.splice(index, 1);
						$.toast("操作成功");
					}
				});
			} else if(callcol == "daytype") {
				//点击类型
				vm_time_table.items_array[index][callcol] = callcol;
			} else if(callcol == "timespan") {
				//点击时间段
				vm_time_table.items_array[index][callcol] = callcol;
			} else {
				//点击具体星期
				vm_time_table.items_array[index][callcol + "subname"] = callcol + "subname";
				vm_time_table.items_array[index][callcol + "uname"] = callcol + "uname";
			}
		}
	},
	computed: {
		show_add: function() {
			var show = true;
			if(this.items_array.length > 8) {
				show = false
			}
			return show;
		}
	},
	updated: function() {
		console.log('刷新数据:' + JSON.stringify(vm_time_table.items_array))
		var div = document.getElementById("time_table");
		console.log(div.innerHTML)

		// 时间选择器
		mui('.time-table-content').on('tap', '.first', function() {
			var self = this;
			// 多列选择器
			weui.picker([{
				label: "上午",
				value: "上午"
			}, {
				label: "下午",
				value: "下午"
			}, {
				label: "晚上",
				value: "晚上"
			}], {
				defaultValue: ['上午'],
				onChange: function onChange(result) {
					console.log(result);
				},
				onConfirm: function onConfirm(result) {
					console.log(result);
					var tempArr = self.id.split('-');
					var index = tempArr[0];
					var model = vm_time_table.items_array[index]
					model.daytype = result[0].label;
					var callcol = "daytype";
					var colv = result[0].label
					var colid = model.weekrowid
					editEduleweek(colv, callcol, colid);
				},
				id: 'picker'
			});

		})

		// 时间选择器
		mui('.time-table-content').on('tap', '.second', function() {
			var self = this;
			var hours = [];
			for(var i = 0; i < 24; i++) {
				var obj = {};
				obj.label = obj.value = i > 9 ? i : '0' + i;
				hours.push(obj)
			}
			var minutes = [];
			for(var i = 0; i < 59; i++) {
				var obj = {};
				obj.label = obj.value = i > 9 ? i : '0' + i;
				minutes.push(obj)
			}
			// 多列选择器
			weui.picker(hours, [{
				label: ":",
				value: ":"
			}], minutes, [{
				label: "到",
				value: "-"
			}], hours, [{
				label: ":",
				value: ":"
			}], minutes, {
				defaultValue: ['08', ":", '00', "到", "08", ":", "00"],
				onChange: function onChange(result) {
					console.log(result);
				},
				onConfirm: function onConfirm(result) {
					console.log(JSON.stringify(result));
					var tempArr = self.id.split('-');
					var index = tempArr[0];
					var model = vm_time_table.items_array[index]
					model.timespan = result[0].label + ":" + result[2].label + "-" + result[4].label + ":" + result[6].label;
					var callcol = "timespan";
					var colv = model.timespan
					var colid = model.weekrowid
					editEduleweek(colv, callcol, colid);
				},
				id: 'multiPickerBtn'
			});

		})
		// 时间选择器
		mui('.time-table-content').on('tap', '.other', function() {
			var self = this;
			for(var i = 0; i < vm_time_table.departs_array.length; i++) {
				var departs = vm_time_table.departs_array[i]
				for(var j = 0; j < departs.children.length; j++) {
					var kemu = departs.children[j];
					kemu.children = vm_time_table.sub_array;
				}
			}
			console.log("部门数组:" + JSON.stringify(vm_time_table.departs_array))

			// 多列选择器
			weui.picker(vm_time_table.departs_array, {
				depth: 3,
				defaultValue: [1, "like", 4],
				onChange: function onChange(result) {
					//										console.log(result);
				},
				onConfirm: function onConfirm(result) {
					console.log(JSON.stringify(result));
					var tempArr = self.id.split('-');
					var index = tempArr[0];
					var list_value = tempArr[1]
					var model = vm_time_table.items_array[index]
					model[list_value + "subname"] = result[2].label;
					model[list_value + "uname"] = result[1].label;
					var callcol = list_value;
					var colv = result[2].value + "|" + result[2].label + "|" + result[1].value + "|" + result[1].label
					var colid = model.weekrowid
					editEduleweek(colv, callcol, colid);
				},
				id: 'cascadePicker'
			});

		})
	}
});
window.onload = function() {
	var detail = utils.getDataFromUrl(window.location.href);
	if(detail.flag == 0) {

	} else {
		vm_time_table.title = detail.edulename;
		vm_time_table.subtitle = detail.departname + detail.timespanb + "到" + detail.timespane;
		getEduleweek(detail.eduleid);
		getPersondeparts();
		getSub();
	}

}

function getPersondeparts() {
	var tempData = {
		cmd: 'persondeparts',
		type: 'findpage'
	}
	unitWebsitePro(tempData, function(data) {
		console.log('部门:' + JSON.stringify(data));
		//		alert('部门:' + JSON.stringify(data));
		if(data.RspCode == 0) {
			vm_time_table.departs_array = data.RspData;
			if(data.RspData == "11") {
				vm_time_table.departs_array = [{
					value: 11,
					title: "开发部"
				}];
			}

			for(var i = 0; i < vm_time_table.departs_array.length; i++) {
				var model = vm_time_table.departs_array[i]
				model.label = model.title;
				getDepartpersons(model.value, i)
			}
		} else {
			mui.toast(data.RspTxt)
		}
	})
}

function getDepartpersons(id, index) {
	var tempData = {
		cmd: 'departpersons',
		type: 'findpage',
		colid: 11
	}
	unitWebsitePro(tempData, function(data) {
		console.log('人员:' + JSON.stringify(data));
		if(data.RspCode == 0) {
			var tempArr = vm_time_table.departs_array;
			for(var i = 0; i < data.RspData.length; i++) {
				var model = data.RspData[i];
				model.value = model.userid;
				model.label = model.name;

			}
			tempArr[index].children = data.RspData;
			console.log(JSON.stringify(vm_time_table.departs_array));
		} else {
			mui.toast(data.RspTxt)
		}
	})
}

function getSub() {
	var tempData = {
		cmd: 'sub',
		type: 'findpage',
		pagesize: 10,
		pageindex: 1,
		stat: '1'
	}
	unitWebsitePro(tempData, function(data) {
		console.log('科目:' + JSON.stringify(data));
		if(data.RspCode == 0) {
			vm_time_table.sub_array = data.RspData.dt;
			for(var i = 0; i < vm_time_table.sub_array.length; i++) {
				var model = vm_time_table.sub_array[i];
				model.value = model.subid;
				model.label = model.cname;
			}
		} else {
			mui.toast(data.RspTxt)
		}
	})
}

function getEduleweek(pid) {
	var tempData = {
		cmd: 'eduleweek',
		type: 'findpage',
		pagesize: 10,
		pageindex: 1,
		pid: pid
	}
	unitWebsitePro(tempData, function(data) {
		console.log('获取课程表明细:' + JSON.stringify(data));
		if(data.RspCode == 0) {
			vm_time_table.items_array = data.RspData
		} else {
			mui.toast(data.RspTxt)
		}
	})

}

function editEduleweek(colv, callcol, colid) {
	var tempData = {
		cmd: 'eduleweek',
		type: 'edit',
		colv: colv,
		callcol: callcol,
		colid: colid
	}
	console.log(JSON.stringify(tempData))
	unitWebsitePro(tempData, function(data) {
		console.log('编辑课程表课程表:' + JSON.stringify(data));
		if(data.RspCode == 0) {} else {
			mui.toast(data.RspTxt)
		}
	})

}