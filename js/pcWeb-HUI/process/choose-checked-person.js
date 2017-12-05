Vue.component("choose-person", {
	template: "#person-list",
	props: {
		choosePerson: {//已选人员
			type: Object,
			default: function() {
				return {}
			}
		},
		allCheckPerson: {//所有已选人员
			type: Array,
			default: function() {
				return {}
			}
		}
	},
	mounted: function() {},
	data: function() {
		return {
			isAllCheck: false,
			personList: this.allCheckPerson,
			selectPerson: this.choosePerson
		}
	},
	watch: {
		/**
		 * 所有具有審核權限的人員
		 * @param {Object} newVal
		 * @param {Object} oldVal
		 */
		allCheckPerson: function(newVal, oldVal) {
			this.personList = newVal;
		},
		/**
		 * 选择人员
		 * @param {Object} newVal
		 * @param {Object} oldVal
		 */
		choosePerson: function(newVal, oldVal) {
			console.log("choosePerson新值:" + JSON.stringify(newVal));
			console.log("choosePerson旧值:" + JSON.stringify(oldVal));
			this.selectPerson = newVal;
		},
		/**
		 * 监听已选人员
		 * @param {Object} newVal
		 */
		selectPerson: function(newVal) {
			console.log("selectPerson的新值：" + JSON.stringify(this.selectPerson))
			this.setChooseStatus();
		}
	},
	methods: {
		/**
		 * 设置审核状态
		 */
		setChooseStatus: function() {
			console.log("****设置状态：setChooseStatus*****");
			var com = this;
			this.personList.forEach(function(person, index, personList) {
				Vue.set(personList[index], "isCheck", !!com.selectPerson[person.ApprMan])
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
		 * 选择或删除人员
		 * @param {Object} person
		 * @param {Object} index
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
		}
	}
})