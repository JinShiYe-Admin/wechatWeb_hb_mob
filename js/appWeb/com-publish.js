Vue.component("com-publish", {
	props: ['chosePersen'],
	template: '<div><textarea v-bind:rows="10" ></textarea>' +
		'<div >' +
		'<div >' +
		'<div >' +
		'人员选择' +
		'</div>' +
		'<div >' +
//		'{{chosePersen.length>99?"99+":"chosePersen.length"}}' +
		'</div>' +
		'</div>' +
		'</div>' +
		'<a >发布</a></div>',
	data: function() {
		return {

		}
	},
	methods: {

	}
})