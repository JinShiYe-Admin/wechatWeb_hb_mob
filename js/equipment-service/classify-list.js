Vue.component("classify-list", {
	template: '#classify-list',
	data: function() {
		return {
			classifyList: [],
			serviceGroupName: '',
			changeType: 0, //0新增组 1更改组名
			activeClassify: {}
		}
	},
	created: function() {

	},
	watch: {
		'$route' (to, from) {
			console.log("******页面导航监听******")
			this.getAllGroups();
		},
		classifyList: function(newVal, oldVal) {
			console.log("classifyList改变后的值:" + JSON.stringify(newVal))
			Vue.nextTick(function() {
				$("#list").Huifold({
					titCell: '.item h4',
					mainCell: '.item .info',
					type: 1,
					trigger: 'click',
					className: "selected",
					speed: "first",
				});
			})
		}
	},
	methods: {
		changeGroupName: function(classify) {
			console.log("****changeGroupName****");
			this.changeType = 1;
			this.serviceGroupName = classify.cname;
			this.activeClassify = classify;
			this.toggleNameDialog(true);
		},
		addService: function() {
			console.log("****addService****");
			this.changeType = 0;
			this.serviceGroupName = '';
			this.toggleNameDialog(true);
		},
		changeClick: function() {
			console.log("****changeClick****");
			if(this.changeType) {
				this.changeServiceGroupName();
			} else {
				this.addServiceGroup();
			}
		},
		changeServiceGroupName: function() {
			console.log("****changeServiceGroupName****");
			var com = this;
			request.editSeviceGroup({
				callcol: this.activeClassify.cname,
				colid: this.activeClassify.kindsid,
				colv: this.serviceGroupName
			}, function(response) {
				if(response.RspCode == 0) {
					com.activeClassify.cname = com.serviceGroupName
				}
			})
		},
		addServiceGroup: function() {
			console.log("****addServiceGroup****");
			var com = this;
			request.addServiceGroup(this.serviceGroupName, function(response) {
				if(response.RspCode == 0) {
					com.getAllGroups();
				}
				com.toggleNameDialog(false);
				com.serviceGroupName = '';
			})
		},
		toggleNameDialog: function(isOpen) {
			console.log("****toggleNameDialog****");
			if(isOpen) {
				$("#modal-demo").modal("show");
			} else {
				$("#modal-demo").modal("hide");
			}
		},
		getAllGroups: function() {
			console.log("****getAllGroups****");
			var com = this;
			request.getServiceGroups(function(data) {
				console.log("获取所有值：" + JSON.stringify(data));
				if(data.RspCode == 0) {
					com.manageGroupsData(data.RspData.dt)
				}
			})
		},
		manageGroupsData: function(listData) {
			console.log("****manageGroupsData****")
			var com = this;
			com.classifyList = listData.map(function(item, index, list) {
				item.gusers = com.manageGusersToObject(item.gusers);
				return item;
			})
			console.log("获取的全部组信息:" + JSON.stringify(com.classifyList))
		},
		manageGusersToObject: function(str) {
			console.log("****manageGusersToObject****");
			var perStrArr = str.split("|");
			var reObj = {};
			if(perStrArr.length > 0) {
				perStrArr.forEach(function(perStr) {
					var personArr = perStr.split(",")
					reObj[personArr[0]] = personArr[1];
				})
			}
			console.log("获取的成员信息：" + JSON.stringify(reObj));
			return reObj;
		},
		changePerson: function(classify) {
			console.log("****changePerson****");
			console.log("要传递的classify:" + JSON.stringify(classify));
			this.$emit("group-info", classify);
			router.push({
				name: 'chooseDepart'
			})
		},
		delClassify: function(classify, index) {
			console.log("*****delClassify*****")
			var com = this;
			request.delServiceGroup(classify.kindsid, function(response) {
				if(response.RspCode == 0) {
					com.classifyList.splice(index, 1);
					console.log("刪除組后的數組:" + JSON.stringify(com.classifyList))
				}
			})
		}
	}
})