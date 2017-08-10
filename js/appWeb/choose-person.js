Vue.component("person-list", {
	props: {
		depart_id: {
			type: Number,
			default: -3
		}
	},
	template: '<div v-if="loading">loading</div>' +
		'<ul v-else v-show="listData.length>0">' +
		'<li v-for="(item,index) of listData"><p>{{item.name}}</p></li>' +
		'</ul>',
	watch: {
		depart_id: function(newVal, oldVal) {
			console.log('获取的新值：' + newVal)
		}
	},
	ready: function() {
		console.log("当前id值：" + this.depart_id);
	},
	data: function() {
		return {
			listData: [],
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
			var thisC = this;
			var id;
			if(thisC.id === -1) {
				id = undefined;
			} else {
				id = thisC.id;
			}
			thisC.loading = true;
			request.getDepartList(function(list) {
				thisC.listData = list;
				console.log("获取的部门信息：" + JSON.stringify(list));
				thisC.loading = false;
			}, id);
		},
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
		goForword: function() {
			router.go(-1);
		}
	}
})