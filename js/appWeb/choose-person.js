Vue.component("person-list", {
	props: {
		depart_id: {
			type: Number
		}
	},
	template: '<div v-if="isLoading">loading</div>' +
		'<div v-else v-bind:class="[\'weui-cells\']">' +
		'<template v-for="(item,index) of listData">' +
		'<label  v-if="item.name" v-bind:for="item.userid" v-bind:class="[\'weui-cell\',\'weui-check__label\']">' +
		'<div v-bind:class="[\'weui-cell__hd\']">' +
		'<input type="checkbox" v-bind:class="[\'weui-check\']" v-bind:id="item.userid" v-bind:value="item.userid" v-bind:checked="isAllChecked||item.isChecked"' +
		'v-on:change="togglePerson(item,$event)">' +
		'<i v-bind:class="[\'weui-icon-checked\']"></i>' +
		'</div>' +
		'<div v-bind:class="[\'weui-cell__bd\']">' +
		'<p>{{item.name}}</p>' +
		'</div>' +
		'</label>' +
		'<a v-else v-bind:class="[\'weui-cell\',\'weui-cell_access\']">' +
		'<div v-bind:class="[\'weui-cell__hd\']">' +
		'<label v-bind:for="item.value">' +
		'<input type="checkbox" v-bind:class="" v-bind:id="item.value" v-bind:value="item.value" v-bind:checked="isAllChecked||item.isChecked"' +
		'v-on:change="toggleDepart(item,$event)"/>' +
		'<i v-bind:class="[\'weui-icon-checked\']"></i>' +
		'</label>' +
		'</div>' +
		'<div v-bind:class="[\'weui-cell__bd\']" v-on:click="clickEvent(item)">' +
		'<p>{{item.title}}</p>' +
		'</div>' +
		'<div v-bind:class="[\'weui-cell__ft\']" v-on:click="clickEvent(item)"></div>' +
		'</a>' +
		'</template>' +
		'</div>' +
		'</div>',
	data: function() {
		return {
			listData: [],
			isLoading: false,
			id: this.depart_id,
			choseItems: [],
			isAllChecked: false
		}
	},
	created: function() {
		console.log("获取的的id" + this.$route.params.id)
		if(this.$route.params.id === -1) {
			this.getAllListData();
		} else {
			this.getCurDeparts();
		}
	},
	watch: {
		'$route' (to, from) {
			console.log("当前路由id:" + this.$route.params.id);
			if(this.$route.params.id === -1) {
				this.getAllListData();
			} else {
				this.getCurDeparts();
			}
		}
	},
	methods: {
		getAllListData: function() {
			var com = this;
			//			com.listData = [{
			//				"value": 2,
			//				"title": "湖北大区",
			//				"parentvalue": 1,
			//				"order": 2147483447
			//			}, {
			//				"value": 11,
			//				"title": "开发部",
			//				"parentvalue": 1,
			//				"order": 2147483047
			//			}]
			com.isLoading = true;
			request.getDepartList(function(data) {
				console.log("获取的部门列表：" + JSON.stringify(JSON.parse(data)));
				sessionStorage.setItem(consts.KEY_DEPARTS, data);
				com.getCurDeparts();
			});
		},
		/**
		 * 获取当前部门人员
		 */
		getCurDeparts: function() {
			this.isLoading = true;
			var children = this.getLocalChildren();
			console.log("获取当前部门*****" + JSON.stringify(children));
			if(children && children.length > 0) {
				this.setItemsStatus(children);
				this.listData = children;
				this.isLoading = false;
			} else {
				this.requestChildren();
			}
		},
		requestChildren: function() { //获取部门内部信息
			console.log("*********获取本页列表数据******");
			var parentId = 0;
			if(this.depart_id === -1) {
				parentId = 1;
			} else {
				parentId = this.depart_id;
			}
			var list = JSON.parse(sessionStorage.getItem(consts.KEY_DEPARTS));
			console.log(list);
			console.log("获取的本地部门列表:" + JSON.stringify(list));
			var childDeparts = list.filter(function(el) {
				return el.parentvalue == parentId;
			});
			console.log("获取的当前部门的子部门:" + JSON.stringify(childDeparts));
			this.getChildDepartsPersen(childDeparts);
		},
		getChildDepartsPersen: function(departs) {
			var count = 0;
			var com = this;
			for(var i in departs) {
				this.getDepartAllPersen(departs[i].value, function(data) {
					count++;
					departs[i].persen = data;
					if(count == departs.length) {
						com.getCurPersen(departs);
					}
				});
			}
		},
		/**
		 * 获取部门所有人员 包括子部门
		 * @param {Object} departId
		 * @param {Function} callback 回调
		 */
		getDepartAllpersen: function(departId, callback) {
			request.getDepartPersons(departId, 1, function(data) {
				console.log("递归获取的本部门人员:" + JSON.stringify(data));
				callback(data);
			})
		},
		/**
		 * 获取当前部门人员
		 */
		getCurPersen: function(departs) {
			var com = this;
			request.getDepartPersons(com.$route.params.id, function(data) {
				console.log("获取的本部门人员:" + JSON.stringify(data));
				var children = data.concat(departs);
				com.setItemsStatus(children);
				com.listData = children;
				com.isLoading = false;
				com.setAsChildren();
			})
		},
		/**
		 * 
		 * @param {Object} id
		 */
		getPersonList: function(id) {
			var com = this;
			com.isLoading = true;
			request.getDepartPersons(id, 0, function(data) {
				com.setItemsStatus(data);
				console.log("获取的部门人员列表:" + JSON.stringify(data));
				com.listData = data;
				com.setAsChildren();
				com.isLoading = false;
			})
		},
		/**
		 * 列表cell
		 * @param {Object} item
		 */
		clickEvent: function(item) {
			if(item.value) {
				this.routerTo(item);
			} else {
				this.choosePerson(item);
			}
		},
		//向下传递事件
		setItemsStatus: function(items) {
			var arr = events.isExistInSessionArray(consts.KEY_CHOOSE_DEPARTS, this.$route.params.id);
			console.log("是否存在本地存储：" + JSON.stringify(arr));
			console.log("下标类型:" + arr[1]);
			if(arr[1] >= 0) { //如果上级目录是已选择目录；
				this.isAllChecked = true;
				//设置本级目录为已选择目录，并保存在localStorage
				var key = '';
				if(typeof(items[0].value) !== "undefined") {
					key = consts.KEY_CHOOSE_DEPARTS;
				} else {
					key = consts.KEY_CHOOSE_PERSONS;
				}
				for(var i in items) {
					events.toggleValueInSessionArray(key,
						items[i].value ? items[i].value : items[i].id,
						true);
				}
				console.log("是否已全选？" + this.isAllChecked);
			} else {
				this.isAllChecked = false;
				//重复情况    
				items = this.getSingleChecked(items); //人员重复  只考虑人员 
				console.log("更改人员是否已选择的标记：" + JSON.stringify(items));
			}
		},
		/**
		 * 人员 或 部门是否已选择
		 * @param {Object} items
		 */
		getSingleChecked: function(items) {
			console.log("要更改的值：" + JSON.stringify(items));
			for(var i in items) {
				items[i].isChecked = this.isItemChecked(items[i]);
			}
			console.log("遍历获取部门或人员状态后的值：" + JSON.stringify(items));
			return items
		},
		isItemChecked: function(item) {
			if(item.userid) { //如果是人员 测试
				return events.isExistInArray(events.getSessionMapValue(consts.KEY_CHOSE_MAP, this.$route.params.id))[1] >= 0;
			} else { //如果是部门
				if(events.isExistInSessionArray(consts.KEY_CHOOSE_DEPARTS)) {
					return true;
				} else {
					return events.getSessionMapValue(consts.KEY_CHOSE_MAP, item.value).length === item.persen.length;
				}
			}
		},
		/**
		 * 选择或取消选择人员的响应方法
		 * @param {Object} item
		 * @param {Object} event
		 */
		togglePerson: function(item, event) { //关注的人 选择
			var isAdd = event.target.checked;
			this.changeSessionByPerson(item, isAdd);
			this.setItemsStatus(this.listData);
		},
		/**
		 * 
		 * @param {Object} person 选择或取消选择的信息
		 * @param {Object} isAdd 添加删除逻辑
		 */
		changeSessionByPerson: function(person, isAdd) { //
			person.department.forEach(function(departId) {
				com.togglePersonInDepart(departId, person, isAdd);
			});
		},
		togglePersonInDepart: function(departId, person, isAdd) {
			var personArr = events.toggleValueInArray(events.getSessionMapValue(consts.KEY_CHOSE_MAP, departId), person.userid, isAdd);
			events.setSesionMapValue(consts.KEY_CHOSE_MAP, departId, personArr);
			this.changeDepartStatusInCur(departId);
		},

		changeDepartStatusInCur: function(departId) {
			this.listData = this.listData.map(function(item) {
				if(item.value === departId) {
					item.isChecked = events.getSesionMapValue(consts.KEY_CHOSE_MAP, departId).length === item.persen.length;
					return item;
				}
				return item;
			})
		},
		/**
		 * 选择或取消选择部门的响应方法
		 * @param {Object} item
		 * @param {Object} event
		 */
		toggleDepart: function(item, event) { //关注的部门选择
			var com = this;
			var isAdd = event.target.checked;
			var childDeparts = this.getAllChildDeparts(item.value);
			childDeparts.push(item);
			//添加或删除本地已选择部门数据
			//包括本部门 和所有子部门
			childDeparts.forEach(function(child) {
				events.toggleValueInSessionArray(consts.KEY_CHOOSE_DEPARTS, child.value, isAdd);
			});
			//人员选择
			//item.persen 它的响应逻辑
			item.persen.forEach(function(person) {
				com.changeSessionByPerson(person, isAdd);
			});
			com.setItemsStatus(com.listData);
		},
		isInCurDepart: function(person) {
			var personDeparts = person.department;
			for(var i in personDeparts) {
				if(personDeparts[i] === this.$route.params.id) {
					return true;
				}
			}
			return false;
		},
		/**
		 * 获取所有的子部门
		 * 包括递归的子部门
		 */
		getAllChildDeparts: function(departId) {
			var allDeparts = events.getSessionArray(consts.KEY_DEPARTS);
			var childDeparts = allDeparts.filter(function(depart) {
				return depart.parentvalue === departId;
			});
			if(childDeparts.length > 0) {
				for(var i in childDeparts) {
					childDeparts = childDeparts.concat(this.getAllChildDeparts(childDeparts[i].value));
				}
			}
			console.log("获取的所有子部门" + JSON.stringify(childDeparts));
			return childDeparts;
		},
		/**
		 * 获取选择或删除的部门人员
		 * @param {Object} item
		 * @param {Object} isAdd
		 */
		getToggleDepartPersen: function(item, isAdd) {
			var com = this;
			request.getDepartPersons(item.value, function(data) {
				console.log("获取的关注部门的人:" + JSON.stringify(data));
				for(var i in data) {
					events.toggleValueInSessionArray(consts.KEY_CHOOSE_PERSONS, data[i].userid, isAdd);
				};
				com.$emit("togglePerson", data, isAdd); //传值给父
			})
		},

		getDepartIndex: function() { //获取部门再部门列表中的序号
			var id = this.$route.params.id;
			var com = this;
			var departList = JSON.parse(sessionStorage.getItem(consts.KEY_DEPARTS));
			for(var i in departList) {
				if(departList[i].value == id) {
					return i;
				}
			}
		},
		setAsChildren: function() { //将列表数据设置为副部门的children
			var parentId = this.$route.params.id;
			if(parentId === 1) {
				parentId = -1;
			}
			var departList = events.getSessionArray(consts.KEY_DEPARTS);
			departList[this.getDepartIndex(parentId)].children = this.listData;
			console.log("加入子类后的信息：" + JSON.stringify(departList));
			//将修改后的数据保存到本地储存列表
			sessionStorage.setItem(consts.KEY_DEPARTS, JSON.stringify(departList));
		},
		getLocalChildren: function() { //获取本地的子项
			var id = this.$route.params.id;
			var departList = events.getSessionArray(consts.KEY_DEPARTS);
			console.log("获取的存储在本地的部门数据:" + JSON.stringify(departList));
			var departs = departList.filter(function(depart) {
				return depart.value == id;
			});
			return departs[0].children || [];
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
		/**
		 * 部门是人员的数组，选择部门或取消选择部门 是对人员选择取消的遍历
		 * 设定部门全选后的length=递归获取部门的人员总数
		 * 如果取消此部门的成员，则减去此部门人员数量
		 * 如果选择此部门成员，则增加此部门人员数量
		 * 如果选择的此部门的数量=此部门人员总数，那么此部门选择状态为已选择。
		 * 如果部门状态为已选
		 * 那么他的所有成员 和部门都为已选
		 * 如果部门状态为未选，则他的成员和部门总有一个未选
		 */
		/**
		 * 需要获取此列表成员和部门
		 * 此列表部门的递归成员列表
		 * 并保存至sessionStorage;
		 */
		/**
		 * 选择部门后，其所有子部门和人员选择为已选
		 * 并把选择的人员名单显示在界面上
		 * 如果此列表中的人员跟子部门中的人员重复
		 * 则 此列表中的人员也为选中状态
		 */
		/**
		 * 如果人员取消选择 并其在的部门已为选择状态
		 * 那么他所属所有部门取消选择状态
		 * 如果此人员再此被选择，判断此部门所选人员数量==部门人员数量
		 * 如果至合适值，则部门状态为全选；
		 * 如果此人在此部门的子部门里 获取子部门人员，并添加至listData
		 * 对应所有部门选择人员状态 本地数据的添加或删除
		 */
		/**
		 * 部门是人员的数组，部门的选择是对人员选择的遍历
		 * 部门的取消选择是对热源取消选择的遍历
		 */
		/**
		 * 部门选择是在上个层级已保存的数据？需要考虑人员此界面列表部门人员已全选的状况？？？？？
		 * 如果已选人员长度<此部门人员数量，则未选择 否则 ，需遍历获取已选列表中的此部门人员数据。
		 * 或选择人员时，将对应部门数据保存至本地 (key值为部门id的map数组)如果本地保存数量=== 此部门人员数量，则已选择，否则未选择
		 * 人员选择状态 则可以从本地保存数据中遍历，而不是从所有已选中遍历;
		 * 人员的选择状态 如果不是全选，则需要遍历跟保存至本地的数据比较
		 * 从而获取人员的选择状态；
		 */
		/**
		 * 选择人员时，暂不考虑当前部门列表的子部门的状况
		 */
	}
});