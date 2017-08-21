Vue.component("com-publish", {
	props: ['chosePersen'],
	template: '<div><textarea v-bind:rows=10 v-bind:style="{width:\'100%\'}"></textarea>' +
		'<div v-bind:class="[\'weui-cells\']">' +
		'<div v-bind:class="[\'weui-cell\',\'weui-cell_access\']" v-on:click="routeToPersen">' +
		'<div v-bind:class="[\'weui-cell__bd\']">' +
		'人员选择' +
		'</div>' +
		'<div v-bind:class="[\'weui-cell__ft\']" >' +
		'{{chosePersen.length>99?"99+":chosePersen.length}}' +
		'</div>' +
		'</div>' +
		'</div>' +
		'<a v-bind:class="[\'weui-btn\', \'weui-btn_primary\']" v-on:click="publishMethod">发布</a></div>',
	data: function() {
		return {
			title: '',
			content: ''
		}
	},
	methods: {
		publishMethod: function() {
			if(this.title.length == 0) {
				mui.toast("请填写标题！");
				return;
			}
			if(this.content.length == 0) {
				mui.toast("请填写内容!");
				return;
			}
			if(this.chosePersen.length == 0) {
				mui.toast("请选择人员！");
				return;
			}
			this.publish();
		},
		publish: function() {
			console.log("发布事件！");
		},
		routeToPersen: function() {
			console.log("导向新路由");
			router.push('/persen/choose-person/-1')
		}
	}
})