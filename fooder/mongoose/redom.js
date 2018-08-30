var _ = require("underscore");

exports.randomstr = function(){
  //参看 http://www.jb51.net/article/50910.htm
	var str = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
	var result = "";
	for(var i = 0 ; i < 6 ; i++){
		result += str.charAt(_.random(0,str.length - 1));
	}
	return result;
}

