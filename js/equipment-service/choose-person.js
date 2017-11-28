Vue.component("choose-person", {
	template: "#person-list",
	data: function() {
		return {
			isAllCheck: false,
			personList: [{
					"corpid": null,
					"userid": "ChenGuoDong",
					"name": "jsyce_陈国栋",
					"position": "老师",
					"mobile": null,
					"english_name": "",
					"gender": 1,
					"isleader": 1,
					"telephone": null,
					"email": null,
					"weixinid": null,
					"avatar": "http://p.qlogo.cn/bizmail/G7mxjutjjkbz7JFtic2aMkW7ju6v8VIuSsxL9r2pia9SLgvjhWWicQVmg/0",
					"status": 1,
					"extattr": null,
					"errcode": 0,
					"errmsg": null,
					"P2PData": null
				},
				{
					"corpid": null,
					"userid": "zhangzesheng",
					"name": "jsyce_张泽升",
					"position": "",
					"mobile": null,
					"english_name": "zhangzesheng",
					"gender": 1,
					"isleader": 1,
					"telephone": null,
					"email": null,
					"weixinid": null,
					"avatar": "http://p.qlogo.cn/bizmail/ia2OREdw34BpbYHswf4t8l1n6Zr8vkNic14b0rW7GtVzKpsOSOPJshQQ/0",
					"status": 1,
					"extattr": null,
					"errcode": 0,
					"errmsg": null,
					"P2PData": null
				}
			]
		}
	},
	methods: {
		getTotalCheck: function(e) {
			//						this.isAllCheck=e.target.checked;
			console.log("isAllChecked" + this.isAllCheck)
		},
		getPersonCheck: function(e, person) {
			var isCheck = e.target.checked;
			console.log("isPersonChecked:" + person.name + ":" + isCheck)
			if(!isCheck) {
				this.isAllCheck = false;
			}
		}
	}
})