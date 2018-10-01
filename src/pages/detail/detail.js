require(["../../js/config/config"],function(){
    require(["jquery","common","template","cookie", "ChineseDistricts","distpicker","pages","magnify"],function($,com,template,cookie){

        com.common();//搜索框
        
       
        
        $("#empty").load("../template/common.html",function(){
            $("#gomeTop").html(template("gome-top"));
            $("#gomeHead").html(template("gome-head"));
            $("#gomeFoot").html(template("gome-foot"));
        })

       

       //右边导航栏动态数据和相似商品数据
       $.ajax({
        type :"get",
        url : "https://bigd.gome.com.cn/gome/rec?callback=callback&boxid=box82&pid=9140074135&cid=124407418736773848&uid=76987513076&area=65010100&brid=10007234&imagesize=130&c1id=cat31665542&c3id=cat10000070&shopid=&sid=1130551063&_=1536774335066",
        dataType :"jsonp",
        success: function(data){
            callback();
        }
    })
    
    window.callback = function(data){
        //pn:描述   gprice : 价格  iurl:图片地址
        //console.log($("#gome-everyday-list"));
        //console.log(data);
        let listarr = data.lst;
        //let list = listarr.slice(5,8);
        //console.log(listarr);
        let tmpstr = [];
        let showlist = [];
        //将模板页面加载进来放进一个空的标签里面
        $("#empty2").load('../template/detailTem.html',function(){
            //在Load里面加载数据,因为是异步函数,不能写在外面
            // list.forEach(function(item){
                tmpstr.push(template("product-right",{
                    list : listarr,
               }));
               showlist.push(template("detail-show",{
                   show:listarr,
               }))
        //    });
           //console.log(tmpstr);
            $("#detail-product-right-ul").html(tmpstr);//将模板加入到页面中
            $("#detail-shows").html(showlist);
        });
    }
   


    //左边浏览商品数据
    $.ajax({
        type:"get",
        url:"https://bigd.gome.com.cn/gome/rec?callback=cb&pid=A0006381473&size=12&boxid=box75&area=11010200&cid=125433263237146111&uid=77038889110&brid=300013341&shopid=80015519&c1id=cat10000000&c3id=cat10000158&sid=pop8010970797&imagesize=160&callbackparam=jsonpname_praisegoods&_=1537156056202",
        dataType: "jsonp",
        success :function(data){
            cb();
        }
    })
    window.cb = function(data){
        //console.log(data);
        let lists = data.lst;
        let listtmp = [];
        $("#pushul").load("../template/detailTem.html",function(){
            listtmp.push(template("pushlistTmp",{
                list:lists,
            }))
            $("#pushul").html(listtmp);
        })
        
        
    }

    //点击内容contain区域的事件


    //评论数据
    $.ajax({
        type:"get",
        url :"https://ss.gome.com.cn/item/v1/prdevajsonp/appraiseNew/9140031381/1/all/0/10/flag/appraise/all?callback=all&_=1537168489851",
        dataType : "jsonp",
        success :function(data){
            all();
        }
    })
    window.all = function(data){
        //console.log(data);
        let lists = data.evaList.Evalist;//拿到的是一个数组了
        //console.log(data.evaList.Evalist);
        //console.log(lists[0].post_time);
        //console.log(lists[0].appraiseElSum);
        //console.log(lists[0].loginname);
        var index = 5;
        var count = 0;
        $("#empty").load("../template/detailTem.html",function(){
             //开始的时候第一页要数据
             let tmp = [];
             tmp.push(template("commentList",{
                 list:lists,
             }));
             $("#comment").html(tmp);
 
           //评论分页
         $(".tcdPageCode").createPage({
            pageCount:100,
            current:1,
            backFn:function(){
               
                //评论数据判断
                var listnum = [];//存放数据每一页要显示的数据
                let tmplist = [];//存放模板数据
                if(index == 15){//index每一次要显示的下标数量，当等于最大值时，又要重新开始
                    count = 0;
                    index = 5;
                }
                for(var i =count;i<index;i++){
                    listnum.push(lists[i]);
                }
                index+=5;
                count+=5;
                tmplist.push(template("commentList",{
                    list:listnum,
                }));
                $("#comment").html(tmplist);
            }
        });
               

        })
    }
        


    //购物车模块数据获取
        $.ajax({
            type:"get",
            url :"https://bigd.gome.com.cn/gome/rec?callback=ca&boxid=box38&pid=A0006185017&area=11010200&cid=125433263237146111&uid=76957826679&imagesize=360&brid=97911769&shopid=80001110&c1id=cat18596269&c3id=cat15985843&sid=pop8009802422&_=1537235560564",
            dataType :"jsonp",
            success :function(data){
                ca();
            }
        })
        window.ca = function(data){
                var list = data.lst;
            //    var pids = JSON.parse(cookie.getCookie("pid"));
            var pids = localStorage.getItem("pid");
            // console.log(pids);
               var arr = [];
               list.forEach(function(item){
                   if(item.pid == pids){
                        arr.push(item);
                   }
               })
            //    console.log(arr);
                let lists = [];
                // cookie.setCookie("img",JSON.stringify(arr),3600*24,"/");
                $("#productLeft").load("../template/detailTem.html",function(){
                    lists.push(template("product-left",{
                        list: arr[0],
                    }));
                    $("#productLeft").append(lists);
                     //地址三级联动
                    $("#distpicker3").distpicker({
                        province: "浙江省",
                        city: "杭州市",
                        district: "西湖区"
                    });

                    //放大镜
                    // drag.drag($('#mask'),$("#pic-big"));
                    $(function() {
                        var magnifierConfig = {
                        magnifier : "#magnifier1",//最外层的大容器
                        width : 358,//承载容器宽
                        height : 358,//承载容器高
                        moveWidth : null,//如果设置了移动盒子的宽度，则不计算缩放比例
                        zoom : 5,//缩放比例
                        imgurl: arr[0].iurl
                    };
                var _magnifier = magnifier(magnifierConfig);
                
        /*magnifier的内置函数调用*/
        
            //设置magnifier函数的index属性
            // _magnifier.setIndex(1);
    
            //重新载入主图,根据magnifier函数的index属性
            console.log();
            _magnifier.eqImg();
        });     
        

        //相似商品跳转
        // $("body").on("click","#button",function(){
        //     $
        // })


        //点击对应加和减以及加入购物车
        $("#add").on("click",function(){
            var num = Number($("#text").val());
            num++;
            $("#text").val(num);
        });
        $("#dec").on("click",function(){
            var num = Number($("#text").val());
            num--;
            $("#text").val(num);
            if(num<=0){
                $("#text").val(0);
            }
        });
        $("body").on("click","#car",function(){
            var counts = $("#text").val();

            var goods = {
                count : counts,
                pid  : pids
            }

            //判断goods里面是否为空
            var g = localStorage.getItem("goods");
            console.log(typeof(g));
            console.log(g);
            var arr = []
            if(g == null || !g){
                // console.log("234");
            }else{
                var good = JSON.parse(g);
                good.forEach(function(item){
                    arr.push(item);
                })
                 
            }
             var isExit = arr.some(function(item){
                var  res = item.pid == goods.pid;
                if(res) item.count = Number(item.count)+Number(counts);
                return res;
             })
             if(!isExit){
                 arr.push(goods);
             }
            //  console.log(arr);
            localStorage.setItem("goods",JSON.stringify(arr));


           // console.log(count);
            // var list = cookie.getCookie("count");
            //点击的时候存取当前对应的商品到cookie,然后在购物车显示
            // var detaillist = cookie.getCookie("goods");
            // var pro = [];
            // if(detaillist==null){
            //     pro.push(datas[0]);
            // }else{
            //     var dd = JSON.parse(detaillist);
            //     var ss = $(this).parents(".detail-product-center").find("#pnnames").html();
            //     for(var i=0;i<dd.length;i++){
            //        if(dd[i].pn == ss){
            //             dd[i].count = list;
            //        }
            //     }
            //     dd.forEach(function(item){
            //         pro.push(item);
            //     })
            // }
            // var isExit = pro.some(function(item){
            //     var res = item.pn == datas[0].pn;
            //     return res;
            // });
            // if(!isExit){
            //     pro.push(datas[0]);
            // }
            // // console.log(pro);
            // cookie.setCookie("goods", JSON.stringify(pro),3600*24,"/");
            // if(list!=null){
            //     list = count;
            //     cookie.setCookie("count",list,3600*24,"/");
            // }else{
            //     cookie.setCookie("count",count,3600*24,"/");
            // }
           
        })
        





    });
                
        }




    })
})