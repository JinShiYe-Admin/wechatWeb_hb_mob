Vue.component("single-choose-person", {
	props: ['depart_id'],
	template: '.single-choose-person',
	watch: {
		'$route' (to, from) {
			console.log("当前的部门id:" + this.$route.params.id);
		}
	},
	data: function() {
		return {
			listData: []
		}
	},
	methods: {
		getAllListData: function() {
			console.log("*********getAllListData******");
			var com = this;
			com.isLoading = true;
			request.getDepartList(function(data) {
				console.log("getAllListData获取的部门列表：" + JSON.stringify(JSON.parse(data)));
				sessionStorage.setItem(consts.KEY_DEPARTS, data);
				com.getCurDeparts();
			});
		},
		/**
		 * 获取当前部门人员
		 */
		getCurDeparts: function() {
			console.log("*********getCurDeparts******");
			this.isLoading = true;
			var children = this.getLocalChildren();
			console.log("获取当前部门*****" + JSON.stringify(children));
			if(children && children.length > 0) {
//				this.setItemsStatus(children);
				this.listData = children;
				this.isLoading = false;
			} else {
				this.requestChildren();
			}
		},
		requestChildren: function() { //获取部门内部信息
			console.log("*********requestChildren获取本页列表数据******");
			var parentId = 0;
			if(this.depart_id === -1) {
				parentId = 1;
			} else {
				parentId = this.depart_id;
			}
			var list = JSON.parse(sessionStorage.getItem(consts.KEY_DEPARTS));
			console.log(list);
			var childDeparts = list.filter(function(el) {
				return el.parentvalue == parentId;
			});
			console.log("获取的当前部门的子部门:" + JSON.stringify(childDeparts));
//			this.getChildDepartsPersen(childDeparts);
		},
		getSingleDepartPersen: function(depart, departs) {
			console.log("********getSingleDepartPersen********");
			var mod = this;
			mod.getDepartPersen(depart, function(data) {
				mod.count++;
				depart.persen = data;
				console.log("当前的depart:" + JSON.stringify(depart));
				if(mod.count == departs.length) {
					console.log("获取的部门人员:" + JSON.stringify(departs));
					if(mod.allCount == departs.length && mod.count == departs.length) {
						//获取当前部门的人员
						mod.getCurPersen(departs);
						mod.allCount = 0;
						mod.count = 0;
					}
				}
			});
		},
		/**
		 * 获取部门所有人员 包括子部门
		 * @param {Object} departId
		 * @param {Function} callback 回调
		 */
		getDepartPersen: function(depart, callback) {
			console.log("********getDepartAllPersen********");
			request.getDepartPersons(depart, 0, 0, function(data) {
				console.log("递归获取的本部门人员:" + JSON.stringify(data));
				callback(data);
			})
		},
		/**
		 * 获取当前部门人员
		 */
		getCurPersen: function(departs) {
			console.log("********getCurPersen获取当前部门人员********");
			var com = this;
			var id;
			if(com.$route.params.id == -1) {
				id = 1
			} else {
				id = com.$route.params.id
			}
			request.getDepartPersons(com.$route.params.id, 0, 0, function(data) {
				console.log("获取的本部门人员:" + JSON.stringify(data));
				var children = data.concat(departs);
				com.setItemsStatus(children);
				com.listData = children;
				com.isLoading = false;
				com.setAsChildren();
			})
		},
		/**
		 * 列表cell
		 * @param {Object} item
		 */
		clickEvent: function(item) {
			console.log("********clickEvent********");
			if(item.value) {
				console.log("路由跳转")
				this.routerTo(item);
			} else {
				console.log("人员选择");
				this.choosePerson(item);
			}
		},
		/**
		 * 选择或取消选择人员的响应方法
		 * @param {Object} item
		 * @param {Object} event
		 */
		togglePerson: function(item, event) { //关注的人 选择
			console.log("********togglePerson人员选择********");
			var isAdd = event.target.checked;
			console.log("********关注的人事件传递********");
			this.$emit('togglePerson', [item], isAdd);
			this.changeSessionByPerson(item, isAdd);
			this.setItemsStatus(this.listData);
		},
		/**
		 * 
		 * @param {Object} person 选择或取消选择的信息
		 * @param {Object} isAdd 添加删除逻辑
		 */
		changeSessionByPerson: function(person, isAdd) { //
			console.log("********changeSessionByPerson人员选择后的响应********");
			var com = this;
			person.department.forEach(function(departId) {
				com.togglePersonInDepart(departId, person, isAdd);
				if(!isAdd) { //如果是刪除 刪除其所在所有部门的选择状态
					events.toggleValueInSessionArray(consts.KEY_CHOOSE_DEPARTS, departId, isAdd);
				}
			});
		},
		togglePersonInDepart: function(departId, person, isAdd) {
			console.log("********togglePersonInDepart相关部门内数据的存取********");
			var personArr = events.toggleValueInArray(events.getSessionMapValue(consts.KEY_CHOSE_MAP, departId), person.userid, isAdd);
			events.setSesionMapValue(consts.KEY_CHOSE_MAP, departId, personArr);
			console.log("保存的map数据:" + JSON.stringify(events.getSessionMap(consts.KEY_CHOSE_MAP)));
		},


		/**
		 * 获取所有的子部门
		 * 包括递归的子部门
		 */
		getAllChildDeparts: function(departId) {
			console.log("********getAllChildDeparts 递归获取所有子部门********");
			var allDeparts = events.getSessionArray(consts.KEY_DEPARTS);
			var childDeparts = allDeparts.filter(function(depart) {
				return depart.parentvalue === departId;
			});
			if(childDeparts.length > 0) {
				for(var i in childDeparts) {
					childDeparts = childDeparts.concat(this.getAllChildDeparts(childDeparts[i].value));
				}
			}
			console.log("departId为:" + departId + "的获取的所有子部门" + JSON.stringify(childDeparts));
			return childDeparts;
		},
		setAsChildren: function() { //将列表数据设置为副部门的children
			console.log("********setAsChildren将子部门数据保存至本地数组中********");
			var parentId = this.$route.params.id;
			if(parentId === 1) {
				parentId = -1;
			}
			var departList = events.getSessionArray(consts.KEY_DEPARTS);
			departList[this.getDepartIndex(parentId)].children = this.listData;
			console.log("要保存至本地的列表数据：" + JSON.stringify(departList));
			//将修改后的数据保存到本地储存列表
			sessionStorage.setItem(consts.KEY_DEPARTS, JSON.stringify(departList));
		},
		getDepartIndex: function() { //获取部门再部门列表中的序号
			console.log("********getDepartIndex获取部门在部门列表中的序号********");
			var id = this.$route.params.id;
			var com = this;
			var departList = JSON.parse(sessionStorage.getItem(consts.KEY_DEPARTS));
			for(var i in departList) {
				if(departList[i].value == id) {
					return i;
				}
			}
		},
		getLocalChildren: function() { //获取本地的子项
			console.log("********getLocalChildren获取保存至本地的本部门子部门和人員********");
			var id = this.$route.params.id;
			var departList = events.getSessionArray(consts.KEY_DEPARTS);

			var departs = departList.filter(function(depart) {
				return depart.value == id;
			});
			if(departs && departs.length > 0) {
				return departs[0].children
			} else {
				return [];
			}
		},
		//通过部门id 更新界面
		routerTo: function(item) {
			console.log("********routerTo路由跳转********");
			router.push('/persen/choose-person/' + item.value);
		},

	}
})