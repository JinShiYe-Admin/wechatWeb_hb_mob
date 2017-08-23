var table_data = {
	type: 0,
	flag: 0,
	isCreated: 0,
	rowIndex:0,
	colIndex:0,
	edulename: "",
	departname: "",
	departid: "",
	timespanb: "",
	timespane: "",
	items_array: [],
	sub_array: [],
	list_array: ["daytype", "timespan", "mon", "tues", "wed", "thur", "fri", "sat", "sun"]
}
Vue.component("time-table", {
	template: '#template-table',
	data: function() {
		return table_data
	},
	created: function() {
		if(table_data.isCreated == 0) {
			table_data.isCreated = 1;
		} else {
			if(table_data.type==1){
							
				// 多列选择器
				weui.picker(table_data.sub_array, {
					defaultValue: [],
					onChange: function onChange(result) {
//						console.log(result);
					},
					onConfirm: function onConfirm(result) {
						console.log(result);
						var index = table_data.rowIndex;
						var colIndex = table_data.colIndex
						var model = table_data.items_array[index]
						model[colIndex] = result[0].label;
						
						var uname = table_data.items_array[index][colIndex + "uname"];
						var uid = table_data.items_array[index][colIndex + "uid"];
						var colv = result[0].value+'|'+result[0].label+'|'+uid+'|'+uname
						var colid = model.weekrowid
						editEduleweek(colv, colIndex, colid);
					},
					id: 'picker'
				});
			}
			return;
		}
		if(table_data.flag == 0) {
			getSub();
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
					monsubname: "选择课程",
					monuname: "人员",
					tuessubname: "选择课程",
					tuesuname: "人员",
					wedsubname: "选择课程",
					weduname: "人员",
					thursubname: "选择课程",
					thuruname: "人员",
					frisubname: "选择课程",
					friuname: "人员",
					satsubname: "选择课程",
					satuname: "人员",
					sunsubname: "选择课程",
					sununame: "人员"
				};
				this.items_array.push(item);
			}
		} else {
			getEduleweek(detail.eduleid);
			getSub();
		}

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
		clickSubmitButton: function() {
			addEdule();

		},
		/**
		 * 点击某一个item
		 * @param {Object} index 第几行
		 * @param {Object} callcol 对应的操作
		 */
		clickItem: function(index, callcol) {
			console.log("clickItem:" + index + " " + callcol);
			if(callcol == "daytype") {
				//点击类型
				//				table_data.items_array[index][callcol] = callcol;
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
//						console.log(result);
					},
					onConfirm: function onConfirm(result) {
						console.log(result);
						var model = table_data.items_array[index]
						model.daytype = result[0].label;
						var colv = result[0].label
						var colid = model.weekrowid
						editEduleweek(colv, callcol, colid);
					},
					id: 'picker'
				});

			} else if(callcol == "timespan") {
				//点击时间段
				//				table_data.items_array[index][callcol] = callcol;

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
//						console.log(result);
					},
					onConfirm: function onConfirm(result) {
						console.log(JSON.stringify(result));
						var model = table_data.items_array[index]
						model.timespan = result[0].label + ":" + result[2].label + "-" + result[4].label + ":" + result[6].label;
						var callcol = "timespan";
						var colv = model.timespan
						var colid = model.weekrowid
						editEduleweek(colv, callcol, colid);
					},
					id: 'multiPickerBtn'
				});

			} else {
				table_data.type = 1;
				table_data.rowIndex = index;
				table_data.colIndex = callcol;
				router.push({
					name: 'chooseSinPer',
					params: {
						id: -1
					}
				})
				//点击具体星期
				//				this.items_array[index][callcol + "subname"] = callcol + "subname";
				//				this.items_array[index][callcol + "uname"] = callcol + "uname";
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
		//		console.log('刷新数据:' + JSON.stringify(this.$data))
		//		var div = document.getElementById("time_table");
		//		console.log(div.innerHTML)

	}
});

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
			table_data.sub_array = data.RspData.dt;
			for(var i = 0; i < table_data.sub_array.length; i++) {
				var model = table_data.sub_array[i];
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
			table_data.items_array = data.RspData

		} else {
			mui.toast(data.RspTxt)
		}
	})

}

function editEduleweek(colv, callcol, colid) {
	if(table_data.flag == 0) {
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
		edulename: table_data.edulename,
		departid: table_data.departid,
		departname: table_data.departname,
		timespanb: table_data.timespanb,
		timespane: table_data.timespane,
		edulerows: table_data.items_array

	}
	unitWebsitePro(tempData, function(data) {
		console.log('添加课程表:' + JSON.stringify(data));
		if(data.RspCode == 0) {} else {
			mui.toast(data.RspTxt)
		}
	})

}

function editEdule(oldVal, newVal, callcol) {
	if(table_data.flag == 0 || oldVal == newVal) {
		return;
	}
	var colv
	switch(callcol) {
		case "edulename":
			{
				colv = table_data.edulename
			}
			break;
		case "depart":
			{
				colv = table_data.departid + "|" + table_data.departname
			}
			break;
		case "timespanb":
			{
				colv = table_data.timespanb
			}
			break;
		case "timespane":
			{
				colv = table_data.timespane
			}
			break;
		default:
			break;
	}

	var tempData = {
		cmd: 'edule',
		type: 'edit',
		callcol: callcol,
		colid: table_data.eduleid,
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
	table_data.type = 0;
	router.push({
		name: 'chooseSinPer',
		params: {
			id: -1
		}
	})
}

function selectDate(input_item) {
	document.activeElement.blur();
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
			table_data[self.id] = result[0].label + result[1].label + result[2].label;
			//	            console.log(result);
		},
		id: 'datePicker'
	});
}