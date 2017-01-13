/**
 *
 * @authors Lincoln (lincolnwxj@gmail.com)
 * @date    2016-11-01 11:16:20
 * @version $Id$
 */

'use strict'

define(function(){
	var Uploader = function(){
		this.init()
	}
	return Uploader.prototype = {
		init: function(){
			return this.xhr = new XMLHttpRequest, this.form = new FormData, this.filed = {}, this.header = {}, this
		},
		setUrl: function(url){
			return url && typeof url == 'string' ? (this.url = url, this) : console.error('url不能为空切为字符串')
		},
		setField: function(param, val){
			if(typeof param == "object"){
				for(var k in param){
					this.filed[k] = param[k]
				}
			}else{
				this.filed[param] = val
			}
			return this
		},
		setHeader: function(param, val){
			if(typeof param == "object")
				for(var k in param) this.header[k] = param[k]
			else this.header[param] = val
			return this
		},
		start: function(){
			var _this = this
			if(!this.url)
				return console.error('请先设置上传的url')
			this.xhr.open("POST", this.url, true)
			for(var k in this.filed){
				//将数据传进form
				this.form.append(k, this.filed[k])
			}
			var startTime = Date.now()
			this.xhr.upload.addEventListener('progress',function(r){
				//lengthComputable: 是否有Content-length
				if (r.lengthComputable && Uploader.progress) {
                    var s = Date.now(),
                        i = 1e3 * r.loaded / 1024,
                        n = {
                            loaded: r.loaded,
                            time: s - t
                        };
                    n.speed = i / n.time, n.speed = n.speed < 10 ? Math.floor(1024 * n.speed) + " B/s" : n.speed.toFixed(2) + " KB/s", n.progress = Math.round(100 * r.loaded / r.total), Uploader.progress(n)
                }
			},true), this.xhr.onreadystatechange = function(){
				//readyState: 4表示传输数据完成。status: 200表示http状态码。responseText: 服务端返回的文本。
				if(_this.xhr.readyState === 4 && _this.xhr.status === 200 && _this.xhr.responseText !== ""){

				}else{
					if(_this.xhr.status != 200 && _this.xhr.responseText && _this.error)
						_this.error(_this.xhr.responseText)
				}
			},this.xhr.send(this.form)

		},
		onProgress: function(e){
			return this.progress = Uploader, this
		},
		onEnd: function(){
			return this.end = Uploader, this
		},
		onError: function(e){
			return this.error = Uploader, this
		}
	},window.Uploader || (window.Uploader = Uploader), Uploader
})