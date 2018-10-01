require(["../../js/config/config"],function(){
    require(["jquery","template","common","cookie"],function($,template,com,cookie){
        //获取列表
        com.common();//搜索框
        
        $("#empty").load("../template/common.html",function(){
            $("#gomeNav").html(template("gome-nav"));
            $("#gomeTop").html(template("gome-top"));
            $("#gomeHead").html(template("gome-head"));
            $("#gomeFoot").html(template("gome-foot"));
        })

        $.ajax({
            type:"get",
            dataType:"jsonp",
            url :"https://bigd.gome.com.cn/gome/rec?callback=cb&boxid=box38&pid=A0006185017&area=11010200&cid=125433263237146111&uid=76957826679&imagesize=360&brid=97911769&shopid=80001110&c1id=cat18596269&c3id=cat15985843&sid=pop8009802422&_=1537235560564",
            success : function(data){
               cb(data);
            }
        })
        window.cb = function(data){
            console.log(data.lst);
            var product = data.lst;
            //将map集合存到cookie中，在商品详情页显示对应的物品
            let arr =[];
            $("#goodlistNav").load("../template/goodlist.html",function(){
                arr.push(template("goodslist",{
                    list:data.lst,
                }));
                //console.log(arr);
            $("#goodlistNav").append(arr);

            //点击对应的立即购买，跳转到相应的物品
            $("body").on("click","#btns",function(){
                    var pids = $(this).attr("pid");
                    // cookie.setCookie("pid",JSON.stringify(pids),3600*24,"/");
                    //将对应商品的pid存起来
                    localStorage.setItem("pid",pids);
            })
            })
        }

       
    })
})