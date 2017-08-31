var compress = (function(mod) {
	mod.uploadImg = function(file, maxSize, callback) {
		maxSize = maxSize * 1024 * 1024;
		console.log("要处理的图片地址：" + file.name);
		mod.getFileReader(file, maxSize, callback);
	}
	mod.getFileReader = function(file, maxSize, callback) {
		var reader = new FileReader();
		reader.onload = function() {
			var result = this.result;
			var formData = new FormData();
			mod.getImgInfo(result, function(img, imgInfo) {
				console.log("获取的文件信息：" + JSON.stringify(imgInfo));
				if(result.length > maxSize) {
					var newDataUrl = mod.getCanvasDataUrl(img, mod.getSuitableSize(imgInfo, maxSize));
					console.log("获取的图片Base64格式:" + newDataUrl);
					var blob = mod.base64ToBlob(newDataUrl, 'image/png');
					console.log("blob.type:" + blob.type);
					console.log('要传递的文件大小：' + blob.size);
					var newFile = new File([blob], Date.now() + '.png');
					formData.append('image', newFile)
				} else {
					formData.append('image', file);
				}
				mod.postFile(formData, callback);
			})
		}
		reader.readAsDataURL(file);
	}
	mod.postFile = function(formData, callback) {
		console.log("开始上传");
		jQuery.ajax({
				url: consts.UPLOADURL,
				type: "POST",
				cache: false,
				contentType: false,
				processData: false,
				data: formData,
				success: function(response) {
					console.log(response);
					callback(response);
				},
				error: function(errRes) {
					callback(errRes);
					console.log("发生未知错误：");
					console.log(errRes);
				}
			})
			.done(function(e) {
				console.log("已完成")
				console.log(e);
				console.log(JSON.stringify(e.message));
			})
			.fail(function() {
				console.log("failed!");
			})
			.always(function() {
				console.log("complete!");
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
		var multi = Math.ceil(imgInfo.width * imgInfo.height / maxSize);
		imgInfo.width = imgInfo.width / multi;
		imgInfo.height = imgInfo.height / multi;
		console.log("获取的图片要裁剪的尺寸：" + JSON.stringify(imgInfo));
		return imgInfo;
	}
	mod.getImgInfo = function(result, callback) {
		var img = new Image();
		var imgInfo = {};
		img.onload = function() {
			console.log(img);
			imgInfo.width = img.naturalWidth;
			imgInfo.height = img.naturalHeight;
			console.log("获取的图片宽高：" + JSON.stringify(imgInfo));
			callback(img, imgInfo);
		}
		img.src = result;
	}

	mod.base64ToBlob = function(base64Url, mime) {
		var base64 = base64Url.replace(/^data:image\/(png|jpg);base64,/, "");
		console.log("处理后的database64:" + base64);
		//		mime = mime || '';
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
		console.log("文件类型：" + mime);
		return new Blob(byteArrays, {
			type: mime
		});
	}
	return mod;
})(compress || {});