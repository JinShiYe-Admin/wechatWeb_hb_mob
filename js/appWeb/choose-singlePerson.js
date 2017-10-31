Vue.component("single-choose-person", {
	props: ['depart_id', 'chooseType'],
	template: '<div><a href="" v-on:click="backup()">{{parseInt(depart_id)>0?"返回上级部门":"返回"}}</a>' +
		'<div v-bind:class="[\'weui-cells\',\'weui-cells_radio\']">' +
		'<template v-for="(item,index) of listData">' +
		'<template v-if="chooseType===1">' +
		'<a v-if="item.value" v-bind:class="[\'weui-cell\',\'weui-cell_access\']" v-on:click="clickEvent(item)">' +
		'<div v-bind:class="[\'weui-cell__bd\']">' +
		'{{item.title}}' +
		'</div>' +
		'<div v-bind:class="[\'weui-cell__ft\']"></div>' +
		'</a>' +
		'<label v-else-if="item.userid&&item.isleader" v-bind:class="[\'weui-cell\',\'weui-check__label\']" v-bind:for="item.userid">' +
		'<div v-bind:class="[\'weui-cell__bd\']">' +
		'<p>{{item.name}}</p>' +
		'</div>' +
		'<div v-bind:class="[\'weui-cell__ft\']">' +
		'<input type="radio" v-bind:class="[\'weui-check\']" v-bind:name="depart_id" v-bind:id="item.userid" v-on:change="togglePerson(item,$event)"/>' +
		'<span v-bind:class="[\'weui-icon-checked\']"></span>' +
		'</div>' +
		'</label>' +
		'</template>' +
		'<a v-else v-bind:class="[\'weui-cell\',{\'weui-cell_access\':item.children.length>0}]">' +
		'<div v-bind:class="[\'weui-cell__hd\']">' +
		'<label v-bind:for="item.value">' +
		'<input type="radio" v-bind:class="[\'weui-check\']"  v-bind:id="item.value" v-bind:name="depart_id"' +
		'v-on:change="togglePerson(item,$event)"/>' +
		'<i v-bind:class="[\'weui-icon-checked\']"></i>' +
		'</label>' +
		'</div>' +
		'<div v-bind:class="[\'weui-cell__bd\']" v-on:click="clickEvent(item)">' +
		'<p>{{item.title}}</p>' +
		'</div>' +
		'<div v-bind:class="[\'weui-cell__ft\']" v-on:click="clickEvent(item)"></div>' +
		'</a>' +
		'</template>' +
		'</div></div>',
	created: function() {
		this.setPosition();
		console.log("当前的部门id:" + this.$route.params.id);
		this.getAllListData();
	},
	watch: {
		'$route' (to, from) {
			this.setPosition();
			console.log("当前的部门id:" + this.$route.params.id);
			if(this.$route.params.id == -1) {
				this.getAllListData();
			} else {
				this.getCurDeparts();
			}
		}
	},
	data: function() {
		return {
			listData: []
		}
	},
	methods: {
		backup: function() {
			router.go(-1);
		},
		getAllListData: function() {
			console.log("*********getAllListData******");
			var com = this;
			com.isLoading = true;
			request.getDepartList(function(data) {
				console.log("getAllListData获取的部门列表：" + JSON.stringify(JSON.parse(data)));
				com.setRealParentValue(data);
				sessionStorage.setItem(consts.KEY_DEPARTS, data);
				com.getCurDeparts();
			});
		},
		setRealParentValue: function(list) {
			if(typeof(list) == "undefined" || list.length == 0) {
				return;
			}
			list.sort(function(a, b) {
				return a.value - b.value;
			})
			var map = {},
				item;
			for(var i = 0; i < list.length; i++) {
				item = list[i];
				map[item.value] = i;
				if(item.parentvalue > 0) {
					if(typeof(map[item.parentvalue]) == "undefined") {
						item.parentvalue = 1;
					}
				}
			}
		},
		/**
		 * 获取当前部门人员
		 */
		getCurDeparts: function() {
			console.log("*********getCurDeparts******");
			this.isLoading = true;
			var children = this.getLocalChildren();
			console.log("获取当前部门*****" + JSON.stringify(children));
			if(children && children.length > 0) {
				//				this.setItemsStatus(children);
				this.listData = children;
				this.isLoading = false;
			} else {
				this.requestChildren();
			}
		},
		/**
		 * 获取当前部门的子部门
		 */
		requestChildren: function() { //获取部门内部信息
			console.log("*********requestChildren获取本页列表数据******");
			var parentId = 0;
			if(this.depart_id === -1) {
				parentId = 1;
			} else {
				parentId = this.depart_id;
			}
			var list = JSON.parse(sessionStorage.getItem(consts.KEY_DEPARTS));
			console.log(list);
			var childDeparts = list.filter(function(el) {
				return el.parentvalue == parentId;
			});
			console.log("获取的当前部门的子部门:" + JSON.stringify(childDeparts));
			if(this.chooseType === 1) {
				this.getCurPersen(childDeparts);
			} else {
				this.isLoading = false;
				this.listData = childDeparts;
				this.setAsChildren();
			}
		},
		/**
		 * 获取当前部门人员
		 */
		getCurPersen: function(departs) {
			console.log("********getCurPersen获取当前部门人员********");
			var com = this;
			var id;
			if(com.$route.params.id == -1) {
				id = 1
			} else {
				id = com.$route.params.id
			}
			request.getDepartPersons(id, 0, 1, function(data) {
				console.log("获取的本部门人员:" + JSON.stringify(data));
				var children = data.concat(departs);
				com.listData = children;
				com.isLoading = false;
				com.setAsChildren();
			})
		},
		/**
		 * 列表cell
		 * @param {Object} item
		 */
		clickEvent: function(item) {
			console.log("********clickEvent********");
			if(item.value) {
				console.log("路由跳转")
				this.routerTo(item);
			} else {

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
		setAsChildren: function() { //将列表数据设置为副部门的children
			console.log("********setAsChildren将子部门数据保存至本地数组中********");
			var parentId = this.$route.params.id;
			if(parentId === 1) {
				parentId = -1;
			}
			var departList = events.getSessionArray(consts.KEY_DEPARTS);
			departList[this.getDepartIndex(parentId)].children = this.listData;
			console.log("要保存至本地的列表数据：" + JSON.stringify(departList));
			//将修改后的数据保存到本地储存列表
			sessionStorage.setItem(consts.KEY_DEPARTS, JSON.stringify(departList));
		},
		getDepartIndex: function() { //获取部门再部门列表中的序号
			console.log("********getDepartIndex获取部门在部门列表中的序号********");
			var id = this.$route.params.id;
			var com = this;
			var departList = JSON.parse(sessionStorage.getItem(consts.KEY_DEPARTS));
			for(var i in departList) {
				if(departList[i].value == id) {
					return i;
				}
			}
		},
		getLocalChildren: function() { //获取本地的子项
			console.log("********getLocalChildren获取保存至本地的本部门子部门和人員********");
			var id = this.$route.params.id;
			var departList = events.getSessionArray(consts.KEY_DEPARTS);

			var departs = departList.filter(function(depart) {
				return depart.value == id;
			});
			if(departs && departs.length > 0) {
				return departs[0].children
			} else {
				return [];
			}
		},
		routerToTab: function() {
			var pos = this.getPosition();
			console.log("@@@@@com-persen@@@@@导向发布页面");
			router.go(-parseInt(pos));
		},
		getPosition: function() {
			var id = 1;
			if(parseInt(this.$route.params.id) > 0) {
				id = parseInt(this.$route.params.id)
			}
			return events.getSessionMapValue(consts.KEY_DEPART_POSITION, id);
		},
		//通过部门id 更新界面
		routerTo: function(item) {
			console.log("********routerTo路由跳转********");
			if(this.chooseType === 0 && !this.hasChildren(item)) {
				return;
			}
			router.push({
				name: 'chooseSinPer',
				params: {
					id: item.value
				}
			})
		},
		hasChildren: function(item) {
			var list = JSON.parse(sessionStorage.getItem(consts.KEY_DEPARTS));
			console.log(list);
			var childDeparts = list.filter(function(el) {
				return el.parentvalue == item.value;
			});
			console.log("获取的当前部门的子部门:" + JSON.stringify(childDeparts));
			if(childDeparts && childDeparts.length > 0) {
				return true;
			}
			return false;
		},
		getDepartInfo: function() {
			var list = JSON.parse(sessionStorage.getItem(consts.KEY_DEPARTS));
			for(var i in list) {
				if(this.$route.params.id == list[i].value) {
					return list[i];
				}
			}
		},
		setPosition: function() {
			console.log("********setPosition********");
			if(parseInt(this.$route.params.id) === -1) {
				events.setSessionMapValue(consts.KEY_DEPART_POSITION, 1, 1);
			} else {
				var departInfo = this.getDepartInfo();
				var parentPosition = events.getSessionMapValue(consts.KEY_DEPART_POSITION, departInfo.parentvalue);
				events.setSessionMapValue(consts.KEY_DEPART_POSITION, departInfo.value, parseInt(parentPosition) + 1);
			}
			console.log("本地存储的部门位置:" + JSON.stringify(events.getSessionMap(consts.KEY_DEPART_POSITION)));
		}
	}
});