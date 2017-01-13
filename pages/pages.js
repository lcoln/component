/**
 *
 * @authors Lincoln (875482941@qq.com)
 * @date    2017-01-13 11:12:27
 * @version $Id$
 */

'use strict'

define(['avalon','css!../pages/pages'],function(av){
    av.component('ms:pages', {
        $replace: true,
        $template: '<div class="do-fn-cl do-fn-noselect ui-pages" ms-class="{{skin}}" ms-if="total > 1"><span ms-if="curr > 1" ms-click="jump(1)" class="first">首页</span><span ms-if="curr > 1" ms-click="jump(curr - 1)">«</span><span ms-if="curr - Math.floor(max /2) > 1 && total > max">...</span><span ms-repeat="pages" ms-click="jump(el)" ms-class="{active: curr == el}">{{el}}</span><span ms-if="total - curr > Math.floor(max /2) && total > max">...</span><span ms-if="curr < total" ms-click="jump(curr + 1)">»</span><span ms-if="curr < total" ms-click="jump(total)" class="last">未页</span><input type="text" ms-if="showGo" class="txt" ms-duplex="currIndex" /><span class="jump" href="javascript:;" ms-if="showGo" ms-click="jump(currIndex)">跳转</span><span class="msg" ms-if="msg">{{msg}}</span></div>',
        skin: 'blue',
        pages: [],
        total: '',
        curr: 1,
        currIndex: 1,
        max: 5,
        skin: 'blue',
        callback: av.noop,
        jump: av.noop,
        showGo: false,
        msg: '',
        $init: function(vm, ele){
            vm.jump = function(curr){
                if(curr >> 0 === vm.curr >> 0)
                    return

                if(!(curr >> 0 > 0))
                    vm.msg = '页码不符合格式'
                else if(curr > vm.total)
                    vm.msg = '页数不能超过' + vm.total + '页'

                if(vm.msg){
                    return setTimeout(function(){
                        vm.msg = ''
                    },1000)
                }
                vm.pages = calculate(vm, curr)
                vm.curr = curr
                vm.callback && vm.callback(curr)
            }
            vm.$watch('total',function(val, old){
                vm.pages = calculate(vm, 1)
            })
        }

    })

    function calculate(vm,curr){
        var dis = Math.floor(vm.max / 2)
        var start
        if(vm.total - curr < dis && vm.total >= vm.max)
            start = vm.total - (vm.max - 1)
        else if(curr - dis > 0 && vm.total >= vm.max)
            start = curr - dis
        else
            start = 1

        var end = start + (vm.max - 1) < vm.total ? start + (vm.max - 1) : vm.total
        var pages = []
        for(var i = 0,s = start,e = end;i<vm.max;i++,s++){
            if(s <= e)
                pages[i] = s
        }
        return pages
    }

    return av
})