# 幻灯片组件文档

## 配置说明

```json
    {
        icon: '&#xe6a4;',       //弹窗的icon样式
        $onSuccess: function(vm){
            layer = vm
            layer.alert(html, opt)      //html:弹窗文本内容;opt: {title: String(弹窗提示)}
            layer.confirm(html, opt)      //html:弹窗文本内容;opt: {yes: function(点击确定时触发的事件), no: function(点击取消时触发的事件)}
            layer.loading(opt)      //html:弹窗文本内容;opt: {callback: function(回调)}
        }               //组件初始化完成后回调组件对象
    }

```


## 用法

```html
<div ms-controller="index">
    <ui:layer identifier="indexLayer" config="layerOpts"></ui:layer>
</div>

<!--  
其中config属性是指定分页组件的配置，会自动从上一层controller里找;
identifier属性可以设定组件的$id值，方便各模块之间进行通讯
-->
<!--  引入分页组件  -->
<script type="text/javascript" src="avalon.min.js"></script>
<script type="text/javascript">
    require(['avalon', '../layer/main'],function(av){

        var Index = av.define({
            $id: 'index',
            layerOpts: {
                icon: '&#xe6a4;',       //弹窗的icon样式
                $onSuccess: function(vm){
                    layer = vm
                    layer.alert(html, opt)      //html:弹窗文本内容;opt: {title: String(弹窗提示)}
                    layer.confirm(html, opt)      //html:弹窗文本内容;opt: {yes: function(点击确定时触发的事件), no: function(点击取消时触发的事件)}
                    layer.loading(opt)      //html:弹窗文本内容;opt: {callback: function(回调)}
                }
            }
        })

        av.scan()
    })


</script>
```
