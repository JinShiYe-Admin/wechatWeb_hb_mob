Vue.component("com-publish", {
	template: '<div><textarea v-bind:rows=10 v-bind:style="{width:\'100%\'}"></textarea>' +
		'<div v-bind:class="[\'weui-cells\']">' +
		'<div v-bind:class="[\'weui-cell\',\'weui-cell_access\']" v-on:click="routeToPersen">' +
		'<div v-bind:class="[\'weui-cell__bd\']">' +
		'人员选择' +
		'</div>' +
		'<div v-bind:class="[\'weui-cell__ft\']" >' +
//		'{{chosePersen.length>99?"99+":"chosePersen.length"}}' +
		'</div>' +
		'</div>' +
		'</div>' +
		'<a v-bind:class="[\'weui-btn\', \'weui-btn_primary\']">发布</a></div>',
	data: function() {
		return {
			
		}
	},
	methods: {
		routeToPersen:function(){
			console.log("导向新路由");
			router.push({
				name:'persen',
				params:{
					id:'-1'
				}
			})
		}
	}
})