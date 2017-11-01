Vue.component("single-choose-person", {
	props: ['depart_id', 'chooseType'],
	template: '<div><a href="" v-on:click="backup()">{{parseInt(depart_id)>0?"返回上级部门":"返回"}}</a>' +
		'<div v-bind:class="[\'weui-cells\',\'weui-cells_radio\']">' +
		'<template>' +
		'<template v-if="chooseType===1">' + //人員選擇
		'<a v-for="(item,index) in curDepartInfo.departList" v-if="item.value" v-bind:class="[\'weui-cell\',\'weui-cell_access\']" v-on:click="clickEvent(item,index)">' +
		'<div v-bind:class="[\'weui-cell__bd\']">' +
		'{{item.title}}' +
		'</div>' +
		'<div v-bind:class="[\'weui-cell__ft\']"></div>' +
		'</a>' +
		'<label v-for="(item,index) in curDepartInfo.personList"  v-if="item.userid&&item.isleader" v-bind:class="[\'weui-cell\',\'weui-check__label\']" v-bind:for="item.userid">' +
		'<div v-bind:class="[\'weui-cell__bd\']">' +
		'<p>{{item.name}}</p>' +
		'</div>' +
		'<div v-bind:class="[\'weui-cell__ft\']">' +
		'<input type="radio" v-bind:class="[\'weui-check\']" v-bind:name="depart_id" v-bind:id="item.userid" v-on:change="togglePerson(item,$event)"/>' +
		'<span v-bind:class="[\'weui-icon-checked\']"></span>' +
		'</div>' +
		'</label>' +
		'</template>' + //部門選擇
		'<a v-else v-for="(item,index) in curDepartInfo.departList" v-bind:class="[\'weui-cell\',{\'weui-cell_access\':item.departList.length>0}]">' +
		'<div v-bind:class="[\'weui-cell__hd\']">' +
		'<label v-bind:for="item.value">' +
		'<input type="radio" v-bind:class="[\'weui-check\']"  v-bind:id="item.value" v-bind:name="depart_id"' +
		'v-on:change="togglePerson(item,$event)"/>' +
		'<i v-bind:class="[\'weui-icon-checked\']"></i>' +
		'</label>' +
		'</div>' +
		'<div v-bind:class="[\'weui-cell__bd\']" v-on:click="clickEvent(item,index)">' +
		'<p>{{item.title}}</p>' +
		'</div>' +
		'<div v-bind:class="[\'weui-cell__ft\']" v-on:click="clickEvent(item,index)"></div>' +
		'</a>' +
		'</template>' +
		'</div></div>',
	created: function() {
		this.setPosition();
		console.log("当前的部门id:" + this.$route.params.id);
		this.getAllListData();
	},
	data: function() {
		return {
			listData: [],
			curDepartInfo: {
				departList: [],
				personList: []
			},
			departsTree: [],
			path: "0"
			departId: -1
		}
	},
	watch: {
		'$route' (to, from) {

			this.departId = parseInt(this.$route.params.id);
			this.path = this.$route.params.path;
			console.log('路径：' + this.path);
			console.log("当前的部门id:" + this.departId);
			this.getAllListData();
		}
	},
	methods: {
		backup: function() {
			router.go(-1);
		},
		setSessionStorage: function() {
			events.setSessionArray(consts.KEY_DEPARTS, this.departsTree);
		},
		getAllListData: function() {
			console.log("*********getAllListData******");
			var com = this;
			com.isLoading = true;
			com.departsTree = events.getSessionArray(consts.KEY_DEPARTS);
			if(com.departsTree.length == 0) {
				request.getDepartList(function(data) {
					console.log("getAllListData获取的部门列表：" + JSON.stringify(data));
					com.departsTree = com.getChildrenTree(data);
					com.getCurDepartInfo();
				});
			} else {
				com.getCurDepartInfo();
			}
		},
		/**
		 * 获取当前部门信息
		 */
		getCurDepartInfo: function() {
			console.log('****choose-depart****getCurDepartInfo****')
			var pathArr = this.path.split('-')
			console.log('获取的路径数组：' + pathArr)
			this.curDepartInfo = this.getNodeInTree(this.departsTree, pathArr)
			console.log('获取的本部门数据：' + JSON.stringify(this.curDepartInfo))
			if(this.chooseType == 1) { //选择人员
				this.getCurPersen();
			} else {
				com.isLoading = false;
				this.setSessionStorage();
			}
		}
		/**
		 * 根据路径获取在tree数组中的值
		 * @param tree
		 * @param pathArr 路径数组
		 * @returns {*} departInfo
		 */
		getNodeInTree: function(tree, pathArr) {
			console.log('****choose-depart****getNodeInTree****')
			if(pathArr.length === 1) {
				console.log('根据路径获取的node节点：' + JSON.stringify(tree[pathArr[0]]))
				return tree[pathArr[0]]
			} else {
				return this.getNodeInTree(tree[pathArr[0]].departList, pathArr.slice(1))
			}
		},
		/**
		 * array转化为tree
		 * @param nodes 数组
		 * @returns {Array} tree结构数组
		 */
		getChildrenTree: function(nodes) {
			console.log('****choose-depart***getChildrenTree***')
			if(typeof(nodes) === 'undefined' || nodes.length === 0) {
				return []
			}
			nodes.sort(function(a, b) {
				return a.value - b.value
			})
			let map = {},
				node, roots = []
			for(let i = 0; i < nodes.length; i++) {
				node = nodes[i]
				node.departLst = []
				node.personList = []
				map[node.value] = i // use map to look-up the parents
				if(node.parentvalue > 0) {
					if(typeof(map[node.parentvalue]) !== 'undefined') {
						nodes[map[node.parentvalue]].departList.push(node)
					} else {
						nodes[map[-1]].departList.push(node)
					}
				} else {
					roots.push(node)
				}
			}
			console.log('getChildrenTree获取的数据：' + JSON.stringify(roots))
			return roots
		},
		/**
		 * 获取当前部门人员
		 */
		getCurPersen: function() {
			console.log("********getCurPersen获取当前部门人员********");
			var com = this;
			if(com.curDepartInfo.personList.length == 0) {
				var id;
				if(com.departId == -1) {
					id = 1
				} else {
					id = com.departId;
				}
				request.getDepartPersons(id, 0, 1, function(data) {
					console.log("获取的本部门人员:" + JSON.stringify(data));
					com.curDepartInfo.personList = com.getLeaderPersen(data);
					if(com.curDepartInfo.departList.length == 0 && com.curDepartInfo.personList.length == 0) {
						alert("当前部门无子部门和老师！");
					}
					com.isLoading = false;
					com.setSessionStorage();
				})
			} else {
				com.isLoading = false;
				com.setSessionStorage();
			}

		},
		getLeaderPersen: function(data) {
			var leaderPersen = data.filter(function(person) {
				return person.isleader;
			})
		}
		/**
		 * 列表cell
		 * @param {Object} item
		 */
		clickEvent: function(item, index) {
			console.log("********clickEvent********");
			if(item.value) {
				this.routerTo(item, index);
			}
		},
		/**
		 * 选择或取消选择人员的响应方法
		 * @param {Object} item
		 * @param {Object} event
		 */
		togglePerson: function(item, event) { //关注的人 选择
			console.log("********关注的人事件传递********");
			var isAdd = event.target.checked;
			this.$emit('chosedPerson', item, isAdd);
			this.routerToTab();
		},
		routerToTab: function() {
			router.go(-this.path.split("-").length);
		},
		//通过部门id 更新界面
		routerTo: function(item, index) {
			console.log("********routerTo路由跳转********");
			if(this.chooseType === 0 && !this.curDepartInfo.departList.length === 0) {
				return;
			}
			router.push({
				name: 'chooseSinPer',
				params: {
					id: item.value
					path: this.path + "-" + index
				}
			})
		}
	}
});