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
			console.log("*********getAllListData******");
			var com = this;
			com.isLoading = true;
			request.getDepartList(function(data) {
				console.log("getAllListData获取的部门列表：" + JSON.stringify(JSON.parse(data)));
				sessionStorage.setItem(consts.KEY_DEPARTS, data);
				com.getCurDeparts();
			});
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
				this.setItemsStatus(children);
				this.listData = children;
				this.isLoading = false;
			} else {
				this.requestChildren();
			}
		},
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
			this.getChildDepartsPersen(childDeparts);
		},
		//获取的子部门的人员数据
		getChildDepartsPersen: function(departs) {
			console.log("********getChildDepartsPersen********");
			var count = 0;
			var com = this;
			if(departs.length > 0) {
				for(var i in departs) {
					this.getDepartAllPersen(departs[i], function(data) {
						count++;
						departs[i].persen = data;
						if(count == departs.length) {
							console.log("获取的子部门人员:" + JSON.stingify(departs));
							//获取当前部门的人员
							com.getCurPersen(departs);
						}
					});
				}
			} else {
				console.log("沒有子部门时，获取成员，子部门：" + JSON.stingify(departs));
				com.getCurPersen(departs);
			}
		},
		/**
		 * 获取部门所有人员 包括子部门
		 * @param {Object} departId
		 * @param {Function} callback 回调
		 */
		getDepartAllPersen: function(depart, callback) {
			console.log("********getDepartAllPersen********");
			request.getDepartPersons(depart, 1, function(data) {
				console.log("递归获取的本部门人员:" + JSON.stringify(data));
				callback(data);
			})
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
			request.getDepartPersons(com.$route.params.id, 0, function(data) {
				console.log("获取的本部门人员:" + JSON.stringify(data));
				var children = data.concat(departs);
				com.setItemsStatus(children);
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
				console.log("人员选择");
				this.choosePerson(item);
			}
		},
		//向下传递事件
		setItemsStatus: function(items) {
			console.log("********setItemsStatus设置列表选择状态********");
			console.log("要改变的部门和人员数据:" + JSON.stringify(items));
			var arr = events.isExistInSessionArray(consts.KEY_CHOOSE_DEPARTS, this.$route.params.id);
			console.log("此部门是否存在于已选部门列表中:" + JSON.stringify(arr));
			if(arr[1] >= 0) { //如果此部门为已选
				this.isAllChecked = true;
			} else { //未选择此部门
				this.isAllChecked = false;
				//重复情况    
				items = this.getSingleChecked(items); //人员或部门的选择状态
			}
			console.log("是否已全选？" + this.isAllChecked);
		},
		/**
		 * 人员 或 部门是否已选择
		 * @param {Object} items
		 */
		getSingleChecked: function(items) {
			console.log("********getSingleChecked人员部门选择状态获取********");
			for(var i in items) {
				items[i].isChecked = this.isItemChecked(items[i]);
			}
			console.log("遍历获取部门或人员状态后的值：" + JSON.stringify(items));
			return items
		},
		isItemChecked: function(item) {
			console.log("********isItemChecked********");
			console.log("要设置的item的数据：" + JSON.stringify(item));
			console.log("部门对应的人员的map值：" + JSON.stringify(events.getSessionMap(consts.KEY_CHOSE_MAP)));
			console.log("已选部门的值：" + JSON.stringify(events.getSessionArray(consts.KEY_CHOOSE_DEPARTS)));
			if(item.userid) { //如果是人员 测试
				return events.isExistInArray(events.getSessionMapValue(consts.KEY_CHOSE_MAP, this.$route.params.id))[1] >= 0;
			} else { //如果是部门
				if(events.isExistInSessionArray(consts.KEY_CHOOSE_DEPARTS, item.value)) {
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
			console.log("********togglePerson人员选择********");
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
			console.log("********changeSessionByPerson人员选择后的响应********");
			var com = this;
			person.department.forEach(function(departId) {
				com.togglePersonInDepart(departId, person, isAdd);
				if(!isAdd) { //如果是刪除 刪除其所在所有部门的选择状态
					events.toggleValueInSessionArray(consts.KEY_CHOOSE_DEPARTS, departId, isAdd);
				}
			});
		},
		togglePersonInDepart: function(departId, person, isAdd) {
			console.log("********togglePersonInDepart相关部门内数据的存取********");
			var personArr = events.toggleValueInArray(events.getSessionMapValue(consts.KEY_CHOSE_MAP, departId), person.userid, isAdd);
			events.setSesionMapValue(consts.KEY_CHOSE_MAP, departId, personArr);
			console.log("保存的map数据:" + JSON.stringify(events.getSessionMap(consts.KEY_CHOSE_MAP)));
		},

		/**
		 * 选择或取消选择部门的响应方法
		 * @param {Object} item
		 * @param {Object} event
		 */
		toggleDepart: function(item, event) { //关注的部门选择
			console.log("********toggleDepart部门选取事件********");
			var com = this;
			var isAdd = event.target.checked;
			var childDeparts = this.getAllChildDeparts(item.value);
			childDeparts.push(item);
			//添加或删除本地已选择部门数据
			//包括本部门 和所有子部门
			childDeparts.forEach(function(child) {
				events.toggleValueInSessionArray(consts.KEY_CHOOSE_DEPARTS, child.value, isAdd);
			});
			console.log("保存或删除本部门及子部门：" + events.getSessionArray(consts.KEY_CHOOSE_DEPARTS));
			//人员选择
			//item.persen 它的响应逻辑
			item.persen.forEach(function(person) {
				//单个人员选择或取消选择的响应逻辑
				com.changeSessionByPerson(person, isAdd);
			});
			//设置页面状态
			com.setItemsStatus(com.listData);
		},
		/**
		 * 获取所有的子部门
		 * 包括递归的子部门
		 */
		getAllChildDeparts: function(departId) {
			console.log("********getAllChildDeparts 递归获取所有子部门********");
			var allDeparts = events.getSessionArray(consts.KEY_DEPARTS);
			var childDeparts = allDeparts.filter(function(depart) {
				return depart.parentvalue === departId;
			});
			if(childDeparts.length > 0) {
				for(var i in childDeparts) {
					childDeparts = childDeparts.concat(this.getAllChildDeparts(childDeparts[i].value));
				}
			}
			console.log("departId为:" + departId + "的获取的所有子部门" + JSON.stringify(childDeparts));
			return childDeparts;
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
			console.log("获取的存储在本地的本部门的列表数据:" + JSON.stringify(departs[0].children));
			return departs[0].children || [];
		},
		//通过部门id 更新界面
		routerTo: function(item) {
			console.log("********routerTo路由跳转********");
			router.push({
				name: 'choose-person',
				params: {
					id: item.value
				}
			});
		},
	}
});