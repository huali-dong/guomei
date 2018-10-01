
define(["jquery"],function($){
    return {
        common : function(){
            //搜索框
        //函数节流，让代码在一定的时间内刷新一次，不用时时刻刻刷新
        let searchInput = $("#searchInput");
        let droplist = $("#droplist");
        function throttle(callbcak, delay, content) {
            var last = 0;
            return function () {
                var now = new Date().getTime();
                if (now - last > delay) {
                    callbcak.call(content);
                    last = new Date().getTime();
                }
            }
        };
        //绑定input事件，当输入框一改变就
        searchInput.on("input",throttle(function(){
            var _script = document.createElement("script");
            let $this = $(this).val();
            //console.log($this);
            _script.src =`https://apis.gome.com.cn/p/suggest?from=headSearch&module=searchSuggest&query=${$this}&jp=true&user=76957826679&callback=suggest&_=1536896268954`;//通过ajaxMapping写的地址
             document.body.appendChild(_script);
        },300,searchInput));
        
        //执行回调函数
        window.suggest = function (data) {
          // console.log(data);//获取的数据是一个二维数组
            let arr = new Set();
            //console.log(arr.length)
            data.forEach(function(item){
                arr.add(item[0]);//所需要的数据在数组的第一个位置
            })
            //console.log(arr);
            droplist.html("");
            arr.forEach(function (item) {//循环得到的数据，然后遍历到li标签上面
                let $li = $("<li>");//创建一个li
                $li.text(item);
                $($li).appendTo(droplist);
            })
            let s = Array.from(droplist.children());
           // console.log(s);
            s.forEach(function(item){
                item.addEventListener("click",function(){
                    console.log($(this).text())
                    searchInput.val($(this).text());
                    droplist.html("");
                })
            })
            droplist.show();
        }
        }
    }
})


