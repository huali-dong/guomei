define([],function(){
	return {

		getCookie : function (key) {
			var cookiesstr = document.cookie;
			//json = {"key=value;key=value" }
			var list = cookiesstr.split("; ");
			for(var i in list) {
				var kv = list[i].split("=");
				if(kv[0] == key) return kv[1];
			}
			return null;
		},
		
		//expires 单位是秒
		setCookie : function (key, value, expires, path) {
			function _setCookie_p2(key, value) {
				_setCookie_p4(key, value, "" , "");
			}
			function _setCookie_p3_exp(key, value, expires) {
				_setCookie_p4(key, value, expires , "");
			}
			function _setCookie_p3_path(key, value, path) {
				_setCookie_p4(key, value, "", path);
			}
			function _setCookie_p4(key, value, expires, path) {
				document.cookie = key + "=" + value + (expires?";expires="+expires:"") + (path?";path="+path:"");
			}
			
			switch(arguments.length) {
				case 0 : 
				case 1 : throw new Error("参数传错了！！再来依次！！加油哦");
				case 2 :  {
					_setCookie_p2(key,value);
					break;
				}
				case 3 : {
					var param = arguments[2];
					if(typeof param == "number") {
						var d = new Date();
						d.setSeconds( d.getSeconds() + param );
						_setCookie_p3_exp(key, value, d) ;
						
					} else if(typeof param == "string") {
						_setCookie_p3_path(key, value, path);
					}
					break;
				}
				case 4 : {
					var d = new Date();
					d.setSeconds( d.getSeconds() + expires );
					_setCookie_p4(key, value, expires, path);
				}
			}
		}
		
	}
	
	
})
