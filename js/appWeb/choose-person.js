Vue.component("person-list", {
	props: ['id'],
	template: '<div v-if="loading">loading</div>' +
		'<ul v-else>' +
		'<li v-for="(item,index) of listData"><p>{{item.name}}</p></li>' +
		'</ul>',
	data: function() {
		return {
			listData: [],
			loading: false
		}
	},
	computed: {
		getListData: function() {
			request.getDepartList(function(list) {
				this.listData = list;
				console.log("获取的部门信息：" + JSON.stringify(list));
			}, this.id)
		}
	},
	methods: {
		changeId: function(item) {
			router.push({
				name: 'choose-person',
				params: {
					id: item.id
				}
			});
		}
	}
})