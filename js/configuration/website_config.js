//输入框组件
Vue.component('input-item', {
	props: ['value', 'index'],
	template: '<div>\
					<div class="weui-cells__title">{{value.title}}</div>\
					<div class="weui-cells">\
						<div class="weui-cell">\
							<div class="weui-cell__bd">\
								<input class="weui-input" v-model="value.message" :maxlength="value.maxlength" :type="value.type" :placeholder="\'请输入\'+value.title" @input="oninput(index);" @blur="onblur(index);">\
							</div>\
						</div>\
					</div>\
				</div>',
	methods: {
		oninput: function(index) { //输入时的监听，0中文名，1英文名，2单位联系方式
			console.log("oninput " + index + " " + vm_input.inputArray[index].message);
			switch(index) {
				case 0: //中文名
					vm_input.inputArray[index].message = vm_input.inputArray[index].message.replace(/[^\u4E00-\u9FA5| ]/g, "").replace(/(^\s*)|(\s*$)/g, "");
					break;
				case 1: //英文名
					vm_input.inputArray[index].message = vm_input.inputArray[index].message.replace(/[^\/a-z|A-Z| ]/g, "").replace(/(^\s*)|(\s*$)/g, "");
					break;
				case 2: //单位联系方式
					vm_input.inputArray[index].message = vm_input.inputArray[index].message.replace(/[^\d]/g, "")
					break;
				default:
					break;
			}
		},
		onblur: function(index) { //失去焦点时的监听，0中文名，1英文名，2单位联系方式
			console.log("onblur " + index);
			if(vm_input.inputArray[index].message != webConfig[vm_input.inputArray[index].callcol]) {
				//有改变
				if(vm_input.inputArray[index].message == "") {
					//为空
					vm_input.inputArray[index].message = webConfig[vm_input.inputArray[index].callcol];
				} else {
					vm_loading.isShow = true;
					var data = {
						type: 0,
						index: index,
						callcol: vm_input.inputArray[index].callcol,
						colv: vm_input.inputArray[index].message
					}
					changeWebsiteConfig(data);
				}
			}
		}
	}
});
//皮肤选项组件
Vue.component('skin-item', {
	props: ['value'],
	template: '<div>\
					<div class="weui-cells__title">皮肤</div>\
					<div class="weui-cells">\
						<a class="weui-cell weui-cell_access"  @click="onclick(value);">\
							<div class="weui-cell__bd">\
								<p>{{value}}</p>\
							</div>\
							<div class="weui-cell__ft"></div>\
						</a>\
					</div>\
				</div>',
	methods: {
		onclick: function(value) {
			console.log("skin " + value);
			var dialog = weui.dialog({
				title: "操作失败",
				content: "修改皮肤功能暂未开放",
				className: "custom-classname",
				buttons: [{
					label: "确定",
					type: "primary",
					onClick: function() {
						dialog.hide();
					}
				}]
			});
			//			utils.mOpenWithData("Skin.html", {
			//				skinid: value
			//			});
		}
	}
});
//图片组件
Vue.component("image-item", {
	props: ['value', 'index'],
	template: '<div>\
					<div class="weui-cells__title">{{value.title}}</div>\
					<div class="weui-cells">\
						<div class="weui-cell">\
							<div class="weui-cell__bd" :id="value.parid">\
								<div class="website-image" :style="{backgroundImage:\'url(\'+ value.imageurl+\')\'}" @click="showImage(index,true);"></div>\
								<button class="weui-btn weui-btn_mini weui-btn_primary" :id="value.id">修改</button>\
								<div class="website-file-type">(JPG,PNG|10M)</div>\
								<div class="website-upload-image" v-show="value.showupload">\
									<div class="website-image" :style="{backgroundImage:\'url(\'+ value.fbase+\')\'}" @click="showLocalImage(index,true);"></div>\
									<div>文件:</div>\
									<div>{{value.fname}}</div>\
									<div>大小:</div>\
									<div>{{value.fsize}}</div>\
									<button class="weui-btn weui-btn_mini weui-btn_primary" @click="upLoadFile(index);">上传</button>\
								</div>\
							</div>\
						</div>\
					</div>\
					<div class="weui-gallery" v-if="value.showimage" @click="showImage(index,false);">\
						<span class="weui-gallery__img" :style="{backgroundImage:\'url(\'+ value.imageurl+\')\'}"></span>\
					</div>\
					<div class="weui-gallery" v-if="value.showlocalimage" @click="showLocalImage(index,false);">\
						<span class="weui-gallery__img" :style="{backgroundImage:\'url(\'+ value.fbase+\')\'}"></span>\
					</div>\
				</div>',
	methods: {
		showImage: function(index, type) {
			console.log("showImage:" + index + " " + type);
			vm_image.imageArray[index].showimage = type;
		},
		showLocalImage: function(index, type) {
			console.log("showLocalImage:" + index + " " + type);
			vm_image.imageArray[index].showlocalimage = type;
		},
		upLoadFile: function(index) {
			console.log("upLoadFile:" + index);
			vm_loading.content = "上传中 0%";
			vm_loading.isShow = true;
			if(index == 0) {
				logoUploader.start();
			} else {
				bannerUploader.start();
			}
		}
	}
});

