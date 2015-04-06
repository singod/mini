var op = Object.prototype,
	os = op.toString,
	ap = Array.prototype,
	as = ap.toString;
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
