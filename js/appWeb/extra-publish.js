Vue.component('extra-pub', {
	props: {
		fileType: {
			type: Number,
			default: 3
		}
	},
	template: '<div v-bind:class="[\'weui-cells\',\'weui-cells_form\']">' +
		'<div v-bind:class="[\'weui-cell\']">' +
		//		'<div v-bind:class="[\'weui-cell__hd\']">' +
		//		'<label v-bind:class="[\'weui-label\']">在此输入标题</label>' +
		//		'</div>' +
		'<div v-bind:class="[\'weui-cell__bd\']">' +
		'<input v-bind:class="[\'weui-input\']" v-model="title" type="text" placeholder="在此输入标题"/>' +
		'</div>' +
		'</div>' +
		'<div v-bind:class="[\'weui-cell\']">' +
		'<div v-bind:class="[\'weui-cell_bd\']">' +
		'<texteara rows="10" v-model="content" placeholder="在此输入摘要"></texteara>' +
		'</div>' +
		'</div>' +
		'<slot v-bind:fileType="fileType"></slot>' +
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