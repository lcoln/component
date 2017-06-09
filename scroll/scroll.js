/**
 * [懒加载]
 * @authors Lincoln (875482941@qq.com)
 * @date    2017-06-07 15:31:25
 */

(function(_context){

    var clientHeight
    var bodyHeight
    var scrollTop

    var listen = (function(){
        if(window.addEventListener){
            return function(dom, event, func, capture){
                dom.addEventListener(event, function(e){
                    func.apply(dom, e)
                }, capture)
            }
        }else if(window.attachEvent){
            return function(dom, event, func, capture){
                dom.attachEvent("on" + event, function(e){
                    func.apply(dom, e)
                })
            }
        }
    })()

    var getUserAgent = function(){
        var useragent = ['Chrome', 'Firefox', 'MSIE']
        for(let i in useragent){
            if(navigator.userAgent.indexOf(useragent[i]) > -1)
                return useragent[i]
        }

        return false
    }

    var scroll = function(callback){
        listen(window, "scroll", throttle(scrollCallBack, callback, 500, 1000), false)
    }

    function throttle(func, callback, time, mustRun){
        var timeout = null,
            args = [].slice.call(arguments, 1),
            context = this

        return function() {

            clearTimeout(timeout);
            // 如果达到了规定的触发时间间隔，触发 handler
            func.apply(context, args);
        }
    }

    function scrollCallBack(callback){
        clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        if(getUserAgent() === 'Firefox')
            bodyHeight = document.documentElement.scrollHeight
        else
            bodyHeight = document.body.scrollHeight
        console.log(getUserAgent());
        scrollTop = document.body.scrollTop || document.documentElement.scrollTop
        if(scrollTop + clientHeight === bodyHeight){
            callback && callback()
        }
    }

    if(typeof require === 'function' && typeof module === 'object' && typeof exports === 'object')
        module.exports = scroll
    else
        _context.scroll = scroll

})(this)