Vue.component("person-list", {
	props: {
		depart_id: {
			type: Number,
			default: -2
		}
	},
	template: '<div v-if="loading">loading</div>' +
		'<ul v-else v-show="listData.length>0">' +
		'<li v-for="(item,index) of listData" v-on:click="routerTo(item)" ><p>{{item.title}}</p></li>' +
		'</ul>',
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
				com.listData = com.rechargeList(JSON.parse(data));
				com.isLoading = false;
				com.getPersonList(-1);
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
		},
		rechargeList: function(nodes) {
			var map = {},
				node, roots = [];
			for(var i = 0; i < nodes.length; i++) {
				node = nodes[i];
				node.children = [];
				map[node.value] = i; // use map to look-up the parents
				if(node.parentvalue > 1) {
					nodes[map[node.parentvalue]].children.push(node);
				} else if(node.parentvalue === 1) {
					roots.push(node);
				}
			}
			console.log("重拍数组后的数据：" + JSON.stringify(roots))
			return roots;
		}
	}
})