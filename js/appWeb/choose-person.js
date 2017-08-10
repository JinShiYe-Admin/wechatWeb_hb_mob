Vue.component("person-list", {
	props: {
		depart_id: {
			type: Number,
			default: -3
		}
	},
	template: '<div v-if="loading">loading</div>' +
		'<ul v-else v-show="listData.length>0">' +
		'<li v-for="(item,index) of listData" v-on:click="routerTo(item)" ><p>{{item.title}}</p></li>' +
		'</ul>',
	watch: {
		depart_id: function(newVal, oldVal) {
			console.log('获取的新值：' + newVal);
		}
	},
	ready: function() {
		console.log("当前id值：" + this.depart_id);
	},
	data: function() {
		return {
			listData: [],
			personList: [],
			loading: false,
			id: this.depart_id
		}
	},
	created: function() {
		console.log("获取的的id" + this.$route.params.id)
		this.getListData();
	},
	methods: {
		getListData: function() {
			var com = this;
			this.isLoading = true;
			request.getDepartList(function(data) {
				console.log("获取的部门列表：" + JSON.stringify(data));
				com.listData = data;
				com.isLoading = false;
				com.getPesonList(data[0].value);
			});
		},
		getPersonList: function(id) {
			request.getDepartPersons(id, function(data) {
				console.log("获取的部门人员列表:" + JSON.stringify(data));
			})
		},
		//通过部门id 更新界面
		routerTo: function(item) {
			router.push({
				name: 'choose-person',
				params: {
					id: item.value
				}
			});
		},
		//返回上个页面
		goForword: function() {
			router.go(-1);
		}
	}
})