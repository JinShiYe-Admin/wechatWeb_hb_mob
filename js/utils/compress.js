var compress = (function(mod) {
	mod.comImg = function(imgUrl, maxSize) {
		maxSize = maxSize * 1024 * 1024;
		console.log("要处理的图片地址：" + imgUrl);
		mod.getImgInfo(imgUrl, function(img, imgInfo) {
			console.log("获取的文件信息：" + JSON.stringify(imgInfo));
			var newDataUrl = mod.getCanvasDataUrl(img, mod.getSuitableSize(imgInfo, maxSize));
			console.log("获取的图片Base64格式:" + newDataUrl);
			var blob = mod.base64ToBlob(newDataUrl);
			console.log('要传递的文件大小：'+blob.size);
			var formData = new FormData();
			formData.append('image', blob)
		})
	}
	mod.postFile = function() {
		alert("开始上传");
		jQuery.ajax({
			url: consts.UPLOADURL,
			type: "POST",
			cache: false,
			contentType: false,
			processData: false,
			data: formData
		}).done(function(e) {
			console.log(e);
			console.log(JSON.stringify(e.message));
		});
	}
	mod.getCanvasDataUrl = function(img, suitableSize) {
		console.log("*****重绘图片的宽高******");
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
		console.log("获取的图片要裁剪的尺寸：" + JSON.stringify(imgInfo));
		return imgInfo;
	}
	mod.getImgInfo = function(imgUrl, callback) {
		var img = new Image();
		var imgInfo = {};
		img.onload = function() {
			console.log(img);
			imgInfo.width = img.naturalWidth;
			imgInfo.height = img.naturalHeight;
			console.log("获取的图片宽高：" + JSON.stringify(imgInfo));
			callback(img, imgInfo);
		}
		img.setAttribute('crossOrigin', 'anonymous');
		img.src = imgUrl;
	}

	mod.base64ToBlob = function(base64Url, mime) {
		var base64 = base64Url.replace(/^data:image\/(png|jpg);base64,/, "");
		console.log("处理后的database64:" + base64);
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