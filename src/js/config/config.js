
// console.log("模块被加载了");

requirejs.config({
    baseUrl : "http://localhost:8080",//相对于服务器去找路径
    paths : {
        // "jquery" : "https://cdn.bootcss.com/jquery/3.3.0/jquery.min",
        "jquery" : "js/config/jquery-1.9.0",
        "carousel" : "/js/plug/carousel/carousel",
        "template" : "/js/template/template-web",
        "ajaxMapping" : "/js/config/ajaxMapping",
        "common" : "/js/common/common",
        "ChineseDistricts" : "js/plug/address/distpicker.data",
        "distpicker" : "js/plug/address/distpicker",
        "magnify" : "js/plug/magnify/magnifier",
        "cookie" : "js/plug/cookie/cookie",
        "pages" : "js/plug/pages/page"
    }
})