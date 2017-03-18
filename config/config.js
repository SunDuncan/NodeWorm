/**
 * @Author: Duncan
 * @Date: 2017-3-18
 * @Function: 数据库的的一些基本配置
 */
 
var config = {
	app_name: 'nodejs单页面爬虫',
	app_version: '0.1.0',
	mysql: {
		host: '127.0.0.1',
		user: 'root',
		password: '',
		database: 'plant',
		connectionLimit: '100',
		supportBigNumber: true
	},
	wormUrl: 'http://www.drlmeng.com/'
}

module.exports = config;