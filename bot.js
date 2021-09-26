    // NT Germany TIME
    
    const cheerio = require('cheerio');
    const puppeteer = require('puppeteer');
    var plotly = require('plotly')('NuttyTrains', process.env.plotlyKey);
    var fs = require('fs');
    const tools = require('./tools.js');
    
    const url = 'https://www.google.com/search?q=german+election+2021&client=opera&ei=RohQYbmyNtSX8gKpmLbIBg&oq=german+election+2021&gs_lcp=Cgdnd3Mtd2l6EAMyCwgAEIAEELEDEIMBMgsIABCABBCxAxCDATILCAAQgAQQsQMQgwEyBAgAEAMyCwgAEIAEELEDEIMBMgUIABCABDIECAAQAzIFCAAQgAQyBQgAEIAEMgUIABCABDoHCAAQRxCwAzoHCAAQsAMQQ0oECEEYAFCQC1i2EGC7EWgBcAJ4AIABYogBvwOSAQE1mAEAoAEByAEKwAEB&sclient=gws-wiz&ved=0ahUKEwi57a6b8ZzzAhXUi1wKHSmMDWkQ4dUDCA0&uact=5';
    
    var dataNames = [];


    setInterval( function() {
        puppeteer
        .launch()
        .then(browser => browser.newPage())
        .then(page => {
          return page.goto(url).then(function() {
            return page.content();
          });
        })
        .then(html => {
          const $ = cheerio.load(html);
          const candParties = [];
          $('table > tbody > tr > th > div > a > div > div').each(function() {
            candParties.push(
              $(this).text(),
            );
          });
          const results = [];
          $('table > tbody > tr > td > span > span').each(function() {
            results.push(
              parseInt($(this).text().replace('–', '0')),
            );
          });
          console.log(candParties);
          console.log(results);
          var parties = [];
          var exitpoll = [];
          for(var i = 1; i < candParties.length; i += 3) {  // take every second element
              parties.push(candParties[i].replace('Ü', 'U')); // it doesnt like the german Ü
          }
          parties.push('Other Parties')
          for(var i = 0; i < results.length; i += 3) {  // take every second element
              exitpoll.push(results[i]);
          }
          console.log(parties);
          console.log(exitpoll);
  
          // ------------------ CHART ---------------------
  
          var data = [
              {
                x: parties,
                y: exitpoll,
                name: 'German Election `21',
                type: "bar"
              }
            ];
            var figure = { 'data': data };
          
            var imgOpts = {
                format: 'png',
                width: 1000,
                height: 500
            };
            
            plotly.getImage(figure, imgOpts, function (error, imageStream) {
                if (error) return console.log (error);
            
                var fileStream = fs.createWriteStream('./images/1.png');
                imageStream.pipe(fileStream);
            });
            
            var tweet = `The votes have starting coming in! Let's see who will be shaking up the german political system!. #btw21 #GermanElection`;
            tools.tweetImage(tweet, '1.png')
      })
      .catch(console.error);
      
    }, 1000 * 60 * 60)
