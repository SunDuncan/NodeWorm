/**
 * @Author: Duncan
 * @Time: 2017-03-18
 * @Function: 单页面爬虫的主页面，爬取文章的标题与url，存入数据库
 */

var http = require('http');
var cheerio = require('cheerio');
var config = require("./config/config");
var wormService = require('./service/wormservice');

var url = config.wormUrl;
function insertInfo(plants) {
	plants.forEach(function (item, index) {
		console.log((index + 1) + "、 " + item.Title + "   url = " + item.Url + "     time = " + item.Time);
	});

	wormService.insertWorm(plants, function (err, result) {
		
		if (err) {
			console.log(result);
			return;
		}

		console.log(result);
		return;
	})
}

function getChapterUrl(html) {
	var $ = cheerio.load(html);
	var chapters = $('.news-list');
	var plants = [];

	chapters.each(function (index, item) {
		var chapter = $(item).children('li');

		chapter.each(function (index, item) {
			var title = $(this).children('a');
			var time = $(item).children('span').text();
			var plant = {
				'Title': title.text(),
				'Url': title.attr('href'),
				'Time': time
			}
			plants.push(plant);
		})

	});

	return plants;
}

http.get(url, function (res) {
	var html = '';

	res.on('data', function (data) {
		html += data;
	});

	res.on('end', function () {
		var plants = getChapterUrl(html);
		insertInfo(plants);
	});


}).on('error', function () {
	console.log("获取出错");
});