'use strict'

define(['avalon','../alert'],function(av){
	var global
	var index = 0
	var Index = av.define({
		$id: 'index',
		init: function(){
			setTimeout(function(){
				global = avalon.vmodels.alert
			},200)
		},
		alert: function(){
			index++
			global.alert("<div>" + index + "</div>",function(){
				av.log(1234)
			})
		},
		confirm: function(){
			global.confirm('<div>hello</div>',function(){
				av.log('yes')
			},function(){
				av.log('no')
			})
		},
		loading: function(){
			global.loading()
		},
		opts: {
			title: '提示'
		}
	})



	av.scan()
	Index.init()
})