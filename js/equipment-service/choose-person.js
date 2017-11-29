Vue.component("choose-person", {
	template: "#person-list",
	props: {
		choseDepart: {
			type: Object
		}
	},
	data: function() {
		return {
			isAllCheck: false,
			personList: []
		}
	},
	watch: {
		choseDepart: function(newVal, oldVal) {
			this.personList = [];
			this.isAllCheck = false;
			this.requireDepartPerson();
		}
	},
	methods: {
		requireDepartPerson: function() {
			var com = this;
			request.getDepartPersons(this.choseDepart, 1, 0, function(data) {
				com.personList = data;
			})
		},
		getTotalCheck: function(e) {
			//						this.isAllCheck=e.target.checked;
			console.log("isAllChecked" + this.isAllCheck)
			this.toggleAllCheck(this.isAllCheck)
		},
		toggleAllCheck: function(isCheck) {
			this.personList = this.personList.map(function(person) {
				person.isCheck = isCheck;
				return person;
			})
		},
		getPersonCheck: function(e, person) {
			person.isCheck = e.target.checked;
			console.log("isPersonChecked:" + person.name + ":" + person.isCheck)
			if(!person.isCheck) {
				this.isAllCheck = false;
			}
		}
	}
})