/**
 *
 * @authors Lincoln (lincolnwxj@gmail.com)
 * @date    2016-11-01 11:40:16
 * @version $Id$
 */

'use strict'

define(['avalon'],function(av){
	var file = null
	var $file = null
	var Index = av.define({
		$id: 'index',
		hasfile: false,
		uploadTip: '',
		chooseFile: function(){
			$file = document.getElementById('file')
			var ev = document.createEvent('MouseEvent')

			ev.initEvent('click', false, false)
			$file.dispatchEvent(ev)
		},
		fileChange: function(){
			file = this.files[0]
			if(!file)
				return false

			Index.hasfile = true
		},
		uploadFile: function(){
			if(!file || !Index.hasfile)
				return alert('请选择一个文件')
			Index.uploadTip = '&nbsp;上传中，请稍等...'
			require(['../uploader/upload'],function(v){
				var upload = new Uploader
				upload.setUrl('http://www.baidu.com')
					.setField('a', '1')
					.setField('b', '2')
					.start()
				upload.onEnd(function(json){
					av.log(12345)
				})
			})
		},
	})

	av.scan()
})