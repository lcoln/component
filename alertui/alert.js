'use strict'

define(['avalon','css!./alertui'],function(av){
	var layer
	var offset

	av.component('ms:alert',{
		$replace: true,
		title: '',
		html: '',
		type: 4,
		layerId: '',
		$callback: {},
		yes: av.noop,
		close: av.noop,
		$template: '<div><div id="layer" class="do-ui-layer" ms-visible="type <= 2"><span class="do-ui-layer-title do-fn-noselect">{{title}}<a class="do-ui-layer-close iconfont" href="javascript:;" ms-click="close">✗</a></span><div class="do-ui-layer-content do-fn-noselect" id="layer-content" ms-html="html"></div><div class="do-ui-layer-group-btn do-fn-noselect" ms-visible="type == 2"><a href="javascript:;" class="do-ui-layer-btn do-ui-layer-yes" ms-click="yes">确定</a><a href="javascript:;" class="do-ui-layer-btn do-ui-layer-no" ms-click="close">取消</a></div></div><div class="do-ui-layer-shade" ms-visible="type <= 3"></div><div ms-visible="type == 3" class="do-ui-layer-loading"><span class="point point1"></span><span class="point point2"></span><span class="point point3"></span><span class="point point4"></span><span class="point point5"></span></div><div>',
		$construct: function(opts, config, other){
			var vm = av.mix(config, other)
			return av.mix(opts, vm)
		},
		$init: function(vm, ele){
			vm.alert = function(html,callback){
				vm.type = 1
				vm.html = html
				vm.$callback['no'] = callback ? callback : null
			}

			vm.confirm = function(html,yes,no){
				vm.type = 2
				vm.html = html
				vm.$callback['yes'] = yes ? yes : null
				vm.$callback['no'] = no ? no : null
			}

			vm.loading = function(callback){
				vm.type = 3
				vm.$callback.callback = callback
			}

			vm.close = function(ev){
				vm.html = ''
				if(vm.$callback['no']){
					vm.$callback['no']()
					delete vm.$callback['no']
				}
				vm.$callback = {}
				vm.type = 4
			}

			vm.yes = function(){
				vm.$callback['yes'] && vm.$callback['yes']()
				vm.$callback['yes'] = null
			}


			vm.$watch('type',function(t){
				if(t <= 2)
					getLayerPosition()
			})


			window.onresize = function(){
				getLayerPosition()
			}

			function getLayerPosition(){
				av.nextTick(function(){
					var vw,vh,x,y
					layer = document.getElementById('layer')
					if(vm.type <= 2){
						vw = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth
						vh = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight
						x = (vw - layer.offsetWidth) / 2
						y = (vh - layer.offsetHeight) / 2
					}
					layer.style.transform = 'translate(' + x + 'px,' + y + 'px)'
				})
			}


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

	document.addEventListener('mousedown',function(ev){
		if(ev.type != 'contextmenu'){
			layer = ev.target.offsetParent
			if(layer && /do-ui-layer-title/.test(ev.target.className)){
				offset = layer.style.transform.replace(/[^\d,.]/g,'').split(',')
				av(layer).data('ox',ev.pageX)
				av(layer).data('oy',ev.pageY)
				document.addEventListener('mousemove',move)
			}
		}
	})

	document.addEventListener('mouseup',function(){
		document.removeEventListener('mousemove',move)
		offset = layer = null
	})

	document.addEventListener('contextmenu',function(){
		document.removeEventListener('mousemove',move)
		offset = layer = null
	})

	av.scan()
	return av
})