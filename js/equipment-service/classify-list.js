Vue.component("classify-list", {
	template: '#classify-list',
	data: function() {
		return {
			classifies: [{
				title: "电维修",
				personList: [{
					name: "莫"
				}, {
					name: "尚"
				}, {
					name: "霖"
				}]
			}, {
				title: "水管维修",
				personList: [{
					name: "赵"
				}, {
					name: "钱"
				}, {
					name: "孙",
				}, {
					name: "李"
				}]
			}]
		}
	},
	mounted: function() {
		$("#list").Huifold({
			titCell: '.item h4',
			mainCell: '.item .info',
			type: 1,
			trigger: 'click',
			className: "selected",
			speed: "first",
		});
	},
	methods: {
		addPerson: function(classify) {
			router.push({
				name: 'chooseSinPer',
				params: {
					id: -1,
					path: '0'
				}
			})
		},
		delClassify: function() {
			console.log("*****delClassify*****")
		}
	}
})