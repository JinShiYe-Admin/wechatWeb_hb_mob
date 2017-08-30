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
		'<textarea rows="10" v-model="content" v-bind:class="[\'weui-textarea\']" placeholder="在此输入正文"></textarea>' +
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
		'</div>',
	data: function() {
		return {
			title: '',
			content: ''
		}
	},
	computed: {

	},
	methods: {

	}
})