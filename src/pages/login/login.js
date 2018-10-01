require(["../../js/config/config"],function(){
    require(["jquery","cookie","template"],function($,cookie,template){
        //console.log($("#name").val());

        $("#gomefoot").load("../template/common.html",function(){
            $("#gomefoot").html(template("gome-foot"));
        })


        var cookie = cookie.getCookie("user");//得到了cookie值,是一个json格式的字符串
        var cookiearr = JSON.parse(cookie);
       // console.log(typeof(cookie));
        //console.log(cookiearr);
        var user = [];//保存用户名
        var pwd = [];//保存密码
        if(cookiearr==null){
            alert("请先注册之后登陆")
        }else{
            cookiearr.forEach(function(item){
                user.push(item.name);
                pwd.push(item.pwd);
            })
        }
        
        
        //用户名验证
        $("#name").on("blur",function(){
            if(user.indexOf($(this).val())==-1){
                    $("#zh").css({display:"block"});
            }else{
                $("#zh").css({display:"none"});
            }
        })

        //密码验证
        $("#pwd").on("blur",function(){
            var name = $("#name").val();
            var index = user.indexOf(name);
            //console.log(pwd[index]);
            if($(this).val()!=pwd[index]){
                $("#pp").css({display:"block"});
            }else{
                $("#pp").css({display:"none"});
            }
        })


        //提交验证
        $("#btn").on("click",function(){
            if($("#name").val()=="" || $("#pwd").val()==""){
                alert("请输入用户名或密码");
            }else if( $("#zh").css("display")=="block" || $("#pp").css("display")=="block"){
                alert("请仔细检查你的用户名或密码")
            }else{
                $("#submit").submit();
            }
        })
    })
})