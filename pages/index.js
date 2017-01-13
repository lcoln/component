/**
 *
 * @authors Lincoln (875482941@qq.com)
 * @date    2017-01-12 14:08:20
 * @version $Id$
 */

'use strict'

define(['avalon'],function(av){
    var arr = []

    var Index = av.define({
        $id: 'index',
        arr: [],
        init: function(){
            for(var i = 0;i<88;i++){
                arr[i] = i
            }
            Index.arr = showData(arr, 1)
            require(['../pages/pages'],function(){

                var pages = av.vmodels['indexPages']
                pages.curr = 1
                pages.total = Math.ceil(arr.length / 10)
            })

        },
        pageOpts: {
            skin: 'green',
            // showGo: true,
            max: 5,
            callback: function(pid){
                Index.arr = showData(arr, pid)
            }
        }
    })

    function showData(list, curr){
        var start = (curr - 1) * 10
        var end = start + 10
        var data = []
        for(var i in list){
            if(i < start)
                continue
            if(i < end)
                data.push(list[i])
            else
                break
        }
        return data
    }


    Index.init()
    av.scan()
})