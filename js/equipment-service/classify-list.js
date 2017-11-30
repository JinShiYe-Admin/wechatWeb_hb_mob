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
	mounted: function() {
		this.getAllGroups();
	},
	watch: {
		'$route' (to, from) {
			console.log("******页面导航监听******")
			console.log("to.path:" + to.path);
			console.log("from path:" + from.path);
			this.getAllGroups();
		},
		classifyList: function(newVal, oldVal) {
			console.log("classifyList改变后的值:" + JSON.stringify(newVal))
		}
	},
	filters: {
		formatTime: function(timeStr) {
			var timeArr = timeStr.split("T");
			var hourArr = timeArr[1].split(".");
			return timeArr[0] + " " + hourArr[0]
		}
	},
	methods: {
		changeState: function(classify, index) {
			var com = this;
			var stat = classify.stat ? 0 : 1;
			request.editSeviceGroup({
				colid: classify.kindsid,
				callcol: 'stat',
				colv: stat
			}, function(response) {
				if(response.RspCode == 0) {
					com.classifyList[index].stat = stat
				}
			})
		},
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
				callcol: "cname",
				colid: this.activeClassify.kindsid,
				colv: this.serviceGroupName
			}, function(response) {
				if(response.RspCode == 0) {
					com.activeClassify.cname = com.serviceGroupName
				}
				com.toggleNameDialog(false);
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
			var com = this;
			com.classifyList = [{
					"kindsid": 2,
					"cname": "新租",
					"gusers": {
						"huxy": "胡孝钰",
						"qianr": "钱荣"
					},
					"recname": "安琪",
					"rectime": "2017-11-30T09:12:12.287",
					"recuser": "anqi",
					"stat": 0,
					"ROWSTAT": null,
					"isShow": false
				},
				{
					"kindsid": 4,
					"cname": "新名字007",
					"gusers": {
						"anqi": "安琪",
						"maohuimin": "毛慧敏",
						"konglingming": "孔令明"
					},
					"recname": "安琪",
					"rectime": "2017-11-30T09:30:40.693",
					"recuser": "anqi",
					"stat": 1,
					"ROWSTAT": null,
					"isShow": false
				},
				{
					"kindsid": 3,
					"cname": "新名字",
					"gusers": {
						"zhangbx": "章彬香",
						"dingf": "丁峰",
						"guancl": "管彩丽",
						"wangy": "汪英",
						"lvqy": "吕巧云",
						"weijj": "魏晶晶",
						"yangq": "杨琼",
						"15866690035": "莫名"
					},
					"recname": "安琪",
					"rectime": "2017-11-30T09:12:21.43",
					"recuser": "anqi",
					"stat": 1,
					"ROWSTAT": null,
					"isShow": false
				},
				{
					"kindsid": 5,
					"cname": "第五组",
					"gusers": {
						"huxy": "胡孝钰",
						"chenf": "陈芳",
						"chenl": "陈丽",
						"chenyy": "陈亚芸",
						"xuey": "薛杨",
						"taocm": "陶彩梅",
						"zhouy": "周逸"
					},
					"recname": "安琪",
					"rectime": "2017-11-30T09:33:38.29",
					"recuser": "anqi",
					"stat": 1,
					"ROWSTAT": null,
					"isShow": false
				},
				{
					"kindsid": 1,
					"cname": "1234456",
					"gusers": {
						"yangg": "杨淦",
						"bayp": "巴永平"
					},
					"recname": "安琪",
					"rectime": "2017-11-30T09:11:59.087",
					"recuser": "anqi",
					"stat": 1,
					"ROWSTAT": null,
					"isShow": false
				}
			];
			console.log("****getAllGroups****");

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
				item.isShow = false;
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
					console.log("删除组后的数组:" + JSON.stringify(com.classifyList))
				}
			})
		}
	}
})