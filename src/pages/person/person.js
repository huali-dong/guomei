require(["../../js/config/config"],function(){
    require(["jquery","template"],function($,template){
        $("#common-top").load("../template/common.html",function(){
            $("#common-top").html(template("gome-top"));
        })
    })
})