//开关组件
Vue.component('switch-item', {
	props: ['value', 'index'],
	template: '<div>\
					<div class="weui-cell weui-cell_switch">\
						<div class="weui-cell__bd">{{value.title}}</div>\
						<div class="weui-cell__ft">\
							<input class="weui-switch" type="checkbox" v-model="value.check" @change="onchange(index);">\
						</div>\
					</div>\
				</div>',
	methods: {
		onchange: function(index) {
			console.log("onchange " + index + " " + vm_switch.switchArray[index].check);
			if(vm_switch.switchArray[index].check != webConfig[vm_switch.switchArray[index].callcol]) {
				vm_loading.isShow = true;
				var data = {
					type: 1,
					index: index,
					callcol: vm_switch.switchArray[index].callcol,
					colv: vm_switch.switchArray[index].check * 1
				}
				changeWebsiteConfig(data);
			}
		}
	}
});

var webConfig = {}; //网站配置的数据
//---假数据---start---
//webConfig = {};
//webConfig.cname = '中文名';
//webConfig.ename = 'yingwenming';
//webConfig.corptel = '110';
//webConfig.logourl = 'http://ojhtju24r.bkt.clouddn.com/wechat/webcon/1500367775004956.png';
//webConfig.bannerurl = '';
//webConfig.stat = 0;
//webConfig.isreply = 0;
//webConfig.isnewchk = 0;
//webConfig.isnewreplychk = 0;
//webConfig.isfileup = 0;
//webConfig.isfiledown = 0;
//webConfig.iswrite = 0;
//webConfig.isass = 0;
//webConfig.skinid = 0;
//---假数据---end---

var vm_loading; //等待框
var vm_input; //输入框
var vm_skin; //皮肤选项
var vm_image; //图片列表
var vm_switch; //开关
var logoUploader; //上传logo七牛对象
var bannerUploader; //上传banner七牛对象
var uptokenData; //上传的token

window.onload = function() {
	console.log("window.onload:");
	initVueVM();
	initQNUpLoader();
	//initData();
	getWebsitConfig(); //获取配置

	//initWebsiteConfig(webConfig);
	//vm_loading.isShow = false;

};

/**
 * 初始化Vue的vm
 */
