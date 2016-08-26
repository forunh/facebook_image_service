import cron from 'cron'
// import axios from 'axios'
import Canvas from 'canvas'
import split from 'icu-wordsplit'
var request = require('request').defaults({ encoding: null });


let cronJob = cron.CronJob

export function getLastestComment(url){

    return new Promise((resolve, reject) => {
    
    request.get(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let res = new Buffer(body).toString()
            
          let data = JSON.parse(res)
          let date = new Date(data.created_time)
          let Image = Canvas.Image
          let canvas = new Canvas(350, 180)
          let ctx = canvas.getContext('2d')
          
          ctx.fillStyle="#f6f7f9"          
          ctx.fillRect(0,0,350,200)
          ctx.fillStyle="#3b5998"          
          ctx.fillRect(15,30,20,20)
          ctx.font = 'bold 20px Arial'
          ctx.fillStyle="#365899"
          ctx.fillText(data.name, 90, 40)
          ctx.font = '16px Arial'     
          ctx.fillStyle="#1d2129"     
          wrapText(ctx, data.comment, 90,70, 230, 20);
          ctx.font = '12px Arial'
          ctx.fillStyle="#90949c"                    
          ctx.fillText(date.toString().substring(0,24), 90, 160);


          request.get(data.picture, function (error, response, body) {
              if (!error && response.statusCode == 200) {
                  data = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
                  
                  var image = new Image()
                  image.onload = function() {
                      ctx.drawImage(image, 15, 30)
                  }
                  image.src = data
                  // console.log(response);
                  resolve(canvas.toDataURL())
                  
              }
          })
        }
    })

  })
}

export function testCanvas() {
    let Image = Canvas.Image
    let canvas = new Canvas(400, 200)
    let ctx = canvas.getContext('2d');

    ctx.font = '30px Arial';
    ctx.fillText("Awesome! สุดยอด", 50, 100);

    var te = ctx.measureText('Awesome! สุดยอด');
    ctx.strokeStyle = 'rgba(0,0,0,0.5)';
    ctx.beginPath();
    ctx.lineTo(50, 102);
    ctx.lineTo(50 + te.width, 102);
    ctx.stroke();
    return new Promise(resolve => {
      resolve(canvas.toDataURL())
  })
}

function wrapText(context, text, x, y, maxWidth, lineHeight) {
  var words = split('th_TH',text)
  var space = text.split(" ")
  var line = '';
  var spaceIndex =0
  var spaceCount= 0
  var textCount =0
  var out =0

  for(var n = 0; n < words.length; n++) {
      var testLine = line + words[n]
      textCount = testLine.length
          var metrics = context.measureText(testLine);
      var testWidth = metrics.width;
      if( (spaceCount+space[spaceIndex].length-out ==textCount )&& (testWidth < maxWidth)){
          spaceCount=textCount+1          
          textCount = 0
          testLine= testLine+" "
          spaceIndex=spaceIndex+1
          out = 0
      }
      
      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, y)
        line = words[n]

        if(spaceIndex>0&&line.length == space[spaceIndex-1].length){
          line= line+" "
          spaceCount=line.length       
          
        }
        else{
          out = textCount-spaceCount-line.length
          spaceCount=0
          
        }
          
    
        if( spaceCount+space[spaceIndex].length-out == line.length){
            spaceCount=line.length+1          
            textCount = 0
            line= line+" "
            spaceIndex=spaceIndex+1
            out = 0
        }
        y += lineHeight
      }
      else {
        line = testLine  
        
      }
  }
  context.fillText(line, x, y);
}

//save tweets every 30 minutes
// let saveTweetJob = new cronJob('* */30 * * * *', () => {
//   getAllQuery().then(docs => {
//     docs.forEach(item => {
//       T.get('search/tweets', { q: item.query}, (err, data) => {
//         if(err) {
//           console.log(err.stack)
//         }
//         else {
//           saveTweet(data)
//         }
//       })
//     })
//   })
//   .catch((err) => {
//     console.log(err)
//   })
// },
// () => {
//   console.log('saveTweetJob has stopped')
// },
// true
// )
