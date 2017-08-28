Vue.component('choose-file', {
	props: ['fileType'],
	template: '<div v-bind:class="[\'weui-uploader\']">' +
		'<div v-bind:class="[\'weui-uploader__hd\']">' +
		'<p v-bind:class="[\'weui-uploader__title\']">getType()</p>' +
		'<div v-bind:class="[\'weui-uploader__info\']">{{uploadSize}}\/1</div>' +
		'</div>' +
		'<div v-bind:class="[\'weui-uploader__bd\']">' +
		'<ul v-bind:class="[\'weui-uploader__files\']" id="uploaderFiles">' +
		'</ul>' +
		'<div v-bind:class="[\'weui-uploader__input-box\']"></div>' +
		'</div>' +
		'</div>',
	data: function() {
		return {

		}
	},
	created: function() {

	},
	watch: {

	},
	computed: {
		getType: function() {
			switch(this.fileType) {
				case 4:
					return "图片上传";
				case 5:
					return "视频上传";
				case 6:
					return "语音上传";
				case 7:
					return "文件上传";
			}
		}
	},
	methodes: {

	}
})