function initVueVM() {
	//等待框
	vm_loading = new Vue({
		el: "#loading",
		data: {
			isShow: true,
			content: "数据加载中"
		}
	});

	//输入框
	vm_input = new Vue({
		el: '#input_list',
		data: {
			isShow: false,
			inputArray: [{
				callcol: "cname",
				title: "中文名",
				message: "",
				type: "text",
				maxlength: 25,
			}, {
				callcol: "ename",
				title: "英文名",
				message: "",
				type: "text",
				maxlength: 25,
			}, {
				callcol: "corptel",
				title: "单位联系方式",
				message: "",
				type: "tel",
				maxlength: 25,
			}]
		}
	});
	//皮肤选项
	vm_skin = new Vue({
		el: '#skin',
		data: {
			isShow: false,
			callcol: "skinid",
			skinId: 0
		}
	});
	//图片列表
	vm_image = new Vue({
		el: "#image_list",
		data: {
			isShow: false,
			imageArray: [{
				callcol: "logo",
				title: "logo",
				imageurl: "",
				showimage: false,
				id: "btn_logo",
				parid: "cell_logo",
				showupload: false,
				showlocalimage: false,
				fbase: "",
				fname: "",
				fsize: ""
			}, {
				callcol: "banner",
				title: "banner",
				imageurl: "",
				showimage: false,
				id: "btn_banner",
				parid: "cell_banner",
				showupload: false,
				showlocalimage: false,
				fbase: "",
				fname: "",
				fsize: ""
			}]
		}
	});
	//开关
	vm_switch = new Vue({
		el: '#switch_list',
		data: {
			isShow: false,
			switchArray: [{
				callcol: "stat",
				title: "网站是否启用",
				check: 0
			}, {
				callcol: "isreply",
				title: "整站文章是否允许回复",
				check: 0
			}, {
				callcol: "isnewchk",
				title: "是否允许文章先发后审",
				check: 0
			}, {
				callcol: "isnewreplychk",
				title: "是否允许回复先发后审",
				check: 0
			}, {
				callcol: "isfileup",
				title: "是否允许文章上传附件",
				check: 0
			}, {
				callcol: "isfiledown",
				title: "是否允许附件被下载",
				check: 0
			}, {
				callcol: "iswrite",
				title: "是否允许文章普通人员投稿",
				check: 0
			}, {
				callcol: "isass",
				title: "是否允许评论被评价",
				check: 0
			}]
		}
	});
}

/**
 * 初始化七牛上传控件
 */
function initQNUpLoader() {
	//console.log("initQNUpLoader:" + document.getElementById("btn_logo"));
	//console.log("initQNUpLoader:" + document.getElementById("btn_banner"));
	var logoOption = setQNOption(vm_image.imageArray[0].id, vm_image.imageArray[0].parid);
	logoUploader = Qiniu.uploader(logoOption);

	var Qiniu2 = new QiniuJsSDK();
	var banOption = setQNOption(vm_image.imageArray[1].id, vm_image.imageArray[1].parid);
	bannerUploader = Qiniu2.uploader(banOption);
}

/**
 * 设置七牛上传配置
 * @param {Object} browse_button
 * @param {Object} container
 */
