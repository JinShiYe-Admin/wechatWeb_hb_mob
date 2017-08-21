Vue.component("com-publish", {
	props: ['chosePersen'],
	template: '<div><textarea v-model="content" v-bind:rows=10 v-bind:style="{width:\'100%\'}"></textarea>' +
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
	watch: {
		'$route' (to, from) {
			// 对路由变化作出响应...
			console.log("@@@@@com-persen@@@@@路由变化" + this.$route.params.id);
			console.log(to);
		}
	},
	data: function() {
		return {
			title: '',
			content: ''
		}
	},
	methods: {
		publishMethod: function() {
			console.log("&&&&&com-publish&&&&&发布按钮的点击事件");
			console.log("获取的双向绑定的值：" + this.content);
			if(this.title.length == 0) {
				console.log("未设置标题！")
				return;
			}
			if(this.content.length == 0) {
				console.log("未填写内容！")
				return;
			}
			if(this.chosePersen.length == 0) {
				console.log("请选择人员！");
				return;
			}
			this.publish();
		},
		publish: function() {
			console.log("&&&&&com-publish&&&&&发布事件！");
			window.close(); //关闭当前页面
		},
		routeToPersen: function() {
			console.log("&&&&&com-publish&&&&&导向新路由");
			router.push('/persen/choose-person/-1')
		}
	}
})