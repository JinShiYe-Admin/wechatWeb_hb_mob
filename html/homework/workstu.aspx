<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="workstu.aspx.cs" Inherits="Jsy.Weixin.QY.Suite.appschweb.app.workstu" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">

	<head>
		<title>作业详情</title>
		<meta charset="utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />

		<meta name="description" content="Write an awesome description for your new site here. You can edit this line in _config.yml. It will appear in your document head meta (for Google search results) and in your feed.xml site description." />
		<link rel="stylesheet" href="lib/weui.min.css" />
		<link rel="stylesheet" href="css/jquery-weui.css" />
		<link rel="stylesheet" href="css/demos.css" />
		<link rel="stylesheet" href="https://jsypay.jiaobaowang.net/suitetest/css/mui.min.css" />
		<link rel="stylesheet" href="https://jsypay.jiaobaowang.net/suitetest/css/utils/iconfont.css" />
		<style>
			body,
			html {
				overflow: auto;
				-webkit-overflow-scrolling: touch;
			}
			
			.wkimg {
				float: right;
				display: inline-block;
				transform: rotate(-30deg) scale(0.6);
				overflow: hidden;
				z-index: -100;
			}
			/*.placeholder {
		        width: 90px;
		        height: 82px;
		        overflow: hidden;
		    }*/
			/*.placeholder img {
		            max-width: 90px;
		            _width: expression(this.width > 90 ? "90px" : this.width);
		        }*/
			
			.placeholder {
				width: 100%;
				height: 120px;
				background-size: cover;
				background-position: center center;
				border: 1px solid #FFFFFF;
				overflow: hidden;
			}
			/*.placeholder2 img {
		            max-width: expression(screen.width/2);
		            _width: expression(this.width > 130 ? "130px" : this.width);
		        }*/
		</style>
	</head>

	<body ontouchstart>

		<%=newsstr %>
		<div id="submitHomework">
			<textarea name="MSG" cols=0 rows=4 placeholder="根据老师的要求来完成作业吧" v-model="workTitle" v-if="stat<2"></textarea>
			<div class="weui-cells weui-cells_form" v-if="stat<2">
				<div class="weui-cell">
					<div class="weui-cell__bd">
						<div class="weui-uploader">
							<div class="weui-uploader__hd">
								<p class="weui-uploader__title">上传照片</p>
							</div>
							<div class="weui-uploader__bd">
								<ul class="weui-uploader__files" id="uploaderFiles">
									<li v-for="(file,index) of uploadedFiles" @click="clickImg(index)" v-bind:class="['weui-uploader__file']" v-bind:style="{'background-image':'url('+file.ImgUrl+')'}"></li>
								</ul>
								<div class="weui-uploader__input-box" :style="displayAddBtn">
									<input id="uploaderInput" class="weui-uploader__input" type="file" accept="image/*" multiple="2" v-on:change="selectFile($event)">
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<a href="javascript:;" class="weui-btn weui-btn_primary" @click="clickSubmitBtn()" v-if="stat<2">{{submitBtnTitle}}</a>
			<input id="qnInput" style="display: none;">
			<!--<div class="weui-gallery" style="display: block">-->
			<div class="weui-gallery" :style="displayGallery" v-if="stat<2">
				<span class="weui-gallery__img" @click="clickGigImg" :style="{backgroundImage:'url('+selectImgPath+')'}"></span>
				<div class="weui-gallery__opr">
					<a href="javascript:" class="weui-gallery__del">
						<i class="weui-icon-delete weui-icon_gallery-delete" @click="deleteImg"></i>
					</a>
				</div>
			</div>
		</div>
		<script src='lib/jquery-2.1.4.js'></script>
		<script src='js/touch.min.js'></script>
		<script src='js/jquery-weui.js?v=1.1'></script>
		<script src='https://jsypay.jiaobaowang.net/suitetest/js/lib/exif/exif.min.js'></script>
		<script src='https://jsypay.jiaobaowang.net/suitetest/js/demoCssJs/vue.min.js'></script>
		<script src='https://jsypay.jiaobaowang.net/suitetest/js/appweb/choose-file.js'></script>
		<script src='https://jsypay.jiaobaowang.net/suitetest/js/utils/consts.js'></script>
		<script src='https://jsypay.jiaobaowang.net/suitetest/js/utils/events.js'></script>
		<script src='https://jsypay.jiaobaowang.net/suitetest/js/lib/vconsole/vconsole.min.js'></script>
		<script src='https://jsypay.jiaobaowang.net/suitetest/js/PublicProtocol.js'></script>
		<script src='https://jsypay.jiaobaowang.net/suitetest/js/utils/utils.js'></script>
		<script src='https://jsypay.jiaobaowang.net/suitetest/js/utils/storageutil.js'></script>
		<script src='https://jsypay.jiaobaowang.net/suitetest/js/lib/plupload/moxie.min.js'></script>
		<script src='https://jsypay.jiaobaowang.net/suitetest/js/lib/plupload/plupload.full.min.js'></script>
		<script src='https://jsypay.jiaobaowang.net/suitetest/js/lib/qiniu/qiniu.min.js'></script>
		<script src='https://jsypay.jiaobaowang.net/suitetest/js/utils/cryption.js'></script>
		<script src='https://jsypay.jiaobaowang.net/suitetest/js/utils/cloudutil.js'></script>
		<script src='https://jsypay.jiaobaowang.net/suitetest/js/utils/compress.js'></script>
		<script src='https://jsypay.jiaobaowang.net/suitetest/js/utils/pluploadutil.js'></script>
		<script>
			touch.on('#target', 'touchstart', function(ev) {
				ev.preventDefault();
			});
			touch.on('#ctc', 'pinchend', function(ev) {
				var thisEle = $('#ctc').css("font-size");
				if(ev.scale < 1) {
					//parseFloat的第二个参数表示转化的进制，10就表示转为10进制
					var textFontSize = parseFloat(thisEle, 10);
					//javascript自带方法
					var unit = thisEle.slice(-2); //获取单位
					textFontSize -= 2;
					//设置para的字体大小
					$('#ctc').css("font-size", textFontSize + unit);
				} else {
					//parseFloat的第二个参数表示转化的进制，10就表示转为10进制
					var textFontSize = parseFloat(thisEle, 10);
					//javascript自带方法
					var unit = thisEle.slice(-2); //获取单位
					textFontSize += 2;
					//设置para的字体大小
					$('#ctc').css("font-size", textFontSize + unit);
				}

			});
			var workId = '<%=workdoid%>'; //作业id
			var uptokenData;
			var qnFileUploader; //七牛上传控件对象
			window.onload = function() {
				console.log('onload');
				initQNUploader();
				findWork();
			}
			var submitHomework = new Vue({
				el: '#submitHomework',
				data: {
					workTitle: '',
					stat: 4,
					submitBtnTitle: '提交',
					displayGallery: {
						display: 'none'
					},
					displayAddBtn: {
						display: 'block'
					},
					selectIndex: 0,
					selectImgPath: '',
					uploadedFiles: []
				},
				methods: {
					selectFile: function(event) { //从手机中选择图片后到界面的回调
						// 如果没有选中文件，直接返回  
						var files = event.target.files;
						if(files.length === 0) {
							$.hideLoading();
							return;
						} else {
							uploadFiles(0, files, submitHomework.uploadedFiles.length);
						}
					},
					clickImg: function(index) { //点击列表中的附件，给别的地方赋值
						submitHomework.selectIndex = index;
						submitHomework.selectImgPath = submitHomework.uploadedFiles[index].ImgUrl;
						submitHomework.displayGallery = {
							display: 'block'
						};
					},
					clickGigImg: function() { //点击放大后的图片，隐藏显示
						submitHomework.displayGallery = {
							display: 'none'
						};
					},
					deleteImg: function() { //删除图片
						$.confirm({
							title: '提示',
							text: '确认删除？',
							onOK: function() {
								submitHomework.displayGallery = {
									display: 'none'
								};
								submitHomework.uploadedFiles.splice(submitHomework.selectIndex, 1);
								displayAddBtnFun();
							}
						});
					},
					clickSubmitBtn: function() { //提交按钮
						if(submitHomework.workTitle.length == 0 && submitHomework.uploadedFiles.length == 0) {
							$.alert('请作答后再提交');
							return;
						}
						//附件数组
						var tempEncs = [];
						for(var i = 0; i < submitHomework.uploadedFiles.length; i++) {
							var tempValue = submitHomework.uploadedFiles[i];
							var tempModel = {
								oldname: tempValue.OldName,
								newname: tempValue.NewName,
								saveurl: tempValue.SaveUrl,
								filesize: tempValue.FileSize,
								imgurl: tempValue.ImgUrl
							}
							tempEncs.push(tempModel);
						}
						$.showLoading('加载中...');

						//14.作业管理
						var tempData = {
							cmd: 'work', //14.作业管理
							type: 'studo', //学生做作业
							colid: workId, //workdoid
							colv: submitHomework.workTitle, //作答内容
							encs: tempEncs //作答附件
						}
						unitWebsitePro(tempData, function(data) {
							$.hideLoading();
							if(data.RspCode == 0) {
								console.log('成功');
								$.toast("成功");
								//如果为第一次提交作业，提交后，将状态改为修改
								if(submitHomework.stat == 0) {
									submitHomework.stat = 1;
									submitHomework.submitBtnTitle = '修改';
								}
							} else {
								$.alert(data.RspTxt);
							}
						});
					}
				}
			});

			//从相册中选择照片后，上传
			//index--从相册选择照片回调里面，照片的索引，files--选择的照片信息，filesSum--选择照片之前，现存的照片张数
			function uploadFiles(index, files, filesSum) {
				if(index < files.length) {
					if(filesSum + index > 8) {
						$.alert("最多只能上传9张照片");
					} else {
						var file = files[index];
						var types = file.type.toLowerCase().split("/");
						console.log("types:" + types);
						if(types[1] == "png" || types[1] == "jpg" || types[1] == "jpeg") {
							EXIF.getData(file, function() {
								$.showLoading('加载中...');
								var orientation = EXIF.getTag(this, 'Orientation'); //获取旋转信息
								console.log('orientation:' + JSON.stringify(orientation));
								//显示文件
								var reader = new FileReader();
								reader.onload = function() {
									var result = this.result;
									var maxSize = 2 * 1024 * 1024;
									compress.getImgInfo(result, function(img, imgInfo) {
										console.log("获取的文件信息：" + JSON.stringify(imgInfo));
										console.log("原图尺寸：" + result.length);
										var newDataUrl = compress.getCanvasDataUrl(img, compress.getSuitableSize(imgInfo, Math.ceil(result.length / maxSize)), orientation);
										var blob = compress.base64ToBlob(newDataUrl, 'image/jpeg');
										console.log("blob.type:" + blob.type);
										console.log('要传递的文件大小：' + blob.size);
										blob.lastModifiedDate = new Date();
										qnFileUploader.addFile(blob, Date.now() + '.jpg');
										index++;
										uploadFiles(index, files, filesSum);
									});
								}
								reader.readAsDataURL(file);
							});
						} else {
							if(index + 1 < filesSum.length) {
								index++;
								uploadFiles(index, files, filesSum);
							}
							$.toast("请选择png,jpg,jpeg类型的图片");
						}
					}
				}
			}

			//获取回答的作业
			function findWork() {
				//学生分页查找作业
				var tempData = {
					cmd: 'work', //14.作业管理
					type: 'stufind', //学生分页查找作业
					workdoid: workId, //做作业ID,workdoid,见获取作业列表中的workdoid
					pagesize: '1', //作答内容
					pageindex: '1' //作答附件
				}
				unitWebsitePro(tempData, function(data) {
					$.hideLoading();
					if(data.RspCode == 0) {
						console.log('成功获取作业:' + JSON.stringify(data));
						if(data.RspData.dt.length > 0) {
							var tempWork = data.RspData.dt[0];
							submitHomework.workTitle = tempWork.DoContent;
							if(submitHomework.workTitle == null) {
								submitHomework.workTitle = '';
							}
							submitHomework.uploadedFiles = data.RspData.dt2;
							if(tempWork.stat == 0) {
								submitHomework.submitBtnTitle = '提交';
							} else {
								submitHomework.submitBtnTitle = '修改';
							}
							displayAddBtnFun();
							submitHomework.stat = tempWork.stat;
						}
					} else {
						$.alert(data.RspTxt);
					}
				});
			}

			/**
			 * 初始化上传
			 */
			function initQNUploader() {
				qnFileUploader = Qiniu.uploader({
					disable_statistics_report: false, // 禁止自动发送上传统计信息到七牛，默认允许发送
					runtimes: 'html5,flash,html4', // 上传模式,依次退化
					browse_button: 'qnInput', // 上传选择的点选按钮，**必需**
					uptoken_func: function(file) { // 在需要获取 uptoken 时，该方法会被调用
						uptokenData = null;
						uptokenData = getQNUpToken(file);
						console.log("获取uptoken回调:" + JSON.stringify(uptokenData));
						if(uptokenData && uptokenData.code) { //成功
							return uptokenData.data.Data[0].Token;
						} else {
							qnFileUploader.stop();
						}
					},
					unique_names: false, // 默认 false，key 为文件名。若开启该选项，JS-SDK 会为每个文件自动生成key（文件名）
					save_key: false, // 默认 false。若在服务端生成 uptoken 的上传策略中指定了 `save_key`，则开启，SDK在前端将不对key进行任何处理
					get_new_uptoken: true, // 设置上传文件的时候是否每次都重新获取新的 uptoken
					domain: storageutil.QNPBDOMAIN, // bucket 域名，下载资源时用到，如：'http://xxx.bkt.clouddn.com/' **必需**
					max_file_size: '4mb', // 最大文件体积限制
					flash_swf_url: 'https://jsypay.jiaobaowang.net/suitetest/js/lib/plupload/Moxie.swf', //引入 flash,相对路径
					max_retries: 0, // 上传失败最大重试次数
					dragdrop: false, // 开启可拖曳上传
					chunk_size: '4mb', // 分块上传时，每块的体积
					auto_start: true, // 选择文件后自动上传，若关闭需要自己绑定事件触发上传,
					init: {
						'FilesAdded': function(up, files) {
							console.log("FilesAdded0:", files);
							plupload.each(files, function(file) {
								// 文件添加进队列后,处理相关的事情
								console.log("FilesAdded:", file);
							});
						},
						'BeforeUpload': function(up, file) {
							$.showLoading('加载中...');
							// 每个文件上传前,处理相关的事情
							console.log("BeforeUpload:");
						},
						'UploadProgress': function(up, file) {
							// 每个文件上传时,处理相关的事情
							console.log("UploadProgress:" + file.percent);
						},
						'FileUploaded': function(up, file, info) {
							// 每个文件上传成功后,处理相关的事情
							console.log("FileUploaded:");
							$.hideLoading();
							if(info.status == 200) {
								var tempModel = {
									ImgUrl: storageutil.QNPBDOMAIN + JSON.parse(info["response"]).key,
									SaveUrl: storageutil.QNPBDOMAIN + JSON.parse(info["response"]).key,
									OldName: file.name,
									NewName: file.name,
									FileSize: file.size
								}
								submitHomework.uploadedFiles.push(tempModel);
								displayAddBtnFun();
								console.log("success:" + storageutil.QNPBDOMAIN + JSON.parse(info["response"]).key);
							}
						},
						'Error': function(up, err, errTip) {
							//上传出错时,处理相关的事情
							console.log("Error:", err, errTip);
							$.hideLoading();
						},
						'UploadComplete': function() {
							//队列文件处理完毕后,处理相关的事情
							console.log("UploadComplete:");
						},
						'Key': function(up, file) {
							console.log('得到token0:' + JSON.stringify(uptokenData));
							// 若想在前端对每个文件的key进行个性化处理，可以配置该函数
							// 该配置必须要在 unique_names: false , save_key: false 时才生效
							if(uptokenData && uptokenData.code) { //成功
								console.log('得到token:' + JSON.stringify(uptokenData));
								return uptokenData.data.Data[0].Key;
							}
						}
					}
				});
			}

			//判断照片添加按钮是否显示，大于9张时隐藏
			function displayAddBtnFun() {
				if(submitHomework.uploadedFiles.length >= 9) {
					submitHomework.displayAddBtn = {
						display: 'none'
					};
				} else {
					submitHomework.displayAddBtn = {
						display: 'block'
					};
				}
			}
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
				return upToken;
			}
		</script>
		<script src="js/swiper.js"></script>

		<script>
			var stuimgs = '<%=stuimgs%>';
			var stuimgsitems = stuimgs.split('|=');
			var pb1 = $.photoBrowser({
				items: stuimgsitems,

				onSlideChange: function(index) {
					console.log(this, index);
				},

				onOpen: function() {
					console.log("onOpen", this);
				},
				onClose: function() {
					console.log("onClose", this);
				}
			});

			var tecimgs = '<%=tecimgs%>';
			var tecimgsitems = tecimgs.split('|=');
			var pb2 = $.photoBrowser({
				items: tecimgsitems,

				onSlideChange: function(index) {
					console.log(this, index);
				},

				onOpen: function() {
					console.log("onOpen", this);
				},
				onClose: function() {
					console.log("onClose", this);
				}
			});

			function openstuimg(index) {
				pb1.open(index);
			}

			function opentecimg(index) {
				pb2.open(index);
			}
		</script>
	</body>

</html>