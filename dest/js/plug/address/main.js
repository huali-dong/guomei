define(["jquery"],function(a){a(function(){"use strict";var b=a("#distpicker");b.distpicker({province:"\u798F\u5EFA\u7701",city:"\u53A6\u95E8\u5E02",district:"\u601D\u660E\u533A"}),a("#reset").click(function(){b.distpicker("reset")}),a("#reset-deep").click(function(){b.distpicker("reset",!0)}),a("#destroy").click(function(){b.distpicker("destroy")}),a("#distpicker1").distpicker(),a("#distpicker2").distpicker({province:"---- \u6240\u5728\u7701 ----",city:"---- \u6240\u5728\u5E02 ----",district:"---- \u6240\u5728\u533A ----"}),a("#distpicker3").distpicker({province:"\u6D59\u6C5F\u7701",city:"\u676D\u5DDE\u5E02",district:"\u897F\u6E56\u533A"}),a("#distpicker4").distpicker({placeholder:!1}),a("#distpicker5").distpicker({autoSelect:!1})})});