function setQNOption(browse_button, container) {
	var qnUpOption = {
		disable_statistics_report: true, // 禁止自动发送上传统计信息到七牛，默认允许发送
		runtimes: 'html5,flash,html4', // 上传模式,依次退化
		browse_button: browse_button, // 上传选择的点选按钮，**必需**
		uptoken_func: function(file) { // 在需要获取 uptoken 时，该方法会被调用
			console.log("uptoken_func:" + JSON.stringify(file));
			uptokenData = null;
			uptokenData = getQNUpToken(file);
			console.log("获取uptoken回调:" + JSON.stringify(uptokenData));
			if(uptokenData && uptokenData.code) { //成功
				return uptokenData.data.Data[0].Token;
			} else {
				vm_loading.isShow = false;
				vm_loading.content = "数据加载中";
				logoUploader.stop();
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
		container: container, // 上传区域 DOM ID，默认是 browser_button 的父元素，
		max_file_size: '10mb', // 最大文件体积限制
		flash_swf_url: '../../js/lib/plupload/Moxie.swf', //引入 flash,相对路径
		max_retries: 0, // 上传失败最大重试次数
		dragdrop: false, // 开启可拖曳上传
		drop_element: vm_image.imageArray[0].parid, // 拖曳上传区域元素的 ID，拖曳文件或文件夹后可触发上传
		chunk_size: '4mb', // 分块上传时，每块的体积
		auto_start: false, // 选择文件后自动上传，若关闭需要自己绑定事件触发上传,
		filters: {
			mime_types: [ //只允许上传图片和zip文件
				{
					title: "Image files",
					extensions: "jpg,png"
				}
			]
		},
		init: {
			'FilesAdded': function(up, files) {
				plupload.each(files, function(file) {
					// 文件添加进队列后,处理相关的事情
					console.dir("FilesAdded:" + up.id);
					console.log("FilesAdded:" + JSON.stringify(file));
					var index = 0;
					if(up.id == bannerUploader.id) {
						index = 1;
					}
					vm_image.imageArray[index].showupload = true;
					vm_image.imageArray[index].fname = file.name;
					vm_image.imageArray[index].fsize = cloudutil.transformSize(file.origSize);
					vm_image.imageArray[index].fbase = "";
					//显示文件
					var preloader = new mOxie.Image();
					preloader.onload = function() {
						//preloader.downsize(550, 400);//先压缩一下要预览的图片,宽300，高300
						vm_image.imageArray[index].fbase = preloader.getAsDataURL(); //得到图片src,实质为一个base64编码的数据
						preloader.destroy();
						preloader = null;
					};
					preloader.load(file.getSource());
				});
			},
			'UploadProgress': function(up, file) {
				// 每个文件上传时,处理相关的事情
				console.log("UploadProgress:up:" + up.id);
				console.log("UploadProgress:file:" + JSON.stringify(file));
				vm_loading.content = "上传中 " + file.percent + "%";
			},
			'FileUploaded': function(up, file, info) {
				// 每个文件上传成功后,处理相关的事情
				console.log("FileUploaded:up:" + up.id);
				console.log("FileUploaded:file:" + JSON.stringify(file));
				console.log("FileUploaded:info:" + JSON.stringify(info));
				if(info.status == 200) {
					//成功
					var index = 0;
					if(up.id == bannerUploader.id) {
						index = 1;
					}
					vm_loading.content = "数据加载中";
					var data = {
						type: 3,
						index: index,
						callcol: vm_image.imageArray[index].callcol,
						colv: storageutil.QNPBDOMAIN + JSON.parse(info["response"]).key
					}
					changeWebsiteConfig(data);
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
				//上传出错时,处理相关的事情
				console.log("Error:" + up);
				console.log("Error:" + JSON.stringify(err));
				console.log("Error:" + errTip);
				vm_loading.isShow = false;
				vm_loading.content = "数据加载中";
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
				console.log("UploadComplete");
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

	return qnUpOption;
}

/**
 * 初始化数据
 */
function initData() {
	var webData = JSON.parse(storageutil.getSessionStorage(storageutil.WEBSITECONFIG));
	console.log("webData:" + JSON.stringify(webData));
	var getData = true; //获取网站配置
	if(webData && webData.open == 0) {
		webData.open = 1; //进入了网站配置页面
		storageutil.setSessionStorage(storageutil.WEBSITECONFIG, JSON.stringify(webData));
	} else if(webData && webData.open == 2) {
		if(webData.webCon) { //保存有本地数据
			if(webData.changeSkinId && webData.webCon.skinid != webData.changeSkinId) { //修改皮肤ID
				//修改皮肤id
				console.log("changeSkinId:" + webData.changeSkinId);
				getData = false;
				webConfig = webData.webCon;
				initWebsiteConfig(webData.webCon);
				var data = {
					type: 2,
					index: 0,
					callcol: "skinid",
					colv: webData.changeSkinId
				}
				changeWebsiteConfig(data);
			}
		}
	}
	console.log("getWebsitConfig:" + getData);
	if(getData) {
		getWebsitConfig(); //获取配置
		//-- - 假数据-- - start-- -
		//initWebsiteConfig(webConfig);
		//vm_loading.isShow = false;
		//-- - 假数据-- - end-- -
	}
}

/**
 * 获取网站配置信息
 */
function getWebsitConfig() {
	var tempData = {
		cmd: 'webcfg',
		type: 'find'
	}
	unitWebsitePro(tempData, function(data) {
		console.log('配置为:' + JSON.stringify(data));
		vm_loading.isShow = false;
		if(data.RspCode == 0) {
			if(data.RspData.length > 0) {
				webConfig = data.RspData[0];
				//setWebConSes(webConfig);
				initWebsiteConfig(webConfig);
			} else {
				weui.alert('没有获取到配置信息')
			}
		} else {
			weui.alert(data.RspTxt);
		}
	});
}

/**
 * 保存并显示网站配置
 */
function initWebsiteConfig(data) {
	console.log("initWebsiteConfig:" + JSON.stringify(data));
	//输入框
	vm_input.inputArray[0].message = data.cname;
	vm_input.inputArray[1].message = data.ename;
	vm_input.inputArray[2].message = data.corptel;
	//皮肤id
	//vm_skin.skinId = data.skinid;
	//图片
	vm_image.imageArray[0].imageurl = data.logourl;
	vm_image.imageArray[1].imageurl = data.bannerurl;
	//开关
	vm_switch.switchArray[0].check = data.stat;
	vm_switch.switchArray[1].check = data.isreply;
	vm_switch.switchArray[2].check = data.isnewchk;
	vm_switch.switchArray[3].check = data.isnewreplychk;
	vm_switch.switchArray[4].check = data.isfileup;
	vm_switch.switchArray[5].check = data.isfiledown;
	vm_switch.switchArray[6].check = data.iswrite;
	vm_switch.switchArray[7].check = data.isass;
	//显示列表
	showList();
}

/**
 * 保存网站配置临时数据
 * @param {Object} data
 */
function setWebConSes(data) {
	//将数据保存到本地
	var webData = {
		open: 2,
		webCon: data
	}
	storageutil.setSessionStorage(storageutil.WEBSITECONFIG, JSON.stringify(webData));
}

/**
 * 显示列表
 */
function showList() {
	vm_input.isShow = true;
	vm_skin.isShow = true;
	vm_image.isShow = true;
	vm_switch.isShow = true;
}

/**
 * 修改网站设置
 * @param {Object} change 修改的数据
 * @param {String} type 类型，0输入;1开关;2皮肤id;3图片
 * @param {String} index 第几个数据
 * @param {String} key 属性
 * @param {String} value 值
 */
function changeWebsiteConfig(change) {
	var commit = {
		cmd: 'webcfg',
		type: 'edit',
		callcol: change.callcol,
		colv: change.colv
	}
	console.log("changeWebsiteConfig:" + JSON.stringify(commit));
	unitWebsitePro(commit, function(data) {
		console.log('修改网站设置:' + JSON.stringify(data));
		if(data.RspCode == 0) { //成功
			if(change.type == 2) { //皮肤id
				vm_skin.skinId = commit.colv;
			}
			if(change.type == 3) { //图片
				vm_image.imageArray[change.index].imageurl = commit.colv;
				vm_image.imageArray[change.index].showupload = false;
				vm_image.imageArray[change.index].fname = "";
				vm_image.imageArray[change.index].fsize = "";
				vm_image.imageArray[change.index].fbase = "";
				delImage({
					appId: storageutil.QNQYWXKID,
					urls: [webConfig[commit.callcol]]
				});
			}
			vm_loading.isShow = false;
			weui.toast("操作成功");
			webConfig[commit.callcol] = commit.colv;
			//setWebConSes(webConfig);
		} else {
			if(change.type == 1) { //开关
				vm_switch.switchArray[change.index].check = !change.colv;
			}
			vm_loading.isShow = false;
			weui.alert("修改失败:" + data.RspTxt);
		}
	});
	//---假数据---start---
//	if(1) { //成功
//		if(change.type == 2) { //皮肤id
//			vm_skin.skinId = commit.colv;
//		}
//		if(change.type == 3) { //图片
//			vm_image.imageArray[change.index].imageurl = commit.colv;
//			vm_image.imageArray[change.index].showupload = false;
//			vm_image.imageArray[change.index].fname = "";
//			vm_image.imageArray[change.index].fsize = "";
//			vm_image.imageArray[change.index].fbase = "";
//			delImage({
//				appId: storageutil.QNQYWXKID,
//				urls: [webConfig[commit.callcol]]
//			});
//		}
//		vm_loading.isShow = false;
//		weui.toast("操作成功");
//		webConfig[commit.callcol] = commit.colv;
//		setWebConSes(webConfig);
//	} else {
//		if(change.type == 1) { //开关
//			vm_switch.switchArray[change.index].check = !change.colv;
//		}
//		weui.alert("修改失败:" + data.RspTxt);
//	}
	//---假数据---end---
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

/**
 * 删除七牛的文件
 * @param {Object} imagesData
 */
function delImage(imagesData) {
	cloudutil.delCloudFiles(imagesData, function(data) {
		return data;
	});
}