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
	watch:{
		id:function(val,old){
			this.getListData();
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
		//通过部门id 更新界面
		changeId: function(item) {
			router.push({
				name: 'choose-person',
				params: {
					id: item.id
				}
			});
		},
		//返回上个页面
		goForword:function(){
			router.go(-1);
		}
	}
})