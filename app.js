/**
 * @Author: Duncan
 * @Time: 2017-03-18
 * @Function: 单页面爬虫的主页面，爬取文章的标题与url，存入数据库
 */

var http = require('http');
var cheerio = require('cheerio');
var config = require("./config/config");
var wormService = require('./service/wormservice');
//爬取的地址
var url = config.wormUrl;
//获取页面的所有的<a>元素的属性
var urlInfo = require("./content/allUrlContent");

http.get(url, function (res) {
	var html = '';

	res.on('data', function (data) {
		html += data;
	});

	res.on('end', function () {
		
		urlInfo.dealUrlData(html);
	});


}).on('error', function () {
	console.log("获取出错");
});