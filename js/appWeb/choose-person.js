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
		'<input type="checkbox" v-bind:class="[\'weui-check\']" v-bind:id="item.userid" v-bind:value="item.userid">' +
		'<i v-bind:class="[\'weui-icon-checked\']"></i>' +
		'</div>' +
		'<div v-bind:class="[\'weui-cell__bd\']">' +
		'<p>{{item.name}}</p>' +
		'</div>' +
		'</label>' +
		'<a v-else v-bind:class="[\'weui-cell\',\'weui-cell_access\']">' +
		'<div v-bind:class="[\'weui-cell__hd\']">' +
		'<label v-bind:for="item.value">' +
		'<input type="checkbox" v-bind:class="" v-bind:id="item.value" v-bind:value="item.value" />' +
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
	watch: {
		'$route' (to, from) {
			console.log("当前路由id:" + this.$route.params.id);
			if(this.$route.params.id === -1) {
				this.getAllListData();
			} else {
				this.getCurDepart();
			}
		}
	},
	methods: {
		getAllListData: function() {
			var com = this;
			this.isLoading = true;
			request.getDepartList(function(data) {
				console.log("获取的部门列表：" + JSON.stringify(JSON.parse(data)));
				localStorage.setItem(consts.KEY_DEPARTS, data);
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
			var list = JSON.parse(localStorage.getItem(consts.KEY_DEPARTS));
			console.log(list);
			console.log("获取的本地部门列表:" + JSON.stringify(list));
			var childDepart = list.filter(function(el) {
				return el.parentvalue == parentId;
			});
			console.log("获取的当前部门的子部门:" + JSON.stringify(childDepart));
			if(childDepart.length === 0) {
				this.getPersonList(this.depart_id);
			} else {
				this.listData = childDepart;
			}
		},
		getPersonList: function(id) {
			var com = this;
			com.loading = true;
			request.getDepartPersons(id, function(data) {
				com.loading = false;
				console.log("获取的部门人员列表:" + JSON.stringify(data));
				com.listData = data;
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
		}
	}
});