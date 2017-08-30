Vue.component('extra-pub', {
	props: {
		msgType: {
			type: Number,
			default: 3
		}
	},
	template: '<div v-bind:class="[\'weui-cells\',\'weui-cells_form\']">' +
		'<div v-bind:class="[\'weui-cell\']">' +
		'<div v-bind:class="[\'weui-cell__bd\']">' +
		'<input v-bind:class="[\'weui-input\']" v-model="title" type="text" placeholder="在此输入标题"/>' +
		'</div>' +
		'</div>' +
		'<div v-if="msgType==2" v-bind:class="[\'weui-cell\']">' +
		'<div v-bind:class="[\'weui-cell_bd\']">' +
		'<textarea rows="10" v-model="description" v-bind:class="[\'weui-textarea\']" placeholder="在此输入正文"></textarea>' +
		'</div>' +
		'</div>' +
		'<div v-bind:class="[\'weui-cell\']">' +
		'<div v-bind:class="[\'weui-cell_bd\']">' +
		'<textarea rows="3" v-model="content" v-bind:class="[\'weui-textarea\']" placeholder="在此输入摘要"></textarea>' +
		'</div>' +
		'</div>' +
		'<div v-if="msgType==2" v-bind:class="[\'weui-cell\']">' +
		'<div v-bind:class="[\'weui-cell__bd\']">' +
		'<input v-bind:class="[\'weui-input\']" v-model="title" type="text" placeholder="作者"/>' +
		'</div>' +
		'</div>' +
		'<slot></slot>' +
		'<a v-bind:class="[\'weui-btn\',\'weui-btn_mini\',\'weui-btn_primary\']">完成</a>' +
		'<a v-bind:class="[\'weui-btn\',\'weui-btn_mini\',\'weui-btn_default\']">取消</a>' +
		'</div>',
	data: function() {
		return {
			title: '',
			description: '',
			picurl:'',
			btntxt:'阅读全文'
		}
	},
	computed: {

	},
	methods: {
		finishMethod: function() {
			this.$emit("extraData", {//传递数据

			});
			router.go(-1);
		},
		cancelMethod: function() {
			router.go(-1);
		}
	}
})