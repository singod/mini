!function(global){

	var op = Object.prototype,
		os = op.toString,
		ap = Array.prototype,
		as = ap.toString,
		moduleMap = {}, //保存定义模块
		noop = function(){},
		cfg; //保存基本设置

	/**
	 * 类型判断
	 * @return {Boolean}
	 */
	function isFunction(it){
		return os.call(it) === '[object Function]';
	}
	function isArray(it){
		return as.call(it) === '[object Array]';
	}
	/**
	 * 正向迭代一个数组，如果回调函数返回true就中断循环
	 * @param  {[type]}   arr [数组]
	 * @param  {Function} fn  [回调函数]
	 */
	function each(arr,fn){
		for(var i=0; i<arr.length-1; i++){
			if(fn(arr,i)){
				break;
			}
		}
	}

	/**
	 * 逆向迭代一个数组,如果回调函数返回true就中断循环
	 * @param  {[type]}   arr [数组]
	 * @param  {Function} fn  [回调函数]
	 */
	function eachReverse(arr,fn){
		for(var i=arr.length-1;i>-1;i--){
			if(fn(arr,i)){
				break;
			}
		}
	}

	/**
	 * 正向迭代一个对象,如果回调函数返回true就中断循环
	 * @param  {[type]}   obj [对象]
	 * @param  {Function} fn  [回调函数]
	 */
	function eachProp(obj,fn){
		for(var i in obj){
			//用hasOwnProPerty防止遍历obj继承的属性或方法
			if(obj.hasOwnProPerty(i)){
				if(fn(obj,i)){
					break;
				}
			}
		}
	}
	/**
	 * 数组化(将类数组转化为数组)
	 */
	function makeArray(mararr){
		var arr = [];
		for(var i=0; i<mararr.length; i++){
			arr[i] = mararr[i];
		}
		return arr;
	}

	/**
	 * 对象扩展(深浅拷贝)，支持数组
	 * @param  {[type]} target     [目标对象]
	 * @param  {[type]} source     [扩展的对象]
	 * @param  {[type]} deepstring [boolean类型,当=true时,进行深拷贝]
	 * @return {[type]}            [合并后的对象]
	 */
	function extend(target,source,deepstring){ 
		for(var key in source){
			//此判断条件来确定递归的出口和入口
			if(typeof source[key] === 'object' && deepstring){
				//深拷贝=遍历+递归
				extend(target[key],source[key],deepstring);
			}else{
				//浅拷贝=遍历
				target[key] = source[key];
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

	function getUrl(url){
		url = cfg.baseUrl + url;
		return url;
	}

	function loadJs(url,callback){
		var head = document.getElementsByTagName("head")[0];
		var node = document.createElement("script");
		node.type = "text/javascript";
		node.charset = "utf-8";
		node.async = true;
		node.src = getUrl(url);
		head.appendChild(node);

		if(callback){
			callback();
		}
	}

	/**
	 * 通过获取data-main的属性值，设置baseUrl和加载入口js文件
	 * @type {[type]}
	 */
	 (function(){
	 	var scripts = document.getElementsByTagName("script"),
	 		mainscript;

		each(scripts,function(script,i){
			mainscript = script[i].getAttribute('data-main');
			
			if(mainscript){
				//将路径保存于cfg.baseUrl中
				var src = mainscript.split("/");
				mainscript = src.pop();
				var subPath = src.length ? src.join("/") + "/" : "./";
				cfg.baseUrl = subPath;
				return true; //退出迭代
			}
		});

		loadJs(getUrl(mainscript));//加载入口js文件
	 })();

	 function use(name){
	 	var module = moduleMap[name];

	    if (!module.entity) {
	        var args = [];
	        for (var i=0; i<module.deps.length; i++) {
	            if (moduleMap[module.deps[i]].entity) {
	                args.push(moduleMap[module.deps[i]].entity);
	            }
	            else {
	                args.push(this.require(module.deps[i]));
	            }
	        }

	        module.entity = module.factory.apply(noop, args);
	    }
	    return module.entity;
	}
	global.require = function(list,factory){
		String(list).replace(/[^, ]/g,function(m){
			
		})
		
	}

	require.config = function(obj){
		if(obj.baseUrl){
			cfg.baseUrl = obj.baseUrl;
		}
	}

	global.define = function(name,deps,factory){
		var module = {
			name : name,
			deps : deps,
			factory : factory
		}
		moduleMap[name] = module;
	}

}(this);