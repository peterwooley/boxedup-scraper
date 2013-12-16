var request = require('request');
var cheerio = require('cheerio');

var URL = 'http://boxedup.com/';

var getPage = function(url, cb) {
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      $ = cheerio.load(body);
      cb($);
    } else {
      console.error("Response Code:", response.statusCode);
      console.error("Error:", error);
    }
  })
};

var getLists = function($) {
    return $("#user-lists img").map(function(i, el) {
      return $(this).attr('alt');
    });
};

var getItems = function($) {
  return $("#list-products > ol > li").map(function(i, el) {
    var item = {};
    $el = $(el);
    item.title = $el.find("h3").text();
    item.numberOne = !!$el.find(".product-number-one").length;
    item.description = $el.find(".description").text();
    item.image = $el.find(".photo").attr('src');
    item.price = $el.find(".price").text().replace(/\n/g, '');
    item.url = $el.find(".shop-now").attr('href');
    return item;
  });
}

module.exports = {
  getLists: function(username, cb) {
    getPage(URL + username, function($) {
      cb(getLists($));
    })
  },
  getItems: function(username, list, cb) {
    // TODO: Crawl pages for lists with more than 50 items
    getPage(URL + username + "/" + list + "?per_page=50", function($) {
      cb(getItems($));
    });
  }
}
