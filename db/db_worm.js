/**
 * @Author: Duncan
 * @Date: 2017-3-18
 * @function: 选择数据库
 */
 
 var mysql = require('mysql');
 var config = require('../config/config');
 
 //定义一个pool池
 var dbWormPool = mysql.createPool(config.mysql);
 
 exports.mysqlPool = dbWormPool;