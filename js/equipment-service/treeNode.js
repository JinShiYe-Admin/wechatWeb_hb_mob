Vue.component("depart-tree-node", {
	props: ['departInfo'],
	template: '<ul>' +
		'<li v-for="person in departInfo.personList">' +
		'</li>' +
		'<li> v-for="depart in departInfo.departList">' +
		'<depart-tree-node v-bind:departInfo="depart" v-on:choosePseron="getPersons(persons)"></depart-tree-node>' +
		'</li>' +
		'</ul>',
	data: function() {
		return {
			choosePersons: []
		}
	},
	mounted: function() {

	},
	methods: function() {
		getPersons: function(persons) {
			this.choosePersons = this.choosePersons.concat(persons);
			this.$emit("choosePerson", this.choosePersons);
		}
	}
})