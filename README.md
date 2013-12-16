Boxedup Scraper
===============

Scrape boxedup.com for a user's lists and the contents of those lists.

## Example Usage
To make a simple CLI scraper:
```js
var boxedup = require('boxedup');

var options = process.argv.slice(2);

if(options.length === 1) {
  boxedup.getLists(options[0], function(lists) {
    console.log(lists);
  });
} else {
  boxedup.getItems(options[0], options[1], function(items) {
    console.log(items);
  });
}
```

Get a users's list with:
```bash
node list.js peterwooley
[ 'Things I Want', 'Things I Have', 'Birthday', 'Christmas' ]
```

Get a list's contents with:
```bash
node list.js peterwooley christmas
[ { title: 'BeagleBone Black',
    numberOne: true,
    description: 'With a blistering 1GHz processor, 512MB onboard DDR3 RAM, built in 2GB storage with pre-installed...',
    image: undefined,
    price: '$45',
    url: 'http://www.adafruit.com/products/1278' },
...
```

