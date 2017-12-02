Vue.component("leave-setting", {
	template: "#leave-list",
	data: function() {
		return {
			leaveList: [{
				LeaveTypeId: 0, //流程Id
				ProcTypeName: "流程0", //流程名称
				ProTypeNote: "流程0备注" //流程备注
			}, {
				LeaveTypeId: 1, //流程Id
				ProcTypeName: "流程1", //流程名称
				ProTypeNote: "流程1备注" //流程备注
			}, {
				LeaveTypeId: 2, //流程Id
				ProcTypeName: "流程2", //流程名称
				ProTypeNote: "流程2备注" //流程备注
			}, {
				LeaveTypeId: 3, //流程Id
				ProcTypeName: "流程3", //流程名称
				ProTypeNote: "流程3备注" //流程备注
			}],
			activeLeave: {
				LeaveTypeId: 0, //流程Id
				ProcTypeName: "流程4", //流程名称
				ProTypeNote: "流程4备注" //流程备注
			},
			changeType: 0, //0 新建流程 1修改流程
		}
	},
	methods: {
		//添加流程类型
		addLeave: function() {
			//todo 添加流程
			this.changeType = 0;
			this.activeLeave.ProcTypeName = "";
			this.activeLeave.ProTypeNote = "";
			this.toggleLayer(true,"添加流程");
		},
		toggleLayer: function(isOpen,title) {
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
		changeLeaveList: function(Leave) {
			this.activeLeave = Leave;
			console.log("更改流程链：" + JSON.stringify(Leave))
			this.$emit("Leave-info", this.activeLeave);
			router.push({
				name: 'chooseDepart'
			})
		},
		//更改流程信息
		changeLeaveInfo: function(Leave) {
			this.changeType = 1;
			this.activeLeave = Leave;
			this.toggleLayer(true,"更改流程信息");
		},
		//获取全部流程信息
		requireAllLeave: function() {

		}
	}
})