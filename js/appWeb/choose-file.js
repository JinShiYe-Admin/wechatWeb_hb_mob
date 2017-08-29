Vue.component('choose-file', {
	props: {
		fileType: {
			type: Number,
			default: 4
		}
	},
	template: '<div v-bind:class="[\'weui-uploader\']">' +
		'<div v-bind:class="[\'weui-uploader__hd\']">' +
		'<p v-bind:class="[\'weui-uploader__title\']">{{getType()}}</p>' +
		'<div v-bind:class="[\'weui-uploader__info\']">{{uploadedFiles.length}}\/1</div>' +
		'</div>' +
		'<div v-bind:class="[\'weui-uploader__bd\']">' +
		'<ul v-bind:class="[\'weui-uploader__files\']" id="uploaderFiles">' +
		'<li v-for="file of uploadedFiles" v-bind:class="[\'weui-uploader__file\']" v-bind:style="{\'background-image\':\'url(\'+file.url+\')\'}"></li>' +
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
		},
		selectFile: function(event) {
			if(event.target.value) {
				console.log("选中的文件名称：" + event.target.value);
				cosole.log(event.target.files);
				uploadedFiles = [event.target.files[0]]
				compress.comImg(event.target.value, 2);
			}
		}
	}
})