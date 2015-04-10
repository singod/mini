!function(global){

	var op = Object.prototype,
		os = op.toString,
		ap = Array.prototype,
		as = ap.toString,
		moduleMap = {};

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
	function script(){
		return document.getElementsByTagName("script");
	}
	/**
	 * 正向迭代一个数组，如果回调函数返回true就中断循环
	 * @param  {[type]}   arr [数组]
	 * @param  {Function} fn  [回调函数]
	 */
	function each(arr,fn){
		for(var i=0; i<arr.length-1; i++){
			if(fn(arr[i],i,arr)){
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
			if(fn(arr[i],i,arr)){
				break;
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

	function loadJs(url,callback){
		var head = document.getElementsByTagName("head")[0];
		var node = document.createElement("script");
		node.type = "text/javascript";
		node.src = url;
		head.appendChild(node);
		if(callback){
			callback();
		}
	}

	/**
	 * 通过获取data-main的属性值，加载入口js文件
	 * @type {[type]}
	 */
	var scriptss = document.getElementsByTagName("script");
	for(var i=0;i<scriptss.length; i++){
		var mainscript = scriptss[i].getAttribute('data-main');
		if(mainscript){
			var re = /.js/g;
			if(!re.test(mainscript)){
				mainscript += ".js";
			}
			loadJs(mainscript);
		}
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