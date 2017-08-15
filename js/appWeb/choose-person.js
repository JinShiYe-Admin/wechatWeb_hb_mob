Vue.component("person-list", {
	props: {
		depart_id: {
			type: Number
		}
	},
	template: '<div v-if="loading">loading</div>' +
		'<div v-else v-bind:class="[\'weui-cells\',{\'weui-cells_checkbox\':listData[0]&&listData[0].name}]">' +
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
		'<input type="checkbox" v-bind:class="" v-bind:id="item.value" v-bind:value="item.value" v-bind:checked="isAllChecked"' +
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
			loading: false,
			id: this.depart_id,
			choseItems: [],
			isAllChecked: true
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
		getCurDeparts: function() {
			console.log("获取当前部门*****");
			this.loading = true;
			var children = this.getLocalChildren();
			if(children && children.length > 0) {
				this.setItemsStatus(children);
				this.listData = children;
				this.isLoading = false;
			} else {
				this.requestChildren();
			}
		},
		getPersonList: function(id) {
			var com = this;
			com.loading = true;
			request.getDepartPersons(id, function(data) {
				com.setItemsStatus(data);
				console.log("获取的部门人员列表:" + JSON.stringify(data));
				com.listData = data;
				com.setAsChildren();
				com.isLoading = false;
			})
		},
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
				console.log("是否已全选？"+this.isAllChecked);
			} else {
				//重复情况    
				items = this.getSingleChecked(items); //人员重复  只考虑人员 
				console.log("更改人员是否已选择的标记："+JSON.stringify(items));
			}
		},
		getSingleChecked: function(items) {
			items = items.map(function(item) {
				if(events.isExistInSessionArray(consts.KEY_CHOOSE_PERSONS, item.id)[1] >= 0) {
					item.isChecked = true;
				} else {
					item.isChecked = false;
				}
			});
			return items;
		},
		togglePerson: function(item, event) { //关注的人 选择
			var isAdd = event.target.checked;
			events.toggleValueInSessionArray(consts.KEY_CHOOSE_PERSONS, item.id, isAdd);
			this.choseItems = events.toggleValueInArray(this.choseItems, item.value, isAdd);
			events.toggleValueInSessionArray(consts.KEY_CHOOSE_DEPARTS, this.$route.params.id, (this.choseItems.length == this.listData.length));
			this.$emit("togglePerson", [item], event.target.checked);
		},
		toggleDepart: function(item, event) { //关注的部门选择
			var com = this;
			var isAdd = event.target.checked;
			events.toggleValueInSessionArray(consts.KEY_CHOOSE_DEPARTS, item.value, isAdd);
			console.log("部门选择变化？0" + events.getSessionArray(consts.KEY_CHOOSE_DEPARTS));
			com.choseItems = events.toggleValueInArray(com.choseItems, item.value, isAdd);
			console.log("部门选择变化？1" + JSON.stringify(com.choseItems) + "当前id:" + JSON.stringify(com.listData));
			//父部门是否标记为标记为已选择
			var isAdd = com.choseItems.length === com.listData.length;
			events.toggleValueInSessionArray(consts.KEY_CHOOSE_DEPARTS, com.$route.params.id, isAdd);
			console.log("部门选择变化？2" + JSON.stringify(events.getSessionArray(consts.KEY_CHOOSE_DEPARTS)));
			//向上传递选择事件时，如何更改界面？
		},
		requestChildren: function() { //获取部门内部信息
			var parentId = 0;
			if(this.depart_id === -1) {
				parentId = 1;
			} else {
				parentId = this.depart_id;
			}
			var list = JSON.parse(sessionStorage.getItem(consts.KEY_DEPARTS));
			console.log(list);
			console.log("获取的本地部门列表:" + JSON.stringify(list));
			var childDepart = list.filter(function(el) {
				return el.parentvalue == parentId;
			});
			console.log("获取的当前部门的子部门:" + JSON.stringify(childDepart));
			if(childDepart.length === 0) {
				this.getPersonList(this.depart_id);
			} else {
				this.setItemsStatus(childDepart);
				this.listData = childDepart;
				console.log("放置的listData:"+JSON.stringify(childDepart));
				this.isLoading = false;
				this.setAsChildren();
			}
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
			var departList = this.getLocalDeparts();
			departList[this.getDepartIndex(parentId)].children = this.listData;
			console.log("加入子类后的信息：" + JSON.stringify(departList));
			//将修改后的数据保存到本地储存列表
			sessionStorage.setItem(consts.KEY_DEPARTS, JSON.stringify(departList));
		},
		getLocalChildren: function() { //获取本地的子项
			var id = this.$route.params.id;
			var departList = this.getLocalDeparts();
			var departs = departList.filter(function(depart) {
				return depart.value == id;
			});
			return departs[0].children || [];
		},
		getLocalDeparts: function() {
			return sessionStorage.getItem(consts.KEY_DEPARTS) || [];
		},
		getLocalPersons: function() {
			return sessionStorage.getItem(consts.KEY_CHOOSE_PERSONS) || [];
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
});