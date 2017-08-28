var compress = (function(mod) {
	mod.comImg = function(imgUrl, maxSize) {
		maxSize = maxSize * 1024 * 1024;
		mod.getImgInfo(imgUrl, function(img, imgInfo) {
			console.log("获取的文件信息："+JSON.stringify(imgInfo));
			var newDataUrl = mod.getCanvasDataUrl(img, mod.getSuitableSize(imgInfo, maxSize));
			console.log("获取的图片Base64格式:"+newDataUrl);
			var blob = mod.base64ToBlob(newDataUrl);
			var formData = new FormData();
			formData.append('image', blob)
		})
	}
	mod.postFile = function() {
		jQuery.ajax({
				url: consts.UPLOADURL,
				type: "POST",
				cache: false,
				contentType: false,
				processData: false,
				data: formData
			})
			.done(function(e) {
				console.log(e);
				console.log(JSON.stringify(e.message));
			});
	}
	mod.getCanvasDataUrl = function(img, suitableSize) {
		var imageType = 'image/png',
			imageArgu = 0.7;
		var canvas = document.createElement('canvas');
		canvas.width = suitableSize.width;
		canvas.height = suitableSize.height;
		var ctx = canvas.getContext('2d');
		ctx.drawImage(img, 0, 0, suitableSize.width, suitableSize.height);
		return canvas.toDataURL(imageType, imageArgu);
	}
	mod.getSuitableSize = function(imgInfo, maxSize) {
		if(imgInfo.width * imgInfo.height > maxSize) {
			var multi = Math.ceil(imgInfo.width * imgInfo.height / maxSize);
			imgInfo.width = imgInfo.width / multi;
			imgInfo.height = imgInfo.height / multi;
		}
		return imgInfo;
	}
	mod.getImgInfo = function(imgUrl, callback) {
		var img = new Image();
		var imgInfo = {};
		img.onload = function() {
			console.log(img);
			imgInfo.width = img.natrueWidth;
			imgInfo.height = img.natrueHeight;
			callback(img, imgInfo);
		}
		img.src = imgUrl;
	}

	mod.base64ToBlob = function(base64Url, mime) {
		var base64 = base64Url.replace(/^data:image\/(png|jpg);base64,/, "");
		mime = mime || '';
		var sliceSize = 1024;
		var byteChars = window.atob(base64);
		var byteArrays = [];

		for(var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
			var slice = byteChars.slice(offset, offset + sliceSize);

			var byteNumbers = new Array(slice.length);
			for(var i = 0; i < slice.length; i++) {
				byteNumbers[i] = slice.charCodeAt(i);
			}

			var byteArray = new Uint8Array(byteNumbers);

			byteArrays.push(byteArray);
		}

		return new Blob(byteArrays, {
			type: mime
		});
	}
	return mod;
})(compress || {});