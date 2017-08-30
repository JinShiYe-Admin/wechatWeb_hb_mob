Vue.component("com-publish", {
	props: {
		chosePersen: {
			type: Array,
			default: []
		},
		msgType: {
			type: Number,
			default: 0
		},
		extraData: {
			type: Object,
			default: {}
		}
	},
	template: '<div>' +
		'<slot></slot>' +
		'<textarea v-if="msgType<1" v-model="content" v-bind:rows=10 v-bind:style="{width:\'100%\'}"></textarea>' +
		'<slot name="choose-file"></slot>' +
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
			fileType: 0,
			content: ''
		}
	},
	methods: {
		publishMethod: function() {
			console.log("&&&&&com-publish&&&&&发布按钮的点击事件");
			console.log("获取的双向绑定的值：" + this.content);
			if(this.content.length == 0) {
				console.log("未填写内容！")
				return;
			}
			if(this.content.length > 1000) {
				console.log("不得大于1000字！")
				return;
			}
			if(this.chosePersen.length == 0) {
				console.log("请选择人员！");
				return;
			}
			this.publish();
		},
		publish: function() { //发布
			this.extraData.type = this.getPubType();
			console.log("&&&&&com-publish&&&&&发布事件！");
			request.postMessage(this.chosePersen, this.extraData, function(data) {
				if(data.RspCode == 0) {
					sessionStorage.clear();
					window.close(); //关闭当前页面
				} else {
					console.log("发布通知失败：" + data.RspTxt);
				}
			})

		},
		getPubType: function() { //發佈的類型
			for(var i in consts.MESSAGE_STYLES) {
				var msgStyle = consts.MESSAGE_STYLES[i];
				if(msgStyle.typeNo = this.msgType) {
					return msgStyle.type;
				}
			}
		}
	}
})