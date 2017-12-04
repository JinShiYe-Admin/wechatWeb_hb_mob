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
			note: ""
		}
	},
	methods: {
		getAllCheckPerson: function() {
			this.getCheckPerson(1, 0);
		},
		getCurPagePerson: function() {
			this.getCheckPerson(this.pageIndex, 20);
		},
		getCheckPerson: function(pageIndex, pageSize) {
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
		delPerson: function(person) {
			var com = this;
			processRequest.postProcessData("delApprMan", {
				apprManId: perosn.ApprMan
			}, function(response) {
				if(response.RspCode == 0) {
					com.getCurPagePerson();
				} else {
					alert(response.RspTxt);
				}
			})
		},
		changeArrToObj: function(arr) {
			var obj = {};
			arr.forEach(function(item, index, arr) {
				obj[item.ApprMan] = obj[item.ApprManName]
			});
			return obj;
		},
		nextPage: function() {
			if(this.pageIndex < this.totalPage) {
				this.pageIndex++;
				this.getCurPagePerson();
			}
		},
		lastPage: function() {
			if(this.pageIndex > 1) {
				this.pageIndex--;
				this.getCurPagePerson();
			}
		}
	}
})