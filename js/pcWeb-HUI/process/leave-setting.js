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
			checkedTea: false,
			checkedPar: false,
			name: "",
			note: "",
			pageIndex: 1,
			totalPage: 1,
			corpId: 0
		}
	},
	methods: {
		//添加流程类型
		addLeave: function() {
			//todo 添加流程
			this.changeType = 0;
			this.name = "";
			this.note = "";
			this.checkedTea = false;
			this.checkedPar = false;
			this.toggleLayer(true, "添加请假类型");
		},
		/**
		 * 開關對話框
		 * @param {Object} isOpen
		 * @param {Object} title
		 */
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
		//更改流程信息
		changeLeaveInfo: function(leave) {
			this.changeType = 1;
			this.activeLeave = leave;
			this.name = leave.LeaveTypeName;
			this.note = leave.LeaveTypeNote;
			this.setCheckCon(leave.isLeader);
			this.toggleLayer(true, "更改请假类型信息");
		},
		/**
		 * 編輯請假信息
		 */
		editLeave: function() {
			if(this.changeType == 0) {
				this.addLeave();
			} else {
				this.setLeave();
			}
		},
		/**
		 * 添加請假類型
		 */
		addLeave: function() {
			var com = this;
			processRequest.postProcessData("addLeaveType", {
				corpId: this.corpId,
				leaveTypeName: this.name,
				leaveTypeNote: this.note,
				isLeader: this.getIsLeader()
			}, function(response) {
				if(response.RspCode == 0) {
					com.requireLeave(); //刷新数据
				} else {

				}
			})
		},
		/**
		 * 獲取關聯類型
		 */
		getIsLeader: function() {
			if(this.checkedTea && this.checkedPar) {
				return 0;
			}
			if(this.checkedTea) {
				return 1;
			}
			if(this.checkedPar) {
				return 2;
			}
			return -1;
		},
		/**
		 * 修改請假信息
		 */
		setLeave: function() {
			var com = this;
			processRequest.postProcessData("setLeaveType", {
				leaveTypeId: this.activeLeave.LeaveTypeId,
				leaveTypeName: this.name,
				leaveTypeNote: this.note,
				isLeader: this.getIsLeader()
			}, function(response) {
				if(response.RspCode == 0) {
					com.activeLeave.LeaveTypeName = com.name;
					com.activeLeave.LeaveTypeNote.com.note;
					com.activeLeave.IsLeader = com.getIsLeader();
				} else {

				}
			})
		},
		/**
		 * 设置选择状况
		 */
		setCheckCon: function() {
			switch(isLeader) {
				case 0:
					this.checkedTea = true;
					this.checkedPar = true;
					break;
				case 1:
					this.checkedTea = true;
					this.checkedPar = false;
					break;
				case 2:
					this.checkedTea = false;
					this.checkedPar = true;
					break;
				default:
					this.checkedTea = false;
					this.checkedPar = false;
					break;
			}
		},
		//获取全部流程信息
		requireLeave: function() {
			var com = this;
			processRequest.postProcessData("getLeaveType", {
				corpId: this.corpId,
				pageIndex: this.pageIndex,
				pageSize: 20
			}, function(response) {
				if(response.RspCode == 0) {
					com.leaveList = response.RspData.Data;
				}
			})
		},
		/**
		 * 删除请假类型
		 * @param {Object} leave
		 */
		delLeave: function(leave) {
			var com = this;
			processRequest.postProcessData("delLeaveType", {
				leaveTypeId: leave.LeaveTypeId
			}, function(response) {
				if(response.RspCode == 0) {
					com.requireLeave();
				}
			})
		}
	}
})