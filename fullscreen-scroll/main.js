/**
 *
 * @authors linteng (875482941@qq.com)
 * @date    2017-09-07 19:53:18
 */
'use strict'

var listen = function(el, ev, fn, capture){
    if(window.addEventListener){
        el.addEventListener(ev, fn, capture)
    }else if(window.attachEvent){
        el.attachEvent('on' + ev, fn, capture)
    }else{
        el['on' + ev] = fn
    }
}

var remove = function(el, ev, fn, capture){
    if(window.removeEventListener){
        el.removeEventListener(ev, fn, capture)
    }else if(window.attachEvent){
        el.attachEvent('on' + ev, fn, capture)
    }
}

function watch(obj, prop, cb){
    var oldVal = ''
    if(prop in obj){
        oldVal = obj[prop]
    }
    Object.defineProperty(obj, prop, {
        get: function(){
            return oldVal
        },
        set: function(newVal){
            oldVal = newVal
            cb && cb(newVal)
        }
    })
}

var scroll = function(parendId, childId, time){

}

scroll.prototype.curPage = 0
scroll.prototype.$el = function(parendId, childId, time){

    var parentDom = document.getElementById(parendId)
    parentDom.style.overflow = 'hidden'

    var childDom = parentDom.querySelectorAll('.' + childId)

    var container = document.createElement('section')
    var btnGroup = document.createElement('section')

    var span = document.createElement('span')
    var frag = document.createDocumentFragment()
    var transition = time.indexOf('s') < 0 ? time + 's' : time
    var _this = this
    for(var i = 0;i < childDom.length;i++){
        container.appendChild(childDom[i])
        var btn = span.cloneNode(false)
        btn.setAttribute('style', 'display: inline-block;width: 10px;height: 10px;border-radius: 100%;background: rgba(255,255,255,.6);transition: .4s;')
        if(i == 0)
            btn.style.background = '#f30'
        ;(function(i){
            listen(btn, 'click', function(){
                // console.log(i);
                _this.curPage = i
                _this.container.style.transform = 'translate(0px, ' + -_this.height * _this.curPage + 'px)'
            })
        })(i);
        frag.appendChild(btn)
    }
    btnGroup.appendChild(frag)

    container.style.width = '100%'
    container.style.height = '100%'
    container.style.transition = time.indexOf('s') < 0 ? time + 's' : time

    btnGroup.setAttribute('style', 'position: absolute;right: 10px;top: 50%;width: 10px;text-align: center;transform: translate(0, -50%);transition: '+ transition +' ')

    parentDom.style.position = 'relative'
    parentDom.innerHTML = ''
    parentDom.appendChild(container)
    parentDom.appendChild(btnGroup)
    return {parentDom: parentDom, childDom: childDom, container: container, btnGroup: btnGroup}
}
scroll.prototype.init = function(parendId, childId, time){

    var el = this.$el(parendId, childId, time)
    this.parentDom = el.parentDom
    this.childDom = el.childDom
    this.container = el.container
    this.btnGroup = el.btnGroup

    this.height = (window.getComputedStyle ? (window.getComputedStyle(this.parentDom).height).replace('px', '') : this.parentDom.offsetHeight) >> 0

    var mouseWheelEv = /Firefox/i.test(navigator.userAgent) ? "DOMMouseScroll": "mousewheel",
    direction = /Firefox/i.test(navigator.userAgent) ? "detail": "deltaY",
    now = Date.now()
    var _this = this
    listen(this.parentDom, mouseWheelEv, function(ev){
        if(Date.now() - now > 500){
            if(ev[direction] > 0){
                if(_this.curPage + 1 < _this.childDom.length){
                    _this.curPage++
                }else{
                    _this.curPage = 0
                }
            }else{
                if(_this.curPage - 1 >= 0){
                    _this.curPage--
                }else{
                    _this.curPage = _this.childDom.length - 1
                }

            }
            _this.container.style.transform = 'translate(0px, ' + -_this.height * _this.curPage + 'px)'
            now = Date.now()
        }
    })
}



window.fullPage = new scroll()
watch(fullPage, 'curPage', function(index){
    var span = fullPage.btnGroup.childNodes
    for(var i = 0;i < span.length;i++){
        if(i == index){
            span[index].style.background = '#f30'
        }else{
            span[i].style.background = 'rgba(255,255,255,.6)'
        }
    }

})
