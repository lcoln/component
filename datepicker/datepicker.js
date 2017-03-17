/**
 * [日历组件]
 * @authors Lincoln (875482941@qq.com)
 * @date    2017-03-14 15:53:39
 *
 */

"use strict"

define(['avalon', 'css!./datepicker'],function(av){
    av.component('ms:datepicker', {
        $replace: true,
        $template: '<div>datepicker</div>'
    })

    av.scan()
    return av
})
