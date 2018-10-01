require(["js/config/config"], function () {
    require(["jquery","ajaxMapping" ,"template","common","carousel"], function ($,url,template,com) {
        //轮播图
        $('#carousel1').carousel({
            el: {
                imgsContainer: '.carousel', // 图片容器
                prevBtn: '.carousel-prev', // 上翻按钮
                nextBtn: '.carousel-next', // 下翻按钮
                indexContainer: '.carousel-index', // 下标容器
            },
            conf: {
                auto: true, //是否自动播放 true/false 默认:true
                needIndexNum: true, //是否需要下标数字 true/false 默认:true
                animateTiming: 1000, //动画时长(毫秒) 默认:1000
                autoTiming: 2000, //自动播放间隔时间(毫秒) 默认:3000
                direction: 'right', //自动播放方向 left/right 默认:right
            } 
        });

        com.common();

        $("#empty").load("pages/template/common.html",function(){
            $("#gomeNav").html(template("gome-nav"));
            $("#gomeTop").html(template("gome-top"));
            $("#gomeHead").html(template("gome-head"));
            $("#gomeFoot").html(template("gome-foot"));
            $("gomeHelp").html(template("gome-help"));
        })
        
        //console.log(template());
        //改变对应的背景颜色
        //  let $li =Array.from( $("#carousel1").find("li>img").parent());
        //   console.log($li);
        //   $li.forEach(function(item){
        //     console.log($(this.style.display));
        //     //   if($(this).style.display == "list-item"){

        //     //   }
        //   })

        //美日必抢  倒计时
        let $data = Array.from($(".data"));
        //console.log($data);
        let total = 7200;
        setInterval(function () {
            total--;
            let h = Math.floor(total / 3600);
            let m = Math.floor((total - h * 3600) / 60);
            let s = (total - h * 3600 - m * 60);
            $data[0].innerText = h;
            $data[1].innerText = m;
            $data[2].innerText = s;
        }, 1000);

        //美日必抢动态数据
        $.ajax({
            type :"get",
            url : "http://localhost:8080/proxy/bigd.gome.com.cn/gome/rec?callback=callback&boxid=box82&pid=9140074135&cid=124407418736773848&uid=76987513076&area=65010100&brid=10007234&imagesize=100&c1id=cat31665542&c3id=cat10000070&shopid=&sid=1130551063&_=1536774335066",
            // url : "https://bigd.gome.com.cn/gome/rec?callback=callback&boxid=box82&pid=9140074135&cid=124407418736773848&uid=76987513076&area=65010100&brid=10007234&imagesize=100&c1id=cat31665542&c3id=cat10000070&shopid=&sid=1130551063&_=1536774335066",
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
            let list = listarr.slice(0,4);
            //console.log(list);
            let tmpstr = [];
            //将模板页面加载进来放进一个空的标签里面
            $("#template").load('pages/template/indexTemplate.html',function(){
                //在Load里面加载数据,因为是异步函数,不能写在外面
                list.forEach(function(item){
                    tmpstr.push(template("gome-everyday-list",{
                        list : item,
                    }))
                });
               // console.log(tmpstr);
                $("#gome-every-box-left-bottom").append(tmpstr);//将模板加入到页面中
            });
        }


        //金融模板
        $.ajax({
            type :"get",
            url: "http://localhost:8080/json/pages/index.json",
            data: "json",
            success :function(data){
                let datalist = data[0];
                let datatmp = [];
                //console.log(datalist);
                $("#gome-finance-box-bottom").load('pages/template/indexTemplate.html',function(){
                    //在Load里面加载数据,因为是异步函数,不能写在外面
                        datatmp.push(template("gome-finance-bottom",{
                            list : datalist,
                        }))
                    $("#gome-finance-box-bottom").append(datatmp);//将模板加入到页面中
                })
            }
        })


        //楼层模板
        $.ajax({
            type : "get",
            url :"http://localhost:8080/json/pages/floor.json",
            //ajax请求，没有回调不需要指定类型
            success :function(data){
                let datalist = data;
                let datatmp = [];
                //console.log(datalist);
                $("#template").load('pages/template/indexTemplate.html',function(){
                    //在Load里面加载数据,因为是异步函数,不能写在外面
                   // console.log("23");
                        datatmp.push(template("gome-floors",{
                            list : datalist,
                        }))
                    $("#gome-floor").append(datatmp);//将模板加入到页面中
                    let carlist =Array.from( $(".carousel2"));
                    //console.log(carlist[0]);
                    carlist.forEach(function(item){
                        //用类名循环
                       // console.log(item);
                        $("."+item.className).carousel({
                            el : {
                                imgsContainer	: item.children[0], // 图片容器
                                prevBtn 		: item.children[2], // 上翻按钮
                                nextBtn 		: item.children[3], // 下翻按钮
                                indexContainer: item.children[1] // 下标容器
                            },conf : {
                                direction 		: 'left', //自动播放方向 left/right 默认:right
                                needIndexNum : false, //是否需要下标数字 true/false 默认:
                                autoTiming: 1000
                            }
                        });
                    })
                })
            }
        })

    })

})