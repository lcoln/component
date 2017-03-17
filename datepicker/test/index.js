/**
 * []
 * @authors Lincoln (875482941@qq.com)
 * @date    2017-03-14 15:54:54
 *
 */

"use strict"
define(['avalon','../datepicker'],function(av){
    var global
    var index = 0
    var Index = av.define({
        $id: 'index',
        init: function(){
            setTimeout(function(){
                global = av.vmodels.datepicker
            },200)
        },
        opts: {

        }
    })



    av.scan()
    Index.init()
})