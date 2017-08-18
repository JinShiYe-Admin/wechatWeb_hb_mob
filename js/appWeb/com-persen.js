Vue.component('com-persen', {
	props: ['chosePersen'],
	template: '<router-view v-bind:class="[{\"margin-bottom50\":chosePersen.length>0}]"></router-view>'+
	'<div v-if="chosePersen.length>0" v-bind:class="[\"weui-flex\"]" v-bind:style="{position: \"fixed\",bottom: 0,height:\"50px\",width: \"100%\"}">' +
	'<div v-bind:class="container-wrap weui-flex__item">'+
	'<div class="container">' +
	'<div v-for="person of chosePersen" style="display: inline-block;">' +
	'<p :style="{display: \"inline-block\"}">{{person.name}}</p>' +
	'</div>' +
	'</div>' +
	'</div>' +
	'<a v-bind:class="[\"weui-btn\",\"weui-btn_mini\",\"weui-btn_primary\"]" v-bind:style={width:"25%","margin-bottom": 10px}>确定({{chosePersen.length>99?' +
	'\"99+\":chosePersen.length}})</a>' +
	'</div>',
	data: function() {
		
		return {

		}
	},
	methods: {

	}
})