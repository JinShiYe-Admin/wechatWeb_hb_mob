Vue.component("check-person-list", {
	template: "#checkPerson-list",
	data: function() {
		return {
			checkPersonList: [{
				ApprMan: 0, //人员id
				ApprManName: "人员0", //人员名称
			}, {
				ApprMan: 1, //人员id
				ApprManName: "人员1", //人员名称
			}, {
				ApprMan: 2, //人员id
				ApprManName: "人员2", //人员名称
			}, {
				ApprMan: 3, //人员id
				ApprManName: "人员3", //人员名称
			}],
			activeProcess: {
				ApprMan: 4, //人员id
				ApprManName: "人员4", //人员名称
			},
			chosedPerson: {},
			changeType: 0, //0 新建流程 1修改流程
			corpId: 0,
			pageIndex: 1,
			totalPage: 10,
			name: "",
			note: "",
			selectedInputPerson: {},
			isAllCheck: false
		}
	},
	watch: {
		chosedPerson: function(newVal, oldVal) {
			this.$emit("person-info", newVal);
		}
	},
	methods: {
		getStatus: function(e, person) {
			console.log("****getStatus*****");
			var isAdd = e.target.checked;
			if(isAdd) {
				this.selectedInputPerson[person.ApprMan] = person.ApprManName;
			} else {
				delete this.selectedInputPerson[person.ApprMan];
				this.isAllCheck = false;
			}
		},
		/**
		 * 全选状态解控
		 */
		getAllCheckStatus: function(e) {
			console.log("*****getAllCheckSatus*****")
			var isAllAdd = e.target.checked;
			this.inputToggleAll(isAllAdd)
		},
		inputToggleAll: function(isAdd) {
			if(isAdd) {
				for(var checkPerson in checkPersonList) {
					this.selectedInputPerson[checkPerson.ApprMan] = checkPerson.ApprManName;
				}
			} else {
				this.selectedInputPerson = {};
			}
		},
		getAllCheckPerson: function() {
			console.log("****getAllCheckPerson*****");
			this.getCheckPerson(1, 0);
		},
		getCurPagePerson: function() {
			console.log("****getCurPagePerson****");
			this.getCheckPerson(this.pageIndex, 20);
		},
		getCheckPerson: function(pageIndex, pageSize) {
			console.log("****getCheckPerson****");
			var com = this;
			processRequest.postProcessData("getApprMan", {
				corpId: this.corpId,
				pageIndex: this.pageIndex,
				pageSize: pageSize
			}, function(response) {
				if(response.RspCode == 0) {
					if(pageSize === 0) {
						com.chosedPerson = com.changeArrToObj(response.RspData.Data);
					} else {
						com.checkPersonList = response.RspData.Data;
						com.totalPage = response.RspData.TotalPage;
					}
				}
			})
		},
		delPersons: function() {
			console.log("****批量删除人员****");
			var com = this;
			var keys = Object.keys(com.selectedInputPerson);
			if(keys.length > 0) {
				var count = 0;
				for(var theKey in keys) {
					com.delPerson(theKey, function() {
						count++;
						if(count == keys.length) {
							com.getAllCheckPerson();
							com.getCurPagePerson();
						}
					})
				}
			} else {
				alert("请选择人员！");
			}
		},
		/**
		 * 删除当前审核人员
		 * @param {Object} person
		 */
		delCurPerson: function(person) {
			console.log("****delCurPerson*****");
			var com = this;
			this.delPerson(person.ApprMan, function() {
				delete com.chosedPerson[perosn.ApprMan];
				com.getCurPagePerson();
			});
		},
		/**
		 * 刪除人員
		 * @param {Object} personId
		 * @param {Object} callback
		 */
		delPerson: function(personId, callback) {
			console.log("****delPerson****");
			var com = this;
			processRequest.postProcessData("delApprMan", {
				apprManId: personId
			}, function(response) {
				if(response.RspCode == 0) {
					callback();
				} else {
					alert(response.RspTxt);
				}
			})
		},
		changeArrToObj: function(arr) {
			console.log("****changeArrToObj****");
			var obj = {};
			arr.forEach(function(item, index, arr) {
				obj[item.ApprMan] = obj[item.ApprManName]
			});
			return obj;
		},
		nextPage: function() {
			console.log("****nextPage*****");
			if(this.pageIndex < this.totalPage) {
				this.pageIndex++;
				this.getCurPagePerson();
			}
		},
		lastPage: function() {
			console.log("****lastPage****");
			if(this.pageIndex > 1) {
				this.pageIndex--;
				this.getCurPagePerson();
			}
		},
		addPersons: function() {
			router.push({
				name: "chooseDepart"
			})
		}
	}
})