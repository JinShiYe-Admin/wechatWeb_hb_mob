Vue.component("time-table", {
	props: ["title", "subtitle", "items_array", "items", "show_add"],
	template: '\
	<div>\
		<div class="weui-flex">\
			<div class="weui-flex__item title">{{title}}</div>\
		</div>\
		<div class="weui-flex">\
			<div class="weui-flex__item title">{{subtitle}}</div>\
		</div>\
		<div class="time-table">\
			<div class="weui-flex">\
				<div class="weui-flex__item">类型</div>\
				<div class="weui-flex__item">时间段</div>\
				<div class="weui-flex__item">周一</div>\
				<div class="weui-flex__item">周二</div>\
				<div class="weui-flex__item">周三</div>\
				<div class="weui-flex__item">周四</div>\
				<div class="weui-flex__item">周五</div>\
				<div class="weui-flex__item">周六</div>\
				<div class="weui-flex__item">周日</div>\
				<div class="weui-flex__item">操作</div>\
			</div>\
			<div class="weui-flex"v-for="(item,index) in items_array">\
				<div @click="clickItem(index,item_index)" class="weui-flex__item" v-for="(item_value,item_index) in item">\
					<div>{{item_value.title}}</div>\
					<div>{{item_value.content}}</div>\
				</div>\
				<div class="weui-flex__item time-table-item-del">\
					<div @click="delItem(index)">删除</div>\
				</div>\
			</div>\
		</div>\
		<button v-if="show_add" @click="addTableItem()" class="weui-btn weui-btn_mini weui-btn_primary">添加</button>\
	</div>',
	methods: {
		/**
		 * 添加一行
		 */
		addTableItem: function() {
			var item = [];
			for(var i = 0; i < 9; i++) {
				item[i] = {
					title: "",
					content: ""
				}
			}
			item[0].title = "上午";
			item[1].title = "8:00-9:00";
			vm_time_table.items_array.push(item);
		},
		/**
		 * 点击每一个item
		 * @param {Object} index 第几行
		 * @param {Object} item_index 第几列
		 */
		clickItem: function(index, item_index) {
			var itemData = vm_time_table.items_array[index][item_index];
			vm_time_table.items_array[index][item_index].title = "click";
		},
		/**
		 * 删除某一行
		 * @param {Object} index 第几行
		 */
		delItem: function(index) {
			$.confirm({
				title: '提示',
				text: '确认删除?',
				onOK: function() {
					vm_time_table.items_array.splice(index, 1);
					$.toast("操作成功");
				}
			});
		}
	}
});
var vm_time_table = new Vue({
	el: "#time_table",
	data: {
		items: "items",
		title: "2017秋季课程表",
		subtitle: "开发部 2017/8/1 0:00:00时效:201709至201802",
		items_array: []
	},
	computed: {
		show_add: function() {
			var show = true;
			if(this.items_array.length > 8) {
				show = false
			}
			return show;
		}
	}
});