/**
 * 班级圈协议
 * 使用前必须先引入jQuery,PublicProtocol.js,storageutil.js
 */
var classCircleProtocol = (function(mod) {
	//模块
	mod.USERSPACE = "userSpace/";
	//公共参数，必传
	mod.PUBDATA = {
		uuid: "",
		appid: "",
		token: "",
		sign: ""
	}

	//1.（用户空间）获取用户针对某用户的空间列表
	mod.getUserSpacesByUserForPublisher = function(data, callback) {
		jQAjaxPost(storageutil.CLASSCIRCLEMAIN + mod.USERSPACE + "getUserSpacesByUserForPublisher", JSON.stringify($.extend(data, mod.PUBDATA)), callback);
	}

	//2.（用户空间）获取用户某条用户空间是否点赞
	mod.getIsLikeUserSpaceByUser = function(data, callback) {
		jQAjaxPost(storageutil.CLASSCIRCLEMAIN + mod.USERSPACE + "getIsLikeUserSpaceByUser", JSON.stringify($.extend(data, mod.PUBDATA)), callback);
	}

	//3.（用户空间）获取用户空间所有点赞用户
	mod.getIsLikeUsersById = function(data, callback) {
		jQAjaxPost(storageutil.CLASSCIRCLEMAIN + mod.USERSPACE + "getIsLikeUsersById", JSON.stringify($.extend(data, mod.PUBDATA)), callback);
	}

	//4.（用户空间）获取多用户空间列表
	mod.getUserSpacesByUser = function(data, callback) {
		jQAjaxPost(storageutil.CLASSCIRCLEMAIN + mod.USERSPACE + "getUserSpacesByUser", JSON.stringify($.extend(data, mod.PUBDATA)), callback);
	}

	//5.（用户空间）新增某用户空间信息
	mod.addUserSpace = function(data, callback) {
		jQAjaxPost(storageutil.CLASSCIRCLEMAIN + mod.USERSPACE + "addUserSpace", JSON.stringify($.extend(data, mod.PUBDATA)), callback);
	}

	//6.（用户空间）新增某用户某用户空间评论
	mod.addUserSpaceComment = function(data, callback) {
		jQAjaxPost(storageutil.CLASSCIRCLEMAIN + mod.USERSPACE + "addUserSpaceComment", JSON.stringify($.extend(data, mod.PUBDATA)), callback);
	}

	//7.（用户空间）新增某用户某用户空间评论回复
	mod.addUserSpaceCommentReply = function(data, callback) {
		jQAjaxPost(storageutil.CLASSCIRCLEMAIN + mod.USERSPACE + "addUserSpaceCommentReply", JSON.stringify($.extend(data, mod.PUBDATA)), callback);
	}

	//8.（用户空间）修改某用户针对某发布用户的空间阅读状态为已读
	mod.setUserSpaceReadByUser = function(data, callback) {
		jQAjaxPost(storageutil.CLASSCIRCLEMAIN + mod.USERSPACE + "setUserSpaceReadByUser", JSON.stringify($.extend(data, mod.PUBDATA)), callback);
	}

	//9.（用户空间）修改某用户某用户空间点赞状态为点赞
	mod.setUserSpaceLikeByUser = function(data, callback) {
		jQAjaxPost(storageutil.CLASSCIRCLEMAIN + mod.USERSPACE + "setUserSpaceLikeByUser", JSON.stringify($.extend(data, mod.PUBDATA)), callback);
	}

	//10.（用户空间）删除某用户空间
	mod.delUserSpaceById = function(data, callback) {
		jQAjaxPost(storageutil.CLASSCIRCLEMAIN + mod.USERSPACE + "delUserSpaceById", JSON.stringify($.extend(data, mod.PUBDATA)), callback);
	}

	//11.（用户空间）删除某条用户空间评论
	mod.delUserSpaceCommentById = function(data, callback) {
		jQAjaxPost(storageutil.CLASSCIRCLEMAIN + mod.USERSPACE + "delUserSpaceCommentById", JSON.stringify($.extend(data, mod.PUBDATA)), callback);
	}

	//12.（用户空间）获取与我相关
	mod.getAboutMe = function(data, callback) {
		jQAjaxPost(storageutil.CLASSCIRCLEMAIN + mod.USERSPACE + "getAboutMe", JSON.stringify($.extend(data, mod.PUBDATA)), callback);
	}

	//13.（用户空间）修改某用户评论、回复、留言状态为已读
	mod.setCommentMsgReadByUser = function(data, callback) {
		jQAjaxPost(storageutil.CLASSCIRCLEMAIN + mod.USERSPACE + "setCommentMsgReadByUser", JSON.stringify($.extend(data, mod.PUBDATA)), callback);
	}

	//14.（用户空间）新增用户空间
	mod.addNewUserSpaceInfo = function(data, callback) {
		jQAjaxPost(storageutil.CLASSCIRCLEMAIN + mod.USERSPACE + "addNewUserSpaceInfo", JSON.stringify($.extend(data, mod.PUBDATA)), callback);
	}

	//15.（用户空间）获取用户空间所有已读用户
	mod.getReadUserBySpaceId = function(data, callback) {
		jQAjaxPost(storageutil.CLASSCIRCLEMAIN + mod.USERSPACE + "getReadUserBySpaceId", JSON.stringify($.extend(data, mod.PUBDATA)), callback);
	}

	//16.（用户空间）删除某用户某用户空间点赞
	mod.delUserSpaceLikeByUser = function(data, callback) {
		jQAjaxPost(storageutil.CLASSCIRCLEMAIN + mod.USERSPACE + "delUserSpaceLikeByUser", JSON.stringify($.extend(data, mod.PUBDATA)), callback);
	}

	/**
	 * 17.（用户空间）获取多用户空间所有用户动态列表
	 * @param {Object} data
	 * @param {Object} callback
	 */
	mod.getAllUserSpacesByUser = function(data, callback) {
		jQAjaxPost(storageutil.CLASSCIRCLEMAIN + mod.USERSPACE + "getAllUserSpacesByUser", JSON.stringify($.extend(data, mod.PUBDATA)), callback);
	}

	//18.（用户空间）获取多班级多用户空间所有用户未读数
	mod.getNoReadCntForClassByUser = function(data, callback) {
		jQAjaxPost(storageutil.CLASSCIRCLEMAIN + mod.USERSPACE + "getNoReadCntForClassByUser", JSON.stringify($.extend(data, mod.PUBDATA)), callback);
	}

	//19.（用户空间）获取用户针对某条空间详情
	mod.getUserSpaceByUser = function(data, callback) {
		jQAjaxPost(storageutil.CLASSCIRCLEMAIN + mod.USERSPACE + "getUserSpaceByUser", JSON.stringify($.extend(data, mod.PUBDATA)), callback);
	}

	return mod;
})(window.classCircleProtocol || {});