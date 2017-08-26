Vue.component('select-choose', {
	props: ['chosedPersen'],
	template: '<div v-bind:class="[\'weui-cells\']">' +
		'<div v-bind:class="[\'weui-cell\',\'weui-cell_select\',\'weui-cell_select-after\']">' +
		'<div v-bind:class="[\'weui-cell__hd\']">' +
		'<label for v-bind:class="[\'weui-label\']">消息类型</label>' +
		'</div>' +
		'<div v-bind:class="[\'weui-cell__bd\']">' +
		'<select v-bind:class="[\'weui-select\']" name="select" v-on:change="getType($event)">' +
		'<option v-for="(msgStyle,index) of msgStyles" v-bind:value="msgStyle.typeNo">{{msgStyle.typeName}}</option>' +
		'</select>' +
		'</div>' +
		'</div>' +
		'<div v-bind:class="[\'weui-cell\',\'weui-cell_access\']" v-on:click="routeToPersen">' +
		'<div v-bind:class="[\'weui-cell__bd\']">' +
		'人员选择' +
		'</div>' +
		'<div v-bind:class="[\'weui-cell__ft\']" >' +
		'{{chosedPersen.length>99?"99+":chosedPersen.length}}' +
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
		},
		getType: function(event) {
			console.log(event.target.value);
			this.msgType = parseInt(event.target.value);
			switch(this.msgType) {
				case 0: //文字
					break;
				case 1: //文字卡片
					this.choosePersen();
					break;
				case 2: //图文
					break;
				case 3: //图片
					this.getImg();
					break;
				case 4: //语音
					this.getRecord();
					break;
				case 5: //视频
					break;
				case 6: //文件
					break;
				default:
					break;
			}
		},
		choosePersen: function() {
			wxUtils.invoke(1, 2, function(departList, userList) {
				console.log("获取的已选部门列表：" + JSON.stringify(departList));
				console.log("获取的已选用户列表：" + JSON.stringify(userList));
			})
		},
		getImg: function() {
			wxUtils.chooseImage(1, function(picId) {
				wxUtils.uploadImage(picId, function(serverId) {
					console.log("pic获取的serverId:" + serverId)
				})
			})
		},
		getRecord: function() {
			wxUtils.startRecord();
			wxUtils.onVoiceRecordEnd(function(localId) {
				wxUtils.uploadVoice(localId, function(serverId) {
					console.log("voice获取的serverId:" + serverId)
				})
			})
		}
	}
})