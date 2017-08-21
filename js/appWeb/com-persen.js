Vue.component('com-persen', {
	props: ['chosePersen'],
	template: '<div><router-view v-bind:class="[{\'margin-bottom50\':chosePersen.length>0}]"></router-view>' +
		'<div v-if="chosePersen.length>0" v-bind:class="[\'weui-flex\']" v-bind:style="{position: \'fixed\',bottom: 0,height:\'50px\',width: \'100%\'}">' +
		'<div v-bind:class="[\'container-wrap\',\'weui-flex__item\']">' +
		'<div v-bind:class="[container]">' +
		'<div v-for="person of chosePersen" v-bind:style="{display: \'inline-block\'}">' +
		'<p v-bind:style="{display: \'inline-block\'}">{{person.name}}</p>' +
		'</div>' +
		'</div>' +
		'</div>' +
		'<a v-bind:class="[\'weui-btn\',\'weui-btn_mini\',\'weui-btn_primary\']" v-bind:style="{width:\'25%\',\'margin-bottom\': \'10px\'}">确定({{chosePersen.length>99?' +
		'\"99+\":chosePersen.length}}) v-on:click="chosedPersen"</a>' +
		'</div></div>',
	watch: {
		'$route' (to, from) {
			// 对路由变化作出响应...
			console.log("@@@@@com-persen@@@@@路由变化" + this.$route.params.id);
		}
	},
	data: function() {
		return {

		}
	},
	methods: {
		chosedPersen: function() {
			this.routerToPub();
			console.log("@@@@@com-persen@@@@@传递已选择的人:" + JSON.stringify(this.chosePersen));
			this.emit('chosedPersen', this.chosePersen);
		},
		routerToPub: function() {
			console.log("@@@@@com-persen@@@@@导向发布页面");
			router.push({
				name: 'publish'
			})
		}
	}
})