Vue.component('select-choose', {
	props: ['chosedPersen', 'msgType'],
	template: '<div v-bind:class="[\'weui-cells\']">' +
		'<div v-bind:class="[\'weui-cell\',\'weui-cell_access\']" v-on:click="routeToPersen">' +
		'<div v-bind:class="[\'weui-cell__bd\']">' +
		'人员选择' +
		'</div>' +
		'<div v-bind:class="[\'weui-cell__ft\']" >' +
		'{{chosedPersen.length>99?"99+":chosedPersen.length}}' +
		'</div>' +
		'</div>' +
		'<div v-bind:class="[\'weui-cell\',\'weui-cell_switch\']">' +
		'<div v-bind:class="[\'weui-cell__bd\']">' +
		'是否短信同步' +
		'</div>' +
		'<div v-bind:class="[\'weui-cell__ft\']">' +
		'<input v-bind:class="[\'weui-switch\']" type="checkbox"/>' +
		'</div>' +
		'</div>' +
		'</div>',
	data: function() {
		return {
			msgStyles: consts.MESSAGE_STYLES,
			thisMsgType: this.msgType
		}
	},
	watch: {
		msgType: function(newVal, oldVal) {
			console.log("新值：" + newVal + ",旧值：" + oldVal);
		}
	},
	methods: {
		routeToPersen: function() {
			router.push('/persen/choose-person/-1');
		},
		getType: function(event) {
			console.log(event.target.value);
			this.thisMsgType = parseInt(event.target.value);
			this.$emit("msg-type", this.thisMsgType);
		}
	},
	choosePersen: function() {
		wxUtils.invoke(1, 2, function(departList, userList) {
			console.log("获取的已选部门列表：" + JSON.stringify(departList));
			console.log("获取的已选用户列表：" + JSON.stringify(userList));
		})
	},
	getImg: function() {
		wxUtils.chooseImage(1, function(picIds) {
			compress.comImg(picIds[0], 2);
		})
	},
	getRecord: function() {
		wxUtils.startRecord();
		wxUtils.onVoiceRecordEnd(function(localId) {
			wxUtils.uploadVoice(localId, function(serverId) {
				console.log("voice获取的serverId:" + serverId);
			})
		})
	}
})