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
			corpId: 0,
			pageIndex: 1,
			totalPage: 1,
			name: "",
			note: ""
		}
	},
	methods: {
		//添加流程类型
		addProcess: function() {
			//todo 添加流程
			this.changeType = 0;
			this.name = "";
			this.note = "";
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
		/**
		 * 更改流程链
		 * @param {Object} process 要更改流程链的流程
		 */
		changeProcessList: function(process) {
			this.activeProcess = process;
			console.log("更改流程链：" + JSON.stringify(process))
			this.$emit("process-info", this.activeProcess);
			router.push({
				name: 'chooseDepart'
			})
		},
		/**
		 * 更改流程信息
		 * @param {Object} process
		 */
		changeProcessInfo: function(process) {
			this.changeType = 1;
			this.name = process.ProcTypeName;
			this.note = process.ProTypeNote;
			this.activeProcess = process;
			this.toggleLayer(true, "更改流程信息");
		},
		submitProcess: function() {
			if(changeType === 0) {
				this.addProcessType();
			} else {
				this.setProcessType();
			}
		},
		/**
		 * 添加流程類型信息
		 */
		addProcessType: function() {
			var com = this;
			processRequest.postProcessData("addProcessType", {
				corpId: this.corpId,
				procTypeName: this.name,
				proTypeNote: this.note
			}, function(response) {
				if(response.RspCode == 0) {
					com.addDataToList(response.RspData.Result);
				}
			})
		},
		/**
		 * 增加数据类型后，添加数据
		 * @param {Object} processId
		 */
		addDataToList: function(processId) {
			var process = {
				ProcessTypeId: processId,
				ProcTypeName: this.name,
				ProTypeNote: this.note,
				ProcessListId: -1,
				ApprManList: [],
				ProcNote: ""
			}
			if(this.pageIndex === 1) {
				this.processList.splice(0, 0, process);
				this.ProcessList.splice(20, 1)
			} else {
				this.requireProcess();
			}
		},
		setProcessType: function() {
			var com = this;
			processRequest.postProcessData("setProcessType", {
				procTypeId: this.activeProcess.ProcessTypeId,
				procTypeName: this.name,
				procTypeNote: this.note
			}, function(response) {
				if(response.RspCode == 0) {
					com.activeProcess.ProcTypeName = this.name;
					com.activeProcess.procTypeNote = this.note;
				}
			})
		},

		/**
		 * 分页获取流程
		 */
		requireProcess: function() {
			var com = this;
			processRequest.postProcessData("getProcessList", {
				corpId: this.corpId,
				pageIndex: this.pageIndex,
				pageSize: 20
			}, function(response) {
				if(response.RspCode == 0) {
					com.totalPage = response.TotalPage;
					com.processList = response.RspData.Data
				}
			})
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