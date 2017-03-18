/**
 * @Author: Duncan
 * @Time: 2017-03-18
 * @Function： 插入爬虫的node服务
 */
 
var wormDAL = require('../dal/wormdal');

exports.insertWorm = function(data, callback) {
	if (data.length == 0) {
		return callback(true, "数据不能为空");
	}
	
	wormDAL.insertWorm(data, function(err, insertInfo) {
		if (err) {
			callback(true, insertInfo);
			return ;
		}
		
		callback(false, insertInfo);
		return ;
	});
} 