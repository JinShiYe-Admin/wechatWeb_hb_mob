Vue.component("time-table", {
	props: ["edulename", "departname", "timespanb", "timespane", "items_array", "show_submit"],
	template: '#template-table',
	data: function() {
		return {
			list_array: ["daytype", "timespan", "mon", "tues", "wed", "thur", "fri", "sat", "sun"]
		}
	},
	methods: {
		/**
		 * 点击底部的添加按钮
		 */
		clickSubmitButton: function() {
			this.$emit("click-submit-button");
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
		flag: 0,
		edulename: "",
		departname: "",
		departid:"",
		timespanb: "",
		timespane: "",
		items_array: [],
		departs_array: [],
		sub_array: []
	},
	watch: {
		edulename: function(newVal, oldVal) {
			editEdule(oldVal, newVal, "edulename")

		},
		departname: function(newVal, oldVal) {
			editEdule(oldVal, newVal, "depart")

		},
		timespanb: function(newVal, oldVal) {
			editEdule(oldVal, newVal, "timespanb")

		},
		timespane: function(newVal, oldVal) {
			editEdule(oldVal, newVal, "timespane")

		},
	},
	methods: {
		/**
		 * 点击底部的添加按钮
		 */
		submitTable: function() {
			addEdule();
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
		show_submit: function() {
			var show = true;
			if(this.flag == 1) {
				show = false
			}
			return show;
		}
	},
	updated: function() {
		console.log('刷新数据:' + JSON.stringify(vm_time_table.$data))
		var div = document.getElementById("time_table");
		//		console.log(div.innerHTML)

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
			utils.mOpenWithData("choose-person.html", {});
			
//			var self = this;
//			for(var i = 0; i < vm_time_table.departs_array.length; i++) {
//				var departs = vm_time_table.departs_array[i]
//				for(var j = 0; j < departs.children.length; j++) {
//					var kemu = departs.children[j];
//					kemu.children = vm_time_table.sub_array;
//				}
//			}
//			console.log("部门数组:" + JSON.stringify(vm_time_table.departs_array))
//
//			// 多列选择器
//			weui.picker(vm_time_table.departs_array, {
//				depth: 3,
//				defaultValue: [1, "like", 4],
//				onChange: function onChange(result) {
//					//										console.log(result);
//				},
//				onConfirm: function onConfirm(result) {
//					console.log(JSON.stringify(result));
//					var tempArr = self.id.split('-');
//					var index = tempArr[0];
//					var list_value = tempArr[1]
//					var model = vm_time_table.items_array[index]
//					model[list_value + "subname"] = result[2].label;
//					model[list_value + "uname"] = result[1].label;
//					var callcol = list_value;
//					var colv = result[2].value + "|" + result[2].label + "|" + result[1].value + "|" + result[1].label
//					var colid = model.weekrowid
//					editEduleweek(colv, callcol, colid);
//				},
//				id: 'cascadePicker'
//			});

		})
	}
});
//for(var item in vm.$data) {
//						(function addwatch(key) {
//							vm.$watch(key + '.message', function(newVal, oldVal) {
//								edit(oldVal, newVal, key)
//							})
//							vm.$watch(key + '.check', function(newVal, oldVal) {
//								edit(oldVal, newVal, key)
//							})
//						})(item)
//
//					}
for(var i = 0; i < 9; i++) {
	var daytype, timespan;
	if(i < 4) {
		daytype = "上午"
	} else if(i > 6) {
		daytype = "晚上"
	} else {
		daytype = "下午"
	}
	var item = {
		daytype: daytype,
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
}
window.onload = function() {
	var detail = utils.getDataFromUrl(window.location.href);
	if(detail.flag == 0) {
		vm_time_table.flag = 0
		getPersondeparts();
		getSub();
	} else {
		vm_time_table.flag = 1
		vm_time_table.edulename = detail.edulename;
		vm_time_table.eduleid = detail.eduleid;
		vm_time_table.departname = detail.departname;
		vm_time_table.departid = detail.departid;
		vm_time_table.timespanb = detail.timespanb;
		vm_time_table.timespane = detail.timespane;
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
		colid: id,
		colv:1
	}
	console.log(JSON.stringify(tempData))
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
	if(vm_time_table.flag == 0) {
		return
	}
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

function addEdule() {
	var tempData = {
		cmd: 'edule',
		type: 'add',
		edulename: vm_time_table.edulename,
		departid: vm_time_table.departid,
		departname: vm_time_table.departname,
		timespanb: vm_time_table.timespanb,
		timespane: vm_time_table.timespane,
		edulerows: vm_time_table.items_array

	}
	unitWebsitePro(tempData, function(data) {
		console.log('添加课程表:' + JSON.stringify(data));
		if(data.RspCode == 0) {} else {
			mui.toast(data.RspTxt)
		}
	})

}

function editEdule(oldVal, newVal, callcol) {
	if(vm_time_table.flag == 0 || oldVal == newVal) {
		return;
	}
	var colv
	switch(callcol) {
		case "edulename":
			{
				colv = vm_time_table.edulename
			}
			break;
		case "depart":
			{
				colv = vm_time_table.departid + "|" + vm_time_table.departname
			}
			break;
		case "timespanb":
			{
				colv = vm_time_table.timespanb
			}
			break;
		case "timespane":
			{
				colv = vm_time_table.timespane
			}
			break;
		default:
			break;
	}

	var tempData = {
		cmd: 'edule',
		type: 'edit',
		callcol: callcol,
		colid: vm_time_table.eduleid,
		colv: colv,
	}
	unitWebsitePro(tempData, function(data) {

		console.log('编辑课程表:' + JSON.stringify(data));
		if(data.RspCode == 0) {} else {
			mui.toast(data.RspTxt)
		}
	})

}

function selectDepart(input_item) {
	// 多列选择器
	weui.picker(vm_time_table.departs_array, {
		depth: 1,
		defaultValue: [1],
		onChange: function onChange(result) {
			//										console.log(result);
		},
		onConfirm: function onConfirm(result) {
			vm_time_table.departid = result[0].value;
			vm_time_table.departname = result[0].label;
		},
		id: 'cascadePicker'
	});
}
function selectDate(input_item) {
	var self = input_item;
	    weui.datePicker({
	        start: '2016-12-29',
	        end: '2030-12-29',
	        cron: '* */2 0',
	        defaultValue: [2017, 7, 9],
	        onChange: function onChange(result) {
//	            console.log(result);
	        },
	        onConfirm: function onConfirm(result) {
	        	console.log(self.id)
	        	console.log(JSON.stringify(result));
			vm_time_table[self.id] = result[0].label+result[1].label+result[2].label;
//	            console.log(result);
	        },
	        id: 'datePicker'
	    });
	   }
	
$("#depart").focus(function() {
	document.activeElement.blur();
});
$("#timespanb").focus(function() {
	document.activeElement.blur();
});
$("#timespane").focus(function() {
	document.activeElement.blur();
});