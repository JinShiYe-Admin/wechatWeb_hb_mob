Vue.component("person-list", {
	props: {
		depart_id: {
			type: Number,
			default: -2
		}
	},
	template: '<div v-if="loading">loading</div>' +
		'<ul v-else v-show="listData.length>0">' +
		'<li v-for="(item,index) of listData" v-on:click="clickEvent(item)"><p>{{item.title?item.title:item.name}}</p></li>' +
		'</ul>',
	data: function() {
		return {
			listData: [],
			loading: false,
			id: this.depart_id
		}
	},
	created: function() {
		console.log("获取的的id" + this.$route.params.id)
		if(this.$route.params.id === -1) {
			this.getAllListData();
		} else {
			this.getCurDepart();
		}
	},
	methods: {
		getAllListData: function() {
			var com = this;
			this.isLoading = true;
			request.getDepartList(function(data) {
				console.log("获取的部门列表：" + JSON.stringify(data));
				com.listData = JSON.parse(data);
				localStorage.setItem(consts.KEY_DEPARTS, com.listData);
				com.getCurDepart();
				com.isLoading = false;
			});
		},
		getCurDepart: function() {
			var parentId = 0;
			if(this.depart_id === -1) {
				parentId = 1;
			} else {
				parentId = this.depart_id;
			}
			var listData = localStorage.getItem(consts.KEY_DEPARTS);
			var childDepart = listData.filter(function(item) {
				return item.parentvalue == parentId;
			});
			console.log("获取的当前部门的子部门:" + JSON.stringify(childDepart));
			if(childDepart && childDepart.length === 0) {
				getPersonList(this.depart_id);
			} else {
				this.listData = childDepart;
			}
		},
		getPersonList: function(id) {
			request.getDepartPersons(id, function(data) {
				this.loading = true;
				console.log("获取的部门人员列表:" + JSON.stringify(data));
				this.listData = data;
			})
		},
		clickEvent: function(item) {
			if(item.value) {
				this.routerTo(item);
			} else {
				this.choosePerson(item);
			}
		},
		choosePesron: function(item) {

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