'use strict'

define(['avalon', 'text!./layer.htm', 'css!./layer'],function(av, tpl){
	var layer
	var offset

	av.component('ui:layer',{
		$replace: true,
		title: '提示',
		html: '',
		type: 5,
		layerId: '',
		$callback: {},
		icon: '&#xe6af;',
		promptVal: '',
		yes: av.noop,
		close: av.noop,
		$onSuccess: av.noop,
		$template: tpl,
		$construct: function(opts, config, other){
			var vm = av.mix(config, other)
			return av.mix(opts, vm)
		},
		$init: function(vm, ele){
			vm.alert = function(html,opt){
				vm.type = 1
				vm.html = html
				vm.$callback['no'] = opt.callback ? opt.callback : av.noop
				vm.title = opt.title ? opt.title : '提示'
			}

			vm.confirm = function(html,opt){
				vm.type = 2
				vm.html = html
				vm.$callback['yes'] = opt.yes ? opt.yes : av.noop
				vm.$callback['no'] = opt.no ? opt.no : av.noop
				vm.title = opt.title ? opt.title : '提示'
			}

			vm.prompt = function(html, opt){
				vm.type = 3
				vm.html = html
				vm.$callback['yes'] = opt.yes ? opt.yes : av.noop
				vm.$callback['no'] = opt.no ? opt.no : av.noop
				vm.title = opt.title ? opt.title : '提示'
			}

			vm.loading = function(opt){
				vm.type = 4
				vm.$callback.callback = opt && opt.callback ? opt.callback : av.noop
			}

			vm.close = function(ev){
				vm.html = ''
				if(vm.$callback['no']){
					vm.$callback['no']()
					delete vm.$callback['no']
				}
				vm.$callback = {}
				vm.type = 5
			}

			vm.yes = function(){
				vm.$callback['yes'] && vm.$callback['yes']()
				vm.$callback['yes'] = av.noop
			}


			vm.$watch('type',function(t){
				if(t <= 3)
					getLayerPosition(vm)
			})


			window.onresize = function(){
				getLayerPosition(vm)
			}


		},
		$ready: function(vm){
			vm.$onSuccess(vm)
		}
	})

	function move(ev){
		if(ev.type != 'contextmenu'){
			var mx = ev.pageX - av(layer).data('ox')
			var my = ev.pageY - av(layer).data('oy')
			var curLeft = mx + (offset[0] >> 0)
			var curTop = my + (offset[1] >> 0)
			layer.style.transform = 'translate(' + curLeft + 'px,' + curTop + 'px)'
		}
	}

	function getLayerPosition(vm){
		av.nextTick(function(){
			var vw,vh,x,y
			layer = document.getElementById('layer')
			if(vm.type <= 3){
				vw = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth
				vh = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight
				x = (vw - layer.offsetWidth) / 2
				y = (vh - layer.offsetHeight) / 2
			}
			layer.style.transform = 'translate(' + x + 'px,' + y + 'px)'
		})
	}

	var listen = (function(dom, event, fn, capture){
		if(window.addEventListener){
			return function(){
				dom.addEventListener(event, function(ev){
					fn.call(dom, ev)
				}, capture)
			}
		}else if(window.attachEvent){
			return function(){
				dom.attachEvent('on' + event, function(ev){
					fn.call(dom, ev)
				})
			}
		}else{
			dom['on' + event] = fn
		}
	})()

	listen(document, 'mousedown',function(ev){
		if(ev.type != 'contextmenu'){
			layer = ev.target.offsetParent
			if(layer && /ui-layer-drag/.test(ev.target.className)){
				offset = layer.style.transform.replace(/[^\d,.]/g,'').split(',')
				av(layer).data('ox',ev.pageX)
				av(layer).data('oy',ev.pageY)
				document.addEventListener('mousemove',move)
			}
		}
	})

	listen(document, 'mouseup',function(){
		document.removeEventListener('mousemove',move)
		offset = layer = null
	})

	listen(document, 'contextmenu',function(){
		document.removeEventListener('mousemove',move)
		offset = layer = null
	})

	av.scan()
	return av
})