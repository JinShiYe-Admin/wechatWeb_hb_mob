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
			this.listData = [];
		}
	},
	methods: function() {

	}
})