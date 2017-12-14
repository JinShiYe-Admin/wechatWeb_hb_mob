Vue.component("check-person-list", {
	template: "#checkPerson-list",
	data: function() {
		return {
			checkPersonList: [],
			tablebases: null,
			checkedPerson: {},
			changeType: 0, //0 新建流程 1修改流程
			corpId: 0,
			name: "",
			note: "",
			selectedInputPerson: {},
			isAllCheck: false,
			curPage: 0
		}
	},
	watch: {
		checkedPerson: function(newVal, oldVal) {
			console.log("*****chosedPerson******")
			this.$emit("person-info", newVal);

		},
		checkPersonList: function(newVal, oldVal) {
			console.log("*****checkPersonList******");
			console.log("newVal:" + JSON.stringify(newVal));
			if(this.tablebases != null) {
				this.tablebases.destroy();
			}
			this.$nextTick(this.newTablebases);
		}
	},
	mounted: function() {
		this.getCorpId();
	},
	methods: {
		getCorpId: function() {
			var com = this;
			request.requestPersonalInfo(function(response) {
				console.log("获取的corpId数据：" + JSON.stringify(response));
				if(response.RspCode == 0) {
					com.corpId = JSON.parse(response.RspData).corpid;
					com.getAllCheckPerson();
				}
			})
		},
		newTablebases: function() {
			console.log("******newTablebases******");

			this.tablebases = $('.table-sort').DataTable({
				pageLength: 10,
				lengthChange: false,
				columns: [{
						"orderable": false
					},
					null,
					{
						"orderable": false
					}
				]
			});
			this.tablebases.table(0).page(this.curPage).draw(false);
		},
		/**
		 * 获取状态
		 * @param {Object} e
		 * @param {Object} person
		 */
		getStatus: function(e, person) {
			console.log("****getStatus*****");
			var isAdd = e.target.checked;
			if(isAdd) {
				this.selectedInputPerson[person.TabId] = person.ApprManName;
			} else {
				delete this.selectedInputPerson[person.TabId];
				this.isAllCheck = false;
			}
		},
		/**
		 * 全选状态解控
		 */
		getAllCheckStatus: function(e) {
			console.log("*****getAllCheckSatus*****")
			var isAllAdd = e.target.checked;
			this.getCurPage();
			this.inputToggleAll(isAllAdd);
		},
		getCurPage: function() {
			this.curPage = this.tablebases.page.info().page;
		},
		/**
		 * 全选逻辑
		 * @param {Object} isAdd
		 */
		inputToggleAll: function(isAdd) {
			console.log("****inputToggleAll****");
			var com = this;
			if(isAdd) {
				com.checkPersonList.forEach(function(checkPerson, index) {
					if(index >= com.curPage * 10 && index < (com.curPage + 1) * 10) {
						checkPerson.isSelect = true;
						com.selectedInputPerson[checkPerson.TabId] = checkPerson.ApprManName;
					}
				})
			} else {
				com.selectedInputPerson = {};
			}
		},
		/**
		 * 所有具有审核权限的人员信息
		 */
		getAllCheckPerson: function() {
			console.log("****getAllCheckPerson*****");
			this.getCheckPerson(1, 0);
		},
		/**
		 * 获取审核人员
		 * @param {Object} pageIndex
		 * @param {Object} pageSize
		 */
		getCheckPerson: function(pageIndex, pageSize) {
			console.log("****getCheckPerson****");
			var com = this;
			processRequest.postProcessData("getApprMan", {
				corpId: this.corpId,
				pageIndex: 1,
				pageSize: 0
			}, function(response) {
				if(response.RspCode == 0) {
					com.checkPersonList = response.RspData.Data;
					com.checkedPerson = com.changeArrToObj(response.RspData.Data);
				}
			})
		},
		/**
		 * 删除人员
		 */
		delPersons: function() {
			console.log("****批量删除人员****");
			var com = this;
			var keys = Object.keys(com.selectedInputPerson);
			console.log("selectedInputPerson:" + JSON.stringify(com.selectedInputPerson))
			console.log("theKeys:" + JSON.stringify(keys));
			if(keys.length > 0) {
				var count = 0;
				for(var theKey in com.selectedInputPerson) {
					com.delPerson(theKey, function() {
						count++;
						console.log("数据数量：" + count);
						console.log("keys:" + keys.length);
						if(count == keys.length) {
							com.getAllCheckPerson();
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
			com.getCurPage();
			this.delPerson(person.TabId, function() {
				delete com.checkedPerson[person.ApprMan];
				com.getAllCheckPerson();
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
				callback();
				if(response.RspCode == 0) {

				} else {

					alert(response.RspTxt);
				}
			})
		},
		/**
		 * 将数组转换成object
		 * @param {Object} arr
		 */
		changeArrToObj: function(arr) {
			console.log("****changeArrToObj****");
			var obj = {};
			arr.forEach(function(item, index, arr) {
				obj[item.ApprMan] = item.ApprManName;
			});
			console.log("checkedPerson:" + JSON.stringify(obj));
			return obj;
		},
		/**
		 * 添加人员
		 */
		addPersons: function() {
			router.push({
				name: "chooseDepart"
			})
		}
	}
})