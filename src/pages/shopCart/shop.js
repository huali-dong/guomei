require(["../../js/config/config"], function () {
    require(["jquery", "cookie", "template", "ChineseDistricts", "distpicker"], function ($, cookie, template) {

        $("#emptys").load("../template/common.html", function () {
            $("#gomeTops").html(template("gome-top"));
        })

        //地址三级联动
        $("#distpicker3").distpicker({
            province: "四川省",
            city: "绵阳市",
            district: "盐亭"
        });
        // var count = cookie.getCookie("count");
        // var good = (cookie.getCookie("goods"));
        // console.log(good);
        //console.log(count);

        $.ajax({
            type: "get",
            url: "https://bigd.gome.com.cn/gome/rec?callback=ca&boxid=box38&pid=A0006185017&area=11010200&cid=125433263237146111&uid=76957826679&imagesize=80&brid=97911769&shopid=80001110&c1id=cat18596269&c3id=cat15985843&sid=pop8009802422&_=1537235560564",
            dataType: "jsonp",
            success: function (data) {
                ca();
            }
        })
        window.ca = function (data) {
            var data = data.lst;
            $("#shopProduct").load("../template/shopCar.html", function () {
                //获得存储的商品的数量和pid
                var d = localStorage.getItem("goods");
                //因为下面点击删除按钮的时候会清空，就要先判断cookie里面有没有值
                // console.log(d);
                // console.log(typeof(d));//string类型
                // console.log(d.length);//里面的长度位2时位空
                if (!d || d.length == 2) {
                    //d是字符串类型
                    $("#mask").css({
                        display: "block"
                    });
                    // console.log(23);
                } else {
                    var lists = [];
                    var arr = [];
                    // console.log(datas,data);
                    var datas = JSON.parse(d);
                    var pr = []; //显示总的价格的
                    var count = []; //显示数量
                    for (var i = 0; i < datas.length; i++) {
                        data.forEach(function (item) { //必须写里面，不然顺序会出错
                            if (datas[i].pid == item.pid) {
                                arr.push(item);
                                count.push(datas[i].count);
                            }
                        })
                    }
                    arr.forEach(function (item, index) {
                        pr.push(Number(item.price) * Number(count[index]));
                    })
                    // console.log(arr);
                    //console.log(pr);
                    lists.push(template("shopCar", {
                        list: arr,
                        count: count,
                        price: pr
                    }));
                    $("#shopProduct").html(lists);

                    //增加按钮
                    $("body").on("click", "#add", function () {
                        var $that = $(this).parents(".msg").find("#dmoney"); //获取单价
                        var $xiaoji = $(this).parents(".msg").find("#xiaoji"); //获取小计价格
                        var $this = $(this).parents(".msg").find("#inp"); //获取input框里的数量
                        var checkthis = $(this).parents(".shop-product").find("#check3");//获取当前点击增加的按钮所对应的复选框
                        // console.log(checkthis);
                        // console.log(classinp);
                        var num = Number($this.val());
                        num += 1;
                        $this.val(num);
                        let countnum = $this.val();
                        //小计价格
                        //console.log($("#xiaoji").html());
                        var xiaojiprice = countnum * $that.html(); //小计价格,对应的商品的
                        $xiaoji.html(xiaojiprice);
                        var pid = $(this).parents("#addRed").attr("pid"); //点记得时候对应的商品的数量增加，要保存到cookie中
                        // console.log(pid);
                        datas.forEach(function (item) {
                            if (item.pid === pid) {
                                item.count++; //cookie中的count值也要变
                                // console.log(item);
                            }
                        })
                        // console.log(datas);
                        localStorage.setItem("goods", JSON.stringify(datas));
                        //总的价格和数量要变
                        var xiaojiclass1 = Array.from($(".xiaoji"));//获取每一个商品对应的价格
                        var classinp1 = Array.from($(".classinp")); //获得每一个商品对应的数量
                       
                        var xiaojimoney1 = 0;
                        var classinpcount1 = 0;
                        var numindex=[];
                            for(var i=0;i<check3.length;i++){
                                if(check3[i].checked == true){
                                     numindex.push(i);
                                }
                            }
                            for(var i=0;i<numindex.length;i++){
                               classinpcount1+=Number(classinp1[numindex[i]].value);
                                xiaojimoney1 +=Number(xiaojiclass1[numindex[i]].innerText)
                            }
                        if ($("#check1").prop("checked") || $("#check2").prop("checked") || $("#check4").prop("checked")) {
                                $("#countNum").html(classinpcount1);
                                $("#countMoney").html(xiaojimoney1);
                        }else if(numindex.length==0){
                            $("#countMoney").html("0");
                            $("#countNum").html("0");
                        }else{
                            $("#countNum").html(classinpcount1);
                            $("#countMoney").html(xiaojimoney1);
                        }

                        
                    });
                    //减少按钮
                    $("body").on("click", "#red", function () {
                        var $that = $(this).parents(".msg").find("#dmoney"); //获取单价
                        var $xiaoji = $(this).parents(".msg").find("#xiaoji"); //获取小计价格
                        var $this = $(this).parents(".msg").find("#inp"); //获取input框里的数量
                        var checkthis = $(this).parents(".shop-product").find("#check3");//获取当前点击增加的按钮所对应的复选框
                        var num = Number($this.val());
                        num -= 1;
                        $this.val(num);
                        if (num <= 1) {
                            $this.val(1);
                            // $("#countNum").html(0);
                        }
                        let countnum = $this.val();
                        //小计价格
                        //console.log($("#xiaoji").html());
                        var xiaojiprice = countnum * $that.html();//计算减少之后小计的价格
                        $xiaoji.html(xiaojiprice);
                        var check3 = Array.from($(".check3"));
                           
                        //总的价格和数量要变
                        var xiaojiclass1 = Array.from($(".xiaoji"));//获取每一个商品对应的价格
                        var classinp1 = Array.from($(".classinp")); //获得每一个商品对应的数量
                       
                        var xiaojimoney1 = 0;
                        var classinpcount1 = 0;
                        var numindex=[];
                            for(var i=0;i<check3.length;i++){
                                if(check3[i].checked == true){
                                     numindex.push(i);
                                }
                            }
                            for(var i=0;i<numindex.length;i++){
                               classinpcount1+=Number(classinp1[numindex[i]].value);
                                xiaojimoney1 +=Number(xiaojiclass1[numindex[i]].innerText)
                            }
                        if ($("#check1").prop("checked") || $("#check2").prop("checked") || $("#check4").prop("checked")) {
                            $("#countNum").html(classinpcount1);
                            if (num <= 1) {
                                $("#countNum").html(classinpcount1);
                            }
                            $("#countMoney").html(xiaojimoney1);

                        }else if(numindex.length==0){
                            $("#countMoney").html("0");
                            $("#countNum").html("0");
                        }else{
                            $("#countNum").html(classinpcount1);
                            $("#countMoney").html(xiaojimoney1);
                        }
                        
                        var pid = $(this).parents("#addRed").attr("pid");
                        //  console.log(pid);
                        datas.forEach(function (item) {
                            if (item.pid === pid) {
                                if(item.count<=1){

                                }else{
                                    item.count--;
                                }
                                //    console.log(item);
                            }
                        })
                        //   console.log(datas);
                        localStorage.setItem("goods", JSON.stringify(datas));
                    });

                    //删除按钮
                    $("body").on("click", "#dele", function () {
                        //点击移出这一商品对应的物品
                        // $("#shopProduct").html("");
                        //点击的时候cookie里面的值也要清空
                        var indexs;
                        var pnname = $(this).attr("piddele");
                        console.log(pnname);
                        //点击的时候记录下标，删除对应pid
                        for (var i = 0; i < datas.length; i++) {
                            if (pnname == datas[i].pid) {
                                indexs = i;
                            }
                        }
                        // console.log(indexs);
                        var splice3 = [];
                        datas.forEach(function (item, index) {
                            if (index != indexs) {
                                splice3.push(item);
                            }
                        })

                        console.log(splice3);
                        // cookie.setCookie("goods",JSON.stringify(splice3),3600*24,"/");
                        localStorage.setItem("goods", JSON.stringify(splice3));
                        $(this).parents(".shop-product").css({
                            display: "none"
                        });
                        //如果没有数据了就让下面的显示出来
                        if (splice3.length == 0) {
                            // console.log("23");
                            $("#mask").css({
                                display: "block"
                            });
                        }
                    });
                    // console.log($("#xiaoji").val());
                    //复选框/事件委托，绑定在父盒子身上，触发子盒子，$(this)指的是触发事件的子盒子
                    $("body").on("click", "input", function () {
                        //console.log($(this).attr("id"));
                        //获取属性值prop
                        //console.log($(this).prop("checked"));
                       //总的价格和数量要变
                    var xiaojiclass = Array.from($(".xiaoji"));//获取每一个商品对应的价格
                    var classinp = Array.from($(".classinp")); //获得每一个商品对应的数量
                    // console.log(xiaojiclass);
                    var arrxiaoji = [];
                    var arrcalssinp = [];
                    xiaojiclass.forEach(function (item) {
                        arrxiaoji.push(item.innerText);
                    })
                    classinp.forEach(function(item){
                        arrcalssinp.push(item.value);
                    })
                    // console.log(arrxiaoji);
                    // console.log(arrcalssinp);
                    var xiaojimoney = 0;
                    var classinpcount = 0;
                    arrxiaoji.forEach(function (item) {
                        xiaojimoney += Number(item);
                    })
                    arrcalssinp.forEach(function(item){
                        classinpcount+=Number(item);
                    })
                    // console.log(xiaojimoney);
                        if ($(this).attr("id") == "check1" || $(this).attr("id") == "check2" || $(this).attr("id") == "check4") { //点击全选
                            if ($(this).prop("checked")) {
                                $("input[type='checkbox']").prop("checked", true); //让全部的复选框都被选中
                                $("#countNum").html(classinpcount);
                                $("#countMoney").html(xiaojimoney);
                            } else {
                                $("input[type='checkbox']").prop("checked", false);
                                $("#countNum").html("0");
                                $("#countMoney").html("0");
                            }
                        }

                        //选择商品复选框
                        if ($(this).attr("id") == "check3") {
                            var check3 = Array.from($(".check3"));
                           
                        //总的价格和数量要变
                        var xiaojiclass1 = Array.from($(".xiaoji"));//获取每一个商品对应的价格
                        var classinp1 = Array.from($(".classinp")); //获得每一个商品对应的数量
                       
                        var xiaojimoney1 = 0;
                        var classinpcount1 = 0;
                        var numindex=[];
                            for(var i=0;i<check3.length;i++){
                                if(check3[i].checked == true){
                                     numindex.push(i);
                                }
                            }
                            for(var i=0;i<numindex.length;i++){
                               classinpcount1+=Number(classinp1[numindex[i]].value);
                                xiaojimoney1 +=Number(xiaojiclass1[numindex[i]].innerText)
                            }
                            if(numindex.length==check3.length){
                                $("input[type='checkbox']").prop("checked", true);
                                $("#countMoney").html(xiaojimoney1);
                                $("#countNum").html(classinpcount1);
                            }else if(numindex.length==0){
                                $("#check1").prop("checked",false);
                                $("#check2").prop("checked",false);
                                $("#check4").prop("checked",false);
                                $("#countMoney").html("0");
                                $("#countNum").html("0");
                            }else{
                                $("#check1").prop("checked",false);
                                $("#check2").prop("checked",false);
                                $("#check4").prop("checked",false);
                                $("#countMoney").html(xiaojimoney1);
                                $("#countNum").html(classinpcount1);
                            }
                            
                        }
                    })

                }
            })
        }

    })
})