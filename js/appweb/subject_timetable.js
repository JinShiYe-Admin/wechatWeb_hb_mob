Vue.component("time-table", {
	props: ["title", "subtitle", "items_array", "show_add"],
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
					<div @click="clickItemDel(index)">删除</div>\
				</div>\
			</div>\
		</div>\
		<button v-if="show_add" @click="clickAddButton" class="weui-btn weui-btn_mini weui-btn_primary">添加</button>\
	</div>',
	methods: {
		/**
		 * 点击底部的添加按钮
		 */
		clickAddButton: function() {
			this.$emit("click-add-button");
		},
		/**
		 * 点击每一个item
		 * @param {Object} index 第几行
		 * @param {Object} item_index 第几列
		 */
		clickItem: function(index, item_index) {
			this.$emit("click-item", index, item_index);
		},
		/**
		 * 删除某一行
		 * @param {Object} index 第几行
		 */
		clickItemDel: function(index) {
			this.$emit("click-item-del", index);

		}
	}
});
//课程表
var vm_time_table = new Vue({
	el: "#time_table",
	data: {
		title: "2017秋季课程表",
		subtitle: "开发部 2017/8/1 0:00:00时效:201709至201802",
		items_array: []
	},
	methods: {
		/**
		 * 点击底部的添加按钮
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
		changeItem: function(index, item_index) {
			var itemData = vm_time_table.items_array[index][item_index];
			vm_time_table.items_array[index][item_index].title = "title";
			vm_time_table.items_array[index][item_index].content = "content";
		},
		/**
		 * 删除某一行
		 * @param {Object} index 第几行
		 */
		delTableItem: function(index) {
			$.confirm({
				title: '提示',
				text: '确认删除?',
				onOK: function() {
					vm_time_table.items_array.splice(index, 1);
					$.toast("操作成功");
				}
			});
		}
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