var plotly = require('plotly')('NuttyTrains', process.env.plotlyKey);
var fs = require('fs');
    
var data = [
    {
      x: [
        'AfD',
        'CDU/CSU',
        'DIE LINKE',
        'FDP',
        'GRÜNE',
        'SPD',
        'Other Parties'
      ],
      y: [20, 14, 23, 3, 3, 4, 5],
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
  
      var fileStream = fs.createWriteStream('1.png');
      imageStream.pipe(fileStream);
  });
