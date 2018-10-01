require(["../../js/config/config"],function(){
    require(["jquery","cookie","template"],function($,cookie,template){
        
        $("#gomefoot").load("../template/common.html",function(){
            $("#gomefoot").html(template("gome-foot"));
        })
        //滑动验证
        $(function () {
            //拖动验证
            $(".inner").mousedown(function (e) {
                var dx, os = $(".inner").offset(), _differ = $(".outer").width() - $(".inner").width();
                $(document).mousemove(function (e) {
                    dx = e.pageX - os.left;
                    if (dx < 0) {
                        dx = 0;
                    } else if (dx > _differ) {
                        dx = _differ;
                    }
                    $(".filter-box").css('width', dx);
                    $(".inner").css("left", dx);
                });
                $(document).mouseup(function (e) {
                    $(document).off('mousemove');
                    $(document).off('mouseup');
                    dx = e.pageX - os.left;
                    if (dx < _differ) {
                         
                        SlideCheckFail();
                    } else if (dx >= _differ) { 
                        SlideCheckSuccess(_differ); 
                    }
        
                })
            })
            
            $("#button1").click(function () {
                SlideCheckFail();
            });
            
        });
        //初始验证
        function SlideCheckFail() {
            $(".outer").removeClass("act");
            $(".inner").css("left", 0);
            $(".inner").html("&gt;&gt;");
            $(".filter-box").css('width', 0);
            $(".outer>span").html("按住滑块，拖拽到最右边");
        
            $("#CaptchaID").val("0");
            $(".outer span").addClass("txtRoll");
        }
        //验证成功
        function SlideCheckSuccess(dx) {
            $(".outer").addClass("act");
            $(".outer>span").html("验证通过！");
            $(".inner").html('&radic;');
            $(".inner").css("left", dx);
            $(".filter-box").css('width', dx);
        
            $("#CaptchaID").val("1");
            $(".outer span").removeClass("txtRoll");
        }
       


        //表单验证：用户名判断
        $("#name").on("focus",function(){
            $("#tishi").css({display:"block"});
        })

        $("#name").on("blur",function(){

            $("#tishi").css({display:"none"});
            var cookies = cookie.getCookie("user");
            var arrcookie = JSON.parse(cookies);//得到数组
            var namelist = [];

            //得到里面的用户名
            if(arrcookie == null){

            }else{
                arrcookie.forEach(function(item){
                    namelist.push(item.name);
                });
            }
             
            // console.log(namelist);
            if($("#name").val() == ""){
                //console.log(23);
                $("#name").css({border:"1px solid red"});
                $("#tishi").html("请输入用户名").css({display:"block"});
            }else if(!(/\w{3,8}/.test($("#name").val()))){
                $("#tishi").html("你输入的用户名格式不正确").css({display:"block",color:"red"});
            }else if(namelist.indexOf($("#name").val())!=-1){
                $("#tishi").html("你输入的用户名已存在").css({display:"block",color:"red"});
            }
        })


        //密码判断
        $("#pwd").on("focus",function(){
            $("#mm").css({display:"block"});
        })
        $("#pwd").on("blur",function(){
            $("#mm").css({display:"none"});
        })
        //密码再次确认
        $("#resetpwd").on("focus",function(){
            $("#resetmm").css({display:"block"});
        })
        $("#resetpwd").on("blur",function(){
            if($("#resetpwd").val()!=$("#pwd").val()){
                $("#resetmm").css({display:"block",color:"red"}).html("您两次输入的密码不一致！");
            }else{
                $("#resetmm").css({display:"none"});
            }
            
        })
        //提交验证
       $("#button").on("click",function(){
          var name =  $("#name").val();
          var pwd =  $("#pwd").val();
          //var resetpwd =  $("#resetpwd").val();
           console.log($("#name").val());
           var obj ={
                "name" : name,
                "pwd"  : pwd,
           }

           var list = cookie.getCookie("user");//得到cookie
        //    console.log(list);
           if(list == null){//判断cookie里面是否有值
                var str = [];//如果没有放入，第一次放入就应该建立一个新数组
           }else{
               var str = JSON.parse(list);//不是第一次，就将得到的cookie转化为数组
           }
          str.push(obj);//将得到的数据放进数组
          
           if(($("#name").val()=="") || ($("#pwd").val()=="") || ($("#resetpwd").val()=="")){
                    alert("账号名或密码不能为空！")     
           
           }else if($("#tishi").css("display")=="block" || $("#resetmm").css("display")=="block"){
                alert("请检查您的用户名或密码");
           }else{
                $("#submit").submit();
                cookie.setCookie("user",JSON.stringify(str),3600*24,"/pages");//将用户名放入cookie中
           }
         
       }) 
       
        
    })
})