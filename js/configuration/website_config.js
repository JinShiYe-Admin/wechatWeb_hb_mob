var webConfig; //网站配置的数据
//输入框
webConfig = {};
webConfig.cname = '中文名';
webConfig.ename = 'yingwenming';
webConfig.corptel = '110';
webConfig.stat = 0;
webConfig.isreply = 0;
webConfig.isnewchk = 0;
webConfig.isnewreplychk = 0;
webConfig.isfileup = 0;
webConfig.isfiledown = 0;
webConfig.iswrite = 0;
webConfig.isass = 0;
webConfig.skinid = 0;
var loading = document.getElementById("loading"); //等待框

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
					loading.style.display = "block";
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
					<a class="weui-cell weui-cell_access"  @click="onclick(value);">\
						<div class="weui-cell__bd">\
							<p>{{value}}</p>\
						</div>\
						<div class="weui-cell__ft"></div>\
					</a>\
				</div>',
	methods: {
		onclick: function(value) {
			console.log("skin " + value);
			utils.mOpenWithData("Skin.html", {
				skinid: value
			});
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
				loading.style.display = "block";
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
var vm_input = new Vue({
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
}); //输入框
var vm_skin = new Vue({
	el: '#skin',
	data: {
		isShow: false,
		callcol: "skinid",
		skinId: 0
	}
}); //皮肤选项
var vm_switch = new Vue({
	el: '#switch_list',
	data: {
		isShow: false,
		switchArray: [{
			callcol: "stat",
			title: "网站开启",
			check: 0
		}, {
			callcol: "isreply",
			title: "整站新闻允许回复",
			check: 0
		}, {
			callcol: "isnewchk",
			title: "允许新闻先发后审",
			check: 0
		}, {
			callcol: "isnewreplychk",
			title: "允许回复先发后审",
			check: 0
		}, {
			callcol: "isfileup",
			title: "允许新闻上传附件",
			check: 0
		}, {
			callcol: "isfiledown",
			title: "允许附件被下载",
			check: 0
		}, {
			callcol: "iswrite",
			title: "允许新闻普通人员投稿",
			check: 0
		}, {
			callcol: "isass",
			title: "允许评论被评价",
			check: 0
		}]
	}
}); //开关

window.onload = function() {
	initData();
	loading.style.display = "none";
	showList();
};

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
			getData = false;
			initWebsiteConfig(webData.webCon);
		}
	}
	console.log("getData:" + getData)
	if(getData) {
		getWebsitConfig();
		initWebsiteConfig(webConfig)
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
		loading.style.display = "none";
		weui.alert('配置为:' + JSON.stringify(data));
		if(data.RspCode == 0) {
			if(data.RspData.length > 0) {
				webConfig = data.RspData[0];

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
	//输入框
	vm_input.inputArray[0].message = data.cname;
	vm_input.inputArray[1].message = data.ename;
	vm_input.inputArray[2].message = data.corptel;
	//皮肤id
	vm_skin.skinId = data.skinid;
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
	//将数据保存到本地
	var webData = {
		open: 2,
		webCon: data
	}
	storageutil.setSessionStorage(storageutil.WEBSITECONFIG, JSON.stringify(webData))
}
/**
 * 显示列表
 */
function showList() {
	vm_input.isShow = true;
	vm_skin.isShow = true;
	vm_switch.isShow = true;
}

/**
 * 修改网站设置
 * @param {Object} change 修改的数据
 * @param {String} type 类型，0输入;1开关
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
	weui.alert("changeWebsiteConfig:" + JSON.stringify(commit));
	//loading.style.display = "none";
	unitWebsitePro(commit, function(data) {
		loading.style.display = "none";
		weui.alert('修改网站设置:' + JSON.stringify(data));
		if(data.RspCode == 0) {
			webConfig[commit.callcol] = commit.colv;

		} else {
			if(change.type == 1) { //开关
				vm_switch.switchArray[change.index].check = !change.colv;
			}
			weui.alert("修改失败:" + data.RspTxt);
		}
	});
}