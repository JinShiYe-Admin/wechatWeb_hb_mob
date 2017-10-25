<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="worktecsend.aspx.cs" Inherits="Jsy.Weixin.QY.Suite.appschweb.app.worktecsend" %>

<!doctype html>
<html>

	<head>
		<meta charset="UTF-8">
		<title>作业发布</title>
		<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
		<link rel="stylesheet" href="lib/weui.min.css" />
		<link rel="stylesheet" href="css/jquery-weui.css" />
		<link rel="stylesheet" href="css/demos.css" />
		<link rel="stylesheet" href="https://jsypay.jiaobaowang.net/suitetest/css/utils/iconfont.css" />
		<link rel="stylesheet" href="https://jsypay.jiaobaowang.net/suitetest/css/mui.min.css" />
		<style>
			.wrap {
				width: 30px;
				position: relative;
			}
			
			.img {
				width: 27px;
				height: 27px;
			}
			
			.notice {
				width: 15px;
				height: 15px;
				line-height: 15px;
				font-size: 10px;
				color: #fff;
				text-align: center;
				background-color: #f00;
				border-radius: 50%;
				position: absolute;
				right: -7px;
				top: -7px;
			}
			
			.lines {
				height: 1px;
				border-top: 10px solid #f5f1f1;
				text-align: center;
				margin: 10px 0px 0px 0px;
			}
		</style>
	</head>

	<body>
		<div class="weui-tab">
			<div class="weui-tab__bd">
				<div class="weui-tab__bd-item weui-tab__bd-item--active">
					<div id="homework" v-if="stat<2">
						<div class="weui-cell">
							<div class="weui-cell__hd"><label class="weui-label">科目</label></div>
							<div class="weui-cell__bd">
								<input onclick="selectSubject(this)" class="weui-input" placeholder="请选择科目" :value="subject.currSubject.name" v-model="subject.currSubject.name">
							</div>
						</div>
						<div class="weui-cell">
							<div class="weui-cell__hd"><label class="weui-label">班级</label></div>
							<div class="weui-cell__bd">
								<input onclick="selectClass(this)" class="weui-input" placeholder="请选择班级" :value="classes.currClass.name" v-model="classes.currClass.name">
							</div>
						</div>
						<div class="weui-cells__title" style="color: black;font-size: 17px;">内容</div>
						<div class="weui-cells">
							<div class="weui-cell">
								<div class="weui-cell__bd">
									<textarea style="width:100%" name="MSG" cols=0 rows=6 placeholder="作业内容" v-model="workTitle"></textarea>
								</div>
							</div>
						</div>
						<div class="weui-cell weui-cell_switch">
							<div class="weui-cell__bd">是否发送通知</div>
							<div class="weui-cell__ft">
								<input class="weui-switch" type="checkbox" v-model="issend">
							</div>
						</div>
						<div class="weui-cells weui-cells_form">
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
												<input id="uploaderInput" class="weui-uploader__input" type="file" accept="image/*" multiple="" v-on:change="selectFile($event)">

											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<a href="javascript:;" class="weui-btn weui-btn_primary" @click="clickSubmitBtn()">提交</a>
						<input id="qnInput" style="display: none;" />
						<!--<div class="weui-gallery" style="display: block">-->
						<div class="weui-gallery" :style="displayGallery">
							<span class="weui-gallery__img" @click="clickGigImg" :style="{backgroundImage:'url('+selectImgPath+')'}"></span>
							<div class="weui-gallery__opr">
								<a href="javascript:" class="weui-gallery__del">
									<i class="weui-icon-delete weui-icon_gallery-delete" @click="deleteImg"></i>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div id="bottomView" class="weui_tab footer-menu">
			<div class="weui-tabbar">
				<a href="index.aspx" class="weui-tabbar__item">
					<div class="wrap">
						<img class="img" src="images/pic_ico_index0.png" alt="">
						<div class="notice">8</div>
					</div>
					<p class="weui-tabbar__label">微校园</p>
				</a>
				<a href="#" class="weui-tabbar__item weui-bar__item--on">
					<div class="wrap">
						<img class="img" src="images/pic_ico_worksend.png" alt="">
						<div class="notice">12</div>
					</div>
					<p class="weui-tabbar__label">作业发布</p>
				</a>
				<a href="workindex.aspx" class="weui-tabbar__item">
					<div class="wrap">
						<img class="img" src="images/pic_ico_workindex0.png" alt="">
						<div class="notice">12</div>
					</div>
					<p class="weui-tabbar__label">作业管理</p>
				</a>
				<a href="workmine.aspx" class="weui-tabbar__item">
					<div class="weui-tabbar__icon">
						<img class="img" src="images/pic_ico_workmine0.png" alt="">
					</div>
					<p class="weui-tabbar__label">我的作业</p>
				</a>
			</div>
		</div>
		<script src="https://jsypay.jiaobaowang.net/suitetest/js/weui.min.js" type="text/javascript" charset="utf-8"></script>

		<script src="https://jsypay.jiaobaowang.net/suitetest/js/demoCssJs/vue.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="https://jsypay.jiaobaowang.net/suitetest/js/appweb/choose-file.js" type="text/javascript" charset="utf-8"></script>
		<script src="lib/jquery-2.1.4.js" type="text/javascript" charset="utf-8"></script>
		<script src="js/jquery-weui.js" type="text/javascript" charset="utf-8"></script>
		<script src="https://jsypay.jiaobaowang.net/suitetest/js/utils/consts.js"></script>
		<script src="https://jsypay.jiaobaowang.net/suitetest/js/utils/events.js"></script>
		<script src="https://jsypay.jiaobaowang.net/suitetest/js/lib/vconsole/vconsole.min.js"></script>
		<script src='https://jsypay.jiaobaowang.net/suitetest/js/lib/exif/exif.min.js'></script>
		<script type='text/javascript' src='https://jsypay.jiaobaowang.net/suitetest/js/PublicProtocol.js'></script>
		<script type='text/javascript' src='https://jsypay.jiaobaowang.net/suitetest/js/utils/utils.js'></script>
		<script type='text/javascript' src='https://jsypay.jiaobaowang.net/suitetest/js/utils/storageutil.js'></script>
		<script type='text/javascript' src='https://jsypay.jiaobaowang.net/suitetest/js/lib/plupload/moxie.min.js'></script>
		<script type='text/javascript' src='https://jsypay.jiaobaowang.net/suitetest/js/lib/plupload/plupload.full.min.js'></script>
		<script type='text/javascript' src='https://jsypay.jiaobaowang.net/suitetest/js/lib/qiniu/qiniu.min.js'></script>
		<script type='text/javascript' src='https://jsypay.jiaobaowang.net/suitetest/js/utils/cryption.js'></script>
		<script type='text/javascript' src='https://jsypay.jiaobaowang.net/suitetest/js/utils/cloudutil.js'></script>
		<script type='text/javascript' src='https://jsypay.jiaobaowang.net/suitetest/js/utils/compress.js'></script>
		<script type='text/javascript' src='https://jsypay.jiaobaowang.net/suitetest/js/utils/pluploadutil.js'></script>

		<script type="text/javascript">
			var winHeight = $(window).height(); //获取当前页面高度
			$(window).resize(function() {
				var thisHeight = $(this).height();
				if(winHeight - thisHeight > 50) {
					document.getElementById("bottomView").style.display = "none"
					//当软键盘弹出，在这里面操作

				} else {
					document.getElementById("bottomView").style.display = "table"
					//当软键盘收起，在此处操作

				}
			});
			var uptokenData;
			var qnFileUploader; //七牛上传控件对象
			window.onload = function() {
				console.log('onload');
				initQNUploader();
				getSub();
				getDepart();
				//对按钮进行监听
				document.getElementById("notice").addEventListener('toggle', function(event) {
					homework.issend = homework.issend == 0 ? 1 : 0;
					console.log(homework.issend);
					//alert(isManual);
				});

			}
			var homework = new Vue({
				el: '#homework',
				data: {
					subject: {
						currSubject: {
							name: '',
							id: ''
						},
						subjects: []
					},
					classes: {
						currClass: {
							name: '',
							id: '',
							persons: []
						},
					},
					workTitle: '',
					stat: 0,
					issend: true,
					submitBtnTitle: '发布',
					displayGallery: {
						display: 'none'
					},
					displayAddBtn: {
						display: 'block'
					},
					depart_array: [],

					selectIndex: 0,
					selectImgPath: '',
					uploadedFiles: []
				},
				methods: {
					selectFile: function(event) { //从手机中选择图片后到界面的回调
						// 如果没有选中文件，直接返回  
						var files = event.target.files;
						if(files.length === 0) {
							return;
						}
						uploadFiles(0, files, homework.uploadedFiles.length);
					},

					clickImg: function(index) { //点击列表中的附件，给别的地方赋值
						homework.selectIndex = index;
						homework.selectImgPath = homework.uploadedFiles[index].ImgUrl;
						homework.displayGallery = {
							display: 'block'
						};
					},
					clickGigImg: function() { //点击放大后的图片，隐藏显示
						homework.displayGallery = {
							display: 'none'
						};
					},
					deleteImg: function() { //删除图片
						$.confirm({
							title: '提示',
							text: '确认删除？',
							onOK: function() {
								homework.displayGallery = {
									display: 'none'
								};
								homework.uploadedFiles.splice(homework.selectIndex, 1);
								displayAddBtnFun();
							}
						});

					},
					clickSubmitBtn: function() { //提交按钮
						if(homework.workTitle.length == 0 && homework.uploadedFiles.length == 0) {
							alert('请填写具体内容后再发布');
							return;
						}
						if(homework.workTitle.length >= 2000) {
							alert('内容不能超过2000字');
							return;
						}
						if(homework.subject.currSubject.name == '') {
							alert("请选择科目");
							return;
						}
						if(homework.classes.currClass.name == '') {
							alert("请选择班级");
							return;
						}

						var issend = homework.issend ? 1 : 0;

						//附件数组
						var tempEncs = [];
						for(var i = 0; i < homework.uploadedFiles.length; i++) {
							var tempValue = homework.uploadedFiles[i];
							var tempModel = {
								oldname: tempValue.OldName,
								newname: tempValue.NewName,
								saveurl: tempValue.SaveUrl,
								filesize: tempValue.FileSize,
								imgurl: tempValue.ImgUrl
							}
							tempEncs.push(tempModel);
						}

						var idArr = [];
						var nameArr = [];
						for(var i = 0; i < homework.classes.currClass.persons.length; i++) {
							var model = homework.classes.currClass.persons[i];
							idArr.push(model.userid);
							nameArr.push(model.name);

						}
						if(idArr.length == 0) {
							alert('此部门暂无人员');
							return;
						}
						$.showLoading('加载中...');
						var tempData = {
							cmd: 'work',
							type: 'add',
							touser: idArr.join('|'),
							toparty: homework.classes.currClass.id,
							totag: '',
							msgtype: 'textcard',
							safe: 0,
							content: homework.workTitle,
							tousername: nameArr.join('|'),
							topartyname: homework.classes.currClass.name,
							totagname: '',
							subid: homework.subject.currSubject.id,
							subname: homework.subject.currSubject.name,
							subimg: '',
							encs: tempEncs,
							issend: issend
						}
						console.log(JSON.stringify(tempData))
						unitWebsitePro(tempData, function(data) {
							$.hideLoading();
							if(data.RspCode == 0) {
								homework.subject = {
									currSubject: {
										name: '',
										id: ''
									},
									subjects: []
								};
								homework.classes = {
									currClass: {
										name: '',
										id: '',
										persons: []
									},
									allPersons: []
								};

								homework.issend = true;
								homework.workTitle = '';
								homework.stat = 0;
								homework.submitBtnTitle = '提交';
								homework.displayGallery = {
									display: 'none'
								};
								homework.displayAddBtn = {
									display: 'block'
								};

								homework.selectIndex = 0;
								homework.selectImgPath = '';
								homework.uploadedFiles = [];
								console.log('成功');
								$.toptip('发布成功', 'success');
							}

						})
					}
				}
			});

			//从相册中选择照片后，上传
			function uploadFiles(index, files, filesSum) {
				if(index < files.length) {
					if(filesSum + index > 8) {
						$.alert("最多只能上传9张照片");
					} else {
						var file = files[index];
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
					}
				}
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
						//console.log("获取uptoken回调:" + JSON.stringify(uptokenData));
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
							plupload.each(files, function(file) {
								$.showLoading('加载中...');
								// 文件添加进队列后,处理相关的事情
								console.log("FilesAdded:", file);
							});
						},
						'BeforeUpload': function(up, file) {
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
								homework.uploadedFiles.push(tempModel);
								displayAddBtnFun();
								console.log("success:" + storageutil.QNPBDOMAIN + JSON.parse(info["response"]).key);
								console.log("success:" + storageutil.QNPBDOMAIN + ',' + JSON.stringify(info));
								console.log("success:" + JSON.stringify(file));
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
			//判断照片添加按钮是否显示，大于9张时隐藏
			function displayAddBtnFun() {
				if(homework.uploadedFiles.length >= 9) {
					homework.displayAddBtn = {
						display: 'none'
					};
				} else {
					homework.displayAddBtn = {
						display: 'block'
					};
				}
			}

			function getSub() {
				var tempData = {
					cmd: 'sub',
					type: 'findpage',
					pagesize: 10,
					pageindex: 1,
					stat: '1'
				}
				$.showLoading('加载中...');
				unitWebsitePro(tempData, function(data) {
					$.hideLoading();
					console.log('科目:' + JSON.stringify(data));
					if(data.RspCode == 0) {
						homework.sub_array = data.RspData.dt;
						for(var i = 0; i < homework.sub_array.length; i++) {
							var model = homework.sub_array[i];
							model.value = model.subid;
							model.label = model.cname;
						}
					} else {
						mui.toast(data.RspTxt)
					}
				})
			}

			function getDepart() {

				var tempData = {
					cmd: 'persondeparts',
					type: 'findpage',
				}
				unitWebsitePro(tempData, function(data) {
					console.log('部门:' + JSON.stringify(data));
					var rspData = JSON.parse(data.RspData);
					if(data.RspCode == 0) {
						for(var i = 0; i < rspData.length; i++) {
							var model = rspData[i];
							if(model.value == -1) {
								continue;
							} else {
								model.label = model.title;
								homework.depart_array.push(model);
							}
						}

					} else {
						mui.toast(data.RspTxt)
					}
				})

			}

			function getPerson(colid) {
				var tempData = {
					cmd: 'departpersons',
					type: 'findpage',
					colid: colid,
					colv: 0,
					callcol: 'base',
				}
				unitWebsitePro(tempData, function(data) {
					var tempArr = [];
					console.log('人员:' + JSON.stringify(data));
					for(var i = 0; i < data.RspData.length; i++) {
						var model = data.RspData[i];
						if(model.isleader == 0) {
							tempArr.push(model);

						}
					}
					if(data.RspCode == 0) {
						for(var i = 0; i < homework.depart_array.length; i++) {
							var model = homework.depart_array[i];
							console.log("model=" + JSON.stringify(model))
							if(model.value == colid) {
								model.persons = tempArr;
								homework.classes.currClass.persons = model.persons;
							}
						}

					} else {
						mui.toast(data.RspTxt)
					}
				})

			}

			function selectClass(input_item) {
				document.activeElement.blur();
				var self = input_item;
				weui.picker(homework.depart_array, {
					onChange: function(result) {
						//						console.log(result);
					},
					onConfirm: function(result) {
						homework.classes.currClass.name = result[0].label;
						homework.classes.currClass.id = result[0].value;
						getPerson(result[0].value)
					}
				});
			}

			function selectSubject(input_item) {
				document.activeElement.blur();
				var self = input_item;
				weui.picker(homework.sub_array, {
					onChange: function(result) {
						//						console.log(result);
					},
					onConfirm: function(result) {
						homework.subject.currSubject.name = result[0].label;
						homework.subject.currSubject.id = result[0].value;
						//						console.log(result);
					}
				});
			}
		</script>
		<script>
			var allheight = document.getElementsByClassName('weui-tab')[0].scrollHeight
			var barheight = document.getElementsByClassName('weui-tabbar')[0].scrollHeight
			$('.weui-tab__bd').css({
				'height': (allheight - barheight) * 100 / allheight + '%'
			});
			//有红点提示的宽度调整
			var tabar_width = document.getElementsByClassName('weui-tabbar__item')[0].scrollWidth
			$('.wrap').css({
				'left': (tabar_width - 30) * 50 / tabar_width + '%'
			});
			window.addEventListener("resize", function() {
				var allheight = document.getElementsByClassName('weui-tab')[0].scrollHeight
				var barheight = document.getElementsByClassName('weui-tabbar')[0].scrollHeight
				$('.weui-tab__bd').css({
					'height': (allheight - barheight) * 100 / allheight + '%'
				});

				var tabar_width = document.getElementsByClassName('weui-tabbar__item')[0].scrollWidth
				$('.wrap').css({
					'left': (tabar_width - 30) * 50 / tabar_width + '%'
				});
			}, false);
		</script>
	</body>

</html>