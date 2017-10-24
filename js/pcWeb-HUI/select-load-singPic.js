Vue.component("select-load-pic", {
	props:["pictype"],//0 原图 最大2M 1缩略图
	template: '<span class="btn-upload form-group">' +
		'<input class="input-text upload-url radius piece" type="text" readonly :placeholder="pictype|placeHolder">' +
		'<a href="" id="upload" class="btn btn-primary radius"><i class="Hui-iconfont Hui-iconfont-upload"></i> 浏览文件</a>' +
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
			 var bannerOption = {
					disable_statistics_report: true, // 禁止自动发送上传统计信息到七牛，默认允许发送
					runtimes: 'html5,flash,html4', // 上传模式,依次退化
					browse_button: 'upload', // 上传选择的点选按钮，**必需** 
					uptoken_func: function(file) { // 在需要获取 uptoken 时，该方法会被调用 
						console.log("uptoken_func:" + JSON.stringify(file));
						uptokenData = null;
						uptokenData = getQNUpToken(file);
						console.log("获取uptoken回调:" + JSON.stringify(uptokenData));
						if(uptokenData && uptokenData.code) { //成功   
							return uptokenData.data.Data[0].Token;
						} else {
							bannerUploader.stop();
							var dialog = weui.dialog({
								title: "上传失败",
								content: uptokenData.message,
								className: "custom-classname",
								buttons: [{
									label: "确定",
									type: "primary",
									onClick: function() {
										dialog.hide();
									}
								}]
							});
						}
					},
					unique_names: false, // 默认 false，key 为文件名。若开启该选项，JS-SDK 会为每个文件自动生成key（文件名）
					save_key: false, // 默认 false。若在服务端生成 uptoken 的上传策略中指定了 `save_key`，则开启，SDK在前端将不对key进行任何处理
					get_new_uptoken: true, // 设置上传文件的时候是否每次都重新获取新的 uptoken
					domain: storageutil.QNPBDOMAIN, // bucket 域名，下载资源时用到，如：'http://xxx.bkt.clouddn.com/' **必需**
					max_file_size: '10mb', // 最大文件体积限制
					flash_swf_url: '../../js/lib/plupload/Moxie.swf', //引入 flash,相对路径
					max_retries: 0, // 上传失败最大重试次数
					dragdrop: false, // 开启可拖曳上传
					chunk_size: '4mb', // 分块上传时，每块的体积
					auto_start: true, // 选择文件后自动上传，若关闭需要自己绑定事件触发上传,
					filters: {
						mime_types: [ //只允许上传图片和zip文件
							{
								title: "Image files",
								extensions: "jpg,png,jpeg,gif,bmp"
							}
						]
					},
					init: {
						'FilesAdded': function(up, files) {
							plupload.each(files, function(file) {
								// 文件添加进队列后,处理相关的事情
								imgName = JSON.stringify(file.name)
								var img = imgName.substring(-1, (imgName - 1));
								//document.getElementById('Priimgname0').value = imgName;
								console.log("FilesAdded:" + JSON.stringify(file));
							});
						},
						'UploadProgress': function(up, file) {
							// 每个文件上传时,处理相关的事情  
							//vm_loading.content = "上传中 " + file.percent + "%";
						},
						'FileUploaded': function(up, file, info) {
							// 每个文件上传成功后,处理相关的事情 
							console.log("文件:info:" + JSON.stringify(info));
							if(info.status == 200) {
								var cc = eval("(" + info.response + ")");
								imgurl = storageutil.QNPBDOMAIN + cc.key;
								console.log("imgurl:" + imgurl);
								var imgLink = Qiniu.imageView2({
									mode: 3, // 缩略模式，共6种[0-5]
									w: 100, // 具体含义由缩略模式决定 
									h: 100, // 具体含义由缩略模式决定
									q: 100, // 新图的图像质量，取值范围：1-100
									format: 'png' // 新图的输出格式，取值范围：jpg，gif，png，webp等
								}, cc.key);
								//Pridl=Priimgname.substring(9,10)
								if(Priimgname != undefined) {

									document.getElementById(Priimgname).value = imgurl;
									var person = new Object();
									person.encid = priid; //控件id
									person.saveurl = imgurl; //图片地址
									person.imgurl = imgLink;
									person.oldname = file.name;
									person.newname = cc.key;
									person.filesize = file.size;
									//循环附件数组，判断id是否有重复
									for(var i = 0; i < FileDataArray.length; i++) {
										if(FileDataArray[i].id == priid) {
											//如果有重复则移除原来的
											FileDataArray.splice(i, 1);
										}
									}
									//添加新的附件

									FileDataArray.push(person);

									objArray.push([imgurl]);
								} else {
									document.getElementById('filename').value = imgurl;
								}
								//vm_loading.isShow = false;  
							} else {
								var dialog = weui.dialog({
									title: "上传失败",
									content: JSON.stringify(info),
									className: "custom-classname",
									buttons: [{
										label: "确定",
										type: "primary",
										onClick: function() {
											dialog.hide();
										}
									}]
								});
							}
						},
						'Error': function(up, err, errTip) {
							var dialog = weui.dialog({
								title: "操作失败",
								content: pluploadutil.errMes(err.code, errTip),
								className: "custom-classname",
								buttons: [{
									label: "确定",
									type: "primary",
									onClick: function() {
										dialog.hide();
									}
								}]
							});
						},
						'UploadComplete': function() {
							//队列文件处理完毕后,处理相关的事情
							//console.log("UploadComplete");
						},
						'Key': function(up, file) {
							// 若想在前端对每个文件的key进行个性化处理，可以配置该函数
							// 该配置必须要在 unique_names: false , save_key: false 时才生效
							if(uptokenData && uptokenData.code) { //成功
								return uptokenData.data.Data[0].Key;
							}
						}
					}
				}
				bannerUploader = Qiniu.uploader(bannerOption);
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

	/**
			 * 获取七牛上传token
			 */
			function getQNUpToken(file) {
				var myDate = new Date();
				var fileName = myDate.getTime() + "" + parseInt(Math.random() * 1000);
				var types = file.name.split(".");
				fileName = fileName + "." + types[types.length - 1];
				var getTokenData = {
					appId: storageutil.QNQYWXKID,
					mainSpace: storageutil.QNPUBSPACE,
					saveSpace: storageutil.QNSSPACEWEBCON,
					fileArray: [{
						qnFileName: fileName,
					}]
				}
				var upToken;
				cloudutil.getFileUpTokens(getTokenData, function(data) {
					upToken = data;
				});
				console.log("gettokendata" + JSON.stringify(getTokenData))
				return upToken;
			}