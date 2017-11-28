/* =======================================================================
 * jQuery.Huifold.js v2.0 鎶樺彔
 * http://www.h-ui.net/
 * Created & Modified by guojunhui
 * Date modified 2017.05.05
 *
 * Copyright 2017 鍖椾含棰栨澃鑱斿垱绉戞妧鏈夐檺鍏徃 All rights reserved.
 * Licensed under MIT license.
 * http://opensource.org/licenses/MIT
 * ========================================================================*/
! function($) {
	$.fn.Huifold = function(options) {
		var defaults = {
			titCell: '.item .Huifold-header',
			mainCell: '.item .Huifold-body',
			type: 1, //1	鍙墦寮€涓€涓紝鍙互鍏ㄩ儴鍏抽棴;2	蹇呴』鏈変竴涓墦寮€;3	鍙墦寮€澶氫釜
			trigger: 'click',
			className: "selected",
			speed: 'normal',
		}
		var options = $.extend(defaults, options);
		this.each(function() {
			var that = $(this);
			that.find(options.titCell).on(options.trigger, function() {
				if($(this).next().is(":visible")) {
					if(options.type == 2) {
						return false;
					} else {
						$(this).next().slideUp(options.speed).end().removeClass(options.className);
						if($(this).find("b")) {
							//							$(this).find("b").html("+");
							$(this).find("b").addClass("Hui-iconfont-arrow2-top");
							$(this).find("b").removeClass("Hui-iconfont-arrow2-bottom");
						}
					}
				} else {
					if(options.type == 3) {
						$(this).next().slideDown(options.speed).end().addClass(options.className);
						if($(this).find("b")) {
							//							$(this).find("b").html("-");
							$(this).find("b").removeClass("Hui-iconfont-arrow2-top");
							$(this).find("b").addClass("Hui-iconfont-arrow2-bottom");
						}
					} else {
						that.find(options.mainCell).slideUp(options.speed);
						that.find(options.titCell).removeClass(options.className);
						that.find("b").addClass("Hui-iconfont-arrow2-top");
						that.find("b").removeClass("Hui-iconfont-arrow2-bottom");
						if(that.find(options.titCell).find("b")) {
							//							that.find(options.titCell).find("b").html("+");
							$(this).find("b").addClass("Hui-iconfont-arrow2-top");
							$(this).find("b").removeClass("Hui-iconfont-arrow2-bottom");
						}
						$(this).next().slideDown(options.speed).end().addClass(options.className);
						if($(this).find("b")) {
							//							$(this).find("b").html("-");/**/
							$(this).find("b").removeClass("Hui-iconfont-arrow2-top");
							$(this).find("b").addClass("Hui-iconfont-arrow2-bottom");
						}
					}
				}
			});

		});
	}
}(window.jQuery);