Vue.component('select-choose', {
	template: '<div v-bind:class="[\'weui-cells\']">' +
		'<div v-bind:class="[\'weui-cell\',\'weui-cell_select\',\'weui-cell_select-after\']">' +
		'<div v-bind:class="[\'weui-cell__hd\']">' +
		'<label for v-bind:class="[\'weui-label\']">消息类型</label>' +
		'</div>' +
		'<div v-bind:class="[\'weui-cell__bd\']">' +
		'<select v-bind:class="[\'weui-select\']" name="select" v-on:change="getType($event)">' +
		'<option v-for="(msgStyle,index) of msgStyles" v-bind:value="msgStyle.typeNo">{{msgStyle.name}}</option>' +
		'</select>' +
		'</div>' +
		'</div>' +
		'<div v-bind:class="[\'weui-cell\',\'weui-cell_access\']" v-on:click="routeToPersen">' +
		'<div v-bind:class="[\'weui-cell__bd\']">' +
		'人员选择' +
		'</div>' +
		'<div v-bind:class="[\'weui-cell__ft\']" >' +
		'{{chosePersen.length>99?"99+":chosePersen.length}}' +
		'</div>' +
		'</div>' +
		'</div>',
	data: function() {
		return {
			msgStyles: consts.MESSAGE_STYLES,
			msgType: consts.MESSAGE_STYLES[0].type
		}
	},
	methods: {
		routeToPersen: function() {
			router.push('/persen/choose-person/-1');
		}
		getType: function(event) {
			this.msgType = event.target.value;
		}
	}
})