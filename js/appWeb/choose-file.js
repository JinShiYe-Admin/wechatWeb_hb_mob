Vue.component('choose-file', {
	props: {
		fileType: {
			type: Number,
			default: 3
		}
	},
	template: '<div v-bind:class="[\'weui-uploader\']">' +
		'<div v-bind:class="[\'weui-uploader__hd\']">' +
		'<p v-bind:class="[\'weui-uploader__title\']">{{getHintInfo()}}</p>' +
		'<div v-bind:class="[\'weui-uploader__info\']">{{uploadedFiles.length}}\/1</div>' +
		'</div>' +
		'<div v-bind:class="[\'weui-uploader__bd\']">' +
		'<ul v-bind:class="[\'weui-uploader__files\']" id="uploaderFiles">' +
		'<li v-for="file of uploadedFiles" v-bind:class="[\'weui-uploader__file\']" v-bind:style="{\'background-image\':\'url(\'+file+\')\'}"></li>' +
		'</ul>' +
		'<div v-bind:class="[\'weui-uploader__input-box\']">' +
		'<input id="uploaderInput" v-bind:class="[\'weui-uploader__input\']" type="file" accept="image/*" v-on:change="selectFile($event)">' +
		'</div>' +
		'</div>' +
		'</div>',
	data: function() {
		return {
			uploadedFiles: []
		}
	},
	created: function() {

	},
	watch: {

	},
	computed: {

	},
	methods: {
		getHintInfo: function() {
			var hintInfo;
			switch(this.fileType) {
				case 0:
					hintInfo = "添加文字";
					break;
				case 1:
					hintInfo = "添加文本";
					break;
				case 2:
					hintInfo = "添加图文";
					break;
				case 3:
					hintInfo = "添加图片";
					break;
				case 4:
					hintInfo = "添加语音";
					break;
				case 5:
					hintInfo = "添加视频";
					break;
				case 6:
					hintInfo = "添加文件";
					break;
				default:
					break;
			}
			return hintInfo;
		},
		selectFile: function(event) {
			if(event.target.value) {
				console.log("选中的文件路径：" + event.target.value);
				console.log(event.target.files);
				var file = event.target.files[0];
				uploadedFiles = [file]
				compress.comImg(file, 2);
			}
		}
	}
})