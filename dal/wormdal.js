/**
 * @Author: Duncan
 * @Time: 2017-03-18
 * @Function: 数据库的链接以及sql的执行
 */

var db_Worm = require('../db/db_worm'),
    moment = require('moment'); 
//插入的操作

exports.insertWorm = function (data, callback) {
	/**
	 * 数据库创建表的sql
	 * 
	 * create table url (ID int unsigned not null primary key auto_increment,
	 * Title varchar(200) not null,
	 * Url varchar(200) not null,
	 * InsertTime datetime not null
	 * )
	 */
	handleDisconnect(data, callback);
	//如果遇到数据库链接失败，10中自动重连
	function handleDisconnect(data, callback) {
		
		db_Worm.mysqlPool.getConnection(function (err, connection) {
			if (err) {
				console.log("数据库链接失败");
				return;
			}
			
			var insertTime = moment().format('YYYY-MM-DD HH:mm:ss');
			//插入接口
			var sql = "INSERT INTO url (Title,Url,InsertTime) VALUES ";
			var i = 0;//用来判断插入的数据是否是第一个
			for (var key in data) {
				if (i == 0) {
					sql += "( '" + data[key].title + "','" + data[key].url + "','" + insertTime + "')";
					i++;
				} else {

					sql += ", ('" + data[key].title + "','" + data[key].url + "','" + insertTime + "')";
				}
			}

			connection.query(sql, function (err, result) {
				connection.release();
				if (err) {
					callback(true, "插入数据的时候，sql语句出错.");
					return;
				}

				callback(false, "插入数据成功");
			});

			connection.on('error', function (err) {
				if (err.code === 'PROTOCOL_CONNECTION_LOST') {

					console.log("与数据库之间的链接被丢失");
					setTimeout(function () {
						handleDisconnect(data, callback);
					}, 10000);
				} else {
					throw err;
				}
			})
		})
	}
}