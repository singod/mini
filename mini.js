!function(global){
	var op = Object.prototype,
		os = op.toString,
		ap = Array.prototype,
		as = ap.toString,
		moduleMap = {};
	//类型判断
	function isFunction(it){
		return os.call(it) === '[object Function]';
	}
	function isArray(it){
		return as.call(it) === '[object Array]';
	}
	//数组化(将类数组转化为数组)
	function makeArray(mararr){
		var arr = [];
		for(var i=0; i<mararr.length; i++){
			arr[i] = mararr[i];
		}
		return arr;
	}
	//对象扩展(深浅拷贝)，支持数组
	function extend(target,source,deepstring){ 
		for(var key in source){
			if(typeof source[key] === 'object' && deepstring){
				extend(target[key],source[key],deepstring);//深拷贝=遍历+递归
			}else{
				target[key] = source[key];//浅拷贝=遍历
			}
		}
		return target;
	}
	function getCurrentScript(){
		var head = document.getElementsByTagName("head")[0];
		var scripts = head.getElementsByTagName("script");
		if(window.VBArray){
			for(var i=0; i<script.length; i++){
				if(scripts.readyState === "interactive"){
					break;
				}
			}
		}else{
			src = scripts[scripts.length - 1].src;
		}
		return src;
	}
	function loadJs(url,callback){
		var head = document.getElementsByTagName("head")[0];
		var node = document.createElement("script");
		node.src = url;
		head.insertBefore('node',head.firstChild);
	}
	window.require = function(list,factory){
		
	}
	window.define = function(name,deps,factory){
		var module = {
			name : name,
			deps : deps,
			factory : factory
		}
		moduleMap[name] = module;
		return module[name];
	}

}(this);

