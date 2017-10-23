Vue.component("select-load-pic", {
	props:["pictype"],//0 原图 最大2M 1缩略图
	template: '<span class="btn-upload form-group">' +
		'<input class="input-text upload-url radius piece" type="text" readonly :placeholder="pictype|placeHolder">' +
		'<a href="" class="btn btn-primary radius"><i class="Hui-iconfont Hui-iconfont-upload"></i> 浏览文件</a>' +
		'<input type="file" accept="image/jpeg,image/png" v-on:change="selectFile($event)"  class="input-file">' +
		'</span>',
	data: function() {
		return {

		}
	},
	created:function(){
		console.log("当前pic类型:"+this.pictype)
	},
	filters:{
		placeHolder:function(val){
			console.log("要选择的类型："+val)
			if(val==0){
				console.log("0")
				return "请选择内容图片";
			}
			if(val==1){
				console.log("1")
				return "请选择标题图片";
			}
			return ""
		}
	},
	methods: {
		selectFile: function(e) {
			console.log("e.target.value:" + e.target.value);
			console.log(e.target.files);
			if(e.target.files.length > 0) {
				var theFile = e.target.files[0];
				if(this.isInType(theFile.type)) {//上传文件
					this.upLoadFile();
				}else{
					this.emitUndefinedFile();//清空上传文件
					e.target.value="";
					$.Huimodalalert('所选文件类型错误，请重新选择', 3000)//提示错误
				}
			}else{
				this.emitUndefinedFile();//清空上传文件
			}
		},
		emitUndefinedFile:function(){//清空上传文件
			this.$emit("uploadedFile",null);
		},
		uploadFile:function(file){//上传文件方法
			console.log("要上传至七牛的文件"+JSON.stringify(file));
			//在上传成功回调中使用
			this.$emit("uploadedFile",fileurl);//通知父组件 上传的图片
		},
		isInType: function(type) {
			switch(type) {
				case "image/png":
				case "image/jpeg":
					return true;
				default:
					return false;
			}
		}
	}
})