Vue.component("process-setting", {
	template: "#process-list",
	data: function() {
		return {
			processList: [{
				ProcessTypeId: 0, //流程Id
				ProcTypeName: "流程0", //流程名称
				ProTypeNote: "流程0备注" //流程备注
			}, {
				ProcessTypeId: 1, //流程Id
				ProcTypeName: "流程1", //流程名称
				ProTypeNote: "流程1备注" //流程备注
			}, {
				ProcessTypeId: 2, //流程Id
				ProcTypeName: "流程2", //流程名称
				ProTypeNote: "流程2备注" //流程备注
			}, {
				ProcessTypeId: 3, //流程Id
				ProcTypeName: "流程3", //流程名称
				ProTypeNote: "流程3备注" //流程备注
			}],
			activeProcess: {
				ProcessTypeId: 0, //流程Id
				ProcTypeName: "流程4", //流程名称
				ProTypeNote: "流程4备注" //流程备注
			},
			changeType: 0, //0 新建流程 1修改流程
		}
	},
	methods: {
		//添加流程类型
		addProcess: function() {
			//todo 添加流程
			this.changeType = 0;
			this.activeProcess.ProcTypeName = "";
			this.activeProcess.ProTypeNote = "";
			this.toggleLayer(true, "添加流程");
		},
		toggleLayer: function(isOpen, title) {
			if(isOpen) {
				layer.open({
					type: 1,
					title: title,
					area: '500px',
					zIndex: 999,
					content: $('#edit-pocessInfo')
				});
			} else {
				layer.closeAll("page");
			}

		},
		//更改流程链
		changeProcessList: function(process) {
			this.activeProcess = process;
			console.log("更改流程链：" + JSON.stringify(process))
			this.$emit("process-info", this.activeProcess);
			router.push({
				name: 'chooseDepart'
			})
		},
		//更改流程信息
		changeProcessInfo: function(process) {
			this.changeType = 1;
			this.activeProcess = process;
			this.toggleLayer(true, "更改流程信息");
		},
		//获取全部流程信息
		requireAllProcess: function() {

		},
		//array to obj
		changeArrayToObj: function(arrays) {
			var obj = {};
			for(var i in arrays) {
				obj[arrays[i][0]] = arrays[i][1];
			}
			return obj;
		}
	}
})