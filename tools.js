var Twit = require('twit')

var T = new Twit({
  consumer_key:      process.env.TWT_CK, 
  consumer_secret:      process.env.TWT_CS,
  access_token:         process.env.TWT_AT,
  access_token_secret:  process.env.ATS
})

var fs = require('fs');

module.exports = {

    tweetImage : function(tweet, fname){
    fs.readdir('./images/', function( err, files ) {
  
        const imagePath1 = './images/' + fname.toString(),
              b64content1 = fs.readFileSync( imagePath1, { encoding: 'base64' } );
  
        console.log( 'image', imagePath1 );
  
        T.post( 'media/upload', { media_data: b64content1 }, function ( err, data, response ) {
      data1 = data.media_id_string
          console.log('image uploaded')
  
           T.post( 'statuses/update', { status: tweet , media_ids: new Array( data1 ) },function( err, data, response) {
              if (err) {
                  console.log(err);
              } else {
                  console.log('image posted');
              }
            });
          });
  
    } );
  }
}