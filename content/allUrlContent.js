/**
 * @Author: Duncan
 * @Time: 2017-3-25
 * @function: 爬取一个单页面的所有网址，以及网址所代表的标题,同时将他插入数据库
 */
 
/**
 * 数据封装的格式
 * {
 * 	title: ''
 * 	url:  ''
 * }
 */
var cheerio = require('cheerio'),
    moment = require('moment'),
    wormService = require('../service/wormservice');
    
exports.dealUrlData = function (data) {
  var pattern = /<a (.*?)>/g;
  var matches = data.match(pattern);
  var urlInfos = []; 
  
  //将所有匹配到的url遍历
  for (var i = 0; i < matches.length; ++i) {

		  var $ = cheerio.load(matches[i]);
		  var title = $('a').attr('title');
		  if (title) {
      var url = $('a').attr('href');
      var urlInfo = {
        title: title,
        url: url
      }
      urlInfos.push(urlInfo);
		  }
  }

  insertInfo(urlInfos);

}
  
//插入数据库中
function insertInfo(urlInfos) {
  
  urlInfos.forEach(function (item, index) {
      console.log("title = " + item.title);
      console.log("url = " + item.url);
      console.log("**********************");
		});
    
    //掉用service层
    wormService.insertWorm(urlInfos, function (err, result) {
		
		if (err) {
			console.log(result);
			return;
		}

		console.log(result);
		return;
	})
    
}
