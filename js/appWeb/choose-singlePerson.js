Vue.component("single-choose-person", {
	template: '<div v-bind:class="[\'weui-cells\']">' +
		'<template v-for="(item,index) of listData">' +
		'<a v-if="item.value" v-bind:class="[\'weui-cell\',\'weui-cell_access\']">' +
		'<div v-bind:class="[\'weui-cell__bd\']">' +
		'{{item.title}}' +
		'</div>' +
		'<div v-bind:class="[\'weui-cell__ft\']"></div>' +
		'</a>' +
		'<label v-else v-bind:class="[\'weui-cell\',\'weui-check__label\']" v-bind:for="item.userid">' +
		'<div v-bind:class="[\'weui-cell__bd\']">' +
		'<p>{{item.name}}</p>' +
		'</div>' +
		'<div v-bind:class="[\'weui-cell__ft\']">' +
		'<input type="radio" v-bind:class="[\'weui-check\']" v-bind:id="item.userid" />' +
		'</div>' +
		'</label>' +
		'</template>' +
		'</div>',
	created:function(){
		console.log("当前的部门id:" + this.$route.params.id);
		this.getAllListData();
	},
	watch: {
		'$route' (to, from) {
			console.log("当前的部门id:" + this.$route.params.id);
			if(this.this.$route.params.id==-1){
				this.getAllListData();
			}else{
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
			this.getCurPersen(childDeparts);
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
			request.getDepartPersons(com.$route.params.id, 0, 0, function(data) {
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
				console.log("人员选择");
				this.choosePerson(item);
			}
		},
		/**
		 * 选择或取消选择人员的响应方法
		 * @param {Object} item
		 * @param {Object} event
		 */
		togglePerson: function(item, event) { //关注的人 选择
			console.log("********关注的人事件传递********");
			this.$emit('togglePerson', item, isAdd);
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
		//通过部门id 更新界面
		routerTo: function(item) {
			console.log("********routerTo路由跳转********");
			router.push('/persen/choose-person/' + item.value);
		},

	}
})