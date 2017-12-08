Vue.component("choose-person", {
	template: "#person-list",
	props: {
		//选择的部门
		choseDepart: {
			type: Object,
			default: function() {
				return {}
			}
		},
		//选择的人员
		choosePerson: {
			type: Object,
			default: function() {
				return {}
			}
		}
	},
	mounted: function() {
	},
	data: function() {
		return {
			personList: [],
			selectPerson: this.choosePerson
		}
	},
	watch: {
		/**
		 * 
		 * @param {Object} newVal
		 * @param {Object} oldVal
		 */
		choseDepart: function(newVal, oldVal) {
			this.personList = [];
			this.requireDepartPerson();
		},
		/**
		 * 选择
		 * @param {Object} newVal
		 * @param {Object} oldVal
		 */
		choosePerson: function(newVal, oldVal) {
			console.log("choosePerson新值:" + JSON.stringify(newVal));
			console.log("choosePerson旧值:" + JSON.stringify(oldVal));
			this.selectPerson = newVal;

		},
		/**
		 * 
		 * @param {Object} newVal
		 */
		selectPerson: function(newVal) {
			console.log("selectPerson的新值：" + JSON.stringify(this.selectPerson))
			this.setChooseStatus();
		}
	},
	methods: {
		/**
		 * 设置选中状态
		 */
		setChooseStatus: function() {
			console.log("****设置状态：setChooseStatus*****");
			var com = this;
			this.personList.forEach(function(person, index, personList) {
				Vue.set(personList[index], "isCheck", !!com.selectPerson[person.userid])
			})
			console.log("更改状态后的数据：" + JSON.stringify(com.personList));
		},
		/**
		 * 更新已选人员
		 */
		updateSelectPerson: function() {
			console.log("***updateSelectPerson***");
			this.$emit("select-person", this.selectPerson);
		},
		/**
		 * 
		 * @param {Object} person 人員
		 * @param {Object} index 人員index
		 */
		toggleChoosePerson: function(person, index) {
			console.log("toggleChoosePerson:" + JSON.stringify(person))
			Vue.set(this.personList[index], "isCheck", !person.isCheck);
			if(person.isCheck) {
				this.selectPerson[person.userid] = person.name;
			} else {
				delete this.selectPerson[person.userid];
			}
			this.updateSelectPerson();
		},
		/**
		 * 获取部门人员
		 */
		requireDepartPerson: function() {
			var com = this;
			request.getDepartPersons(this.choseDepart, 1, 0, function(data) {
				com.personList = data;
				com.setChooseStatus();
			})
		}
	}
})