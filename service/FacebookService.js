import cron from 'cron'
import axios from 'axios'
import Canvas from 'canvas'
import split from 'icu-wordsplit'

let cronJob = cron.CronJob
//สวัสดีครับ คุณธรรม ในใจต้องมาพร้อมกันนะครับ สวัสดีค่ะอร่อยจังเลย สวัสดีดี
//hi hello what is it yo hello hi very good wow amazing
var mockData = {
  "picture": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xap1/v/t1.0-1/p50x50/13307361_1699730896916160_4024021109681787383_n.jpg?oh=6813ae68341be6dc1611c97aa58e104b&oe=583D78A6&__gda__=1482093415_b95fc9c2e5accafd56daf207ab72fd4f",
  "name": "CE KMITL",
  "comment": "สวัสดีครับ คุณธรรม ในใจต้องมาพร้อมกันนะครับ สวัสดีค่ะอร่อยจังเลย สวัสดีดี",
  "created_time": "2016-08-24T12:46:03+0000"
}

// export function getFiveTopHashtagImage() {
//   return new Promise((resolve, reject) => {
//     axios.get('http://localhost:7774/twitter/getTopFiveHashtag')
//       .then(response => {
//         let data = response.data
//         let arrHashtag = new Array(data.length)
//         data.forEach((item, index) => {
//           generateImage(index, item, data.length).then(image => {
//             arrHashtag[index] = image
//           })
//         })
//         resolve(arrHashtag)
//       })
//       .catch(error => {
//         reject(error)
//       })
//   })
// }

// function generateImage(order, word, size) {
//   let Image = Canvas.Image
//   let canvas = new Canvas(400, 200)
//   let ctx = canvas.getContext('2d');
//   let fontSize = 10 * (size - order)

//   ctx.font = fontSize + 'px Arial';
//   ctx.fillText(word, 50, 100);

//   // var te = ctx.measureText(word);
//   // ctx.strokeStyle = 'rgba(0,0,0,0.5)';
//   // ctx.beginPath();
//   // ctx.stroke();
//   return new Promise(resolve => {
//     resolve(canvas.toDataURL())
// })
// }
export function getLastestComment(){

    return new Promise((resolve, reject) => {
    // axios.get('http://localhost:7775/facebook/getLatestComment/kmids')
    //   .then(response => {
          let data = mockData
          let date = new Date(data.created_time)
          let Image = Canvas.Image
          let canvas = new Canvas(400, 200)
          let ctx = canvas.getContext('2d')
          var img = new Image()
          // img.src = 'https://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png'          
          // img.onload = function() {
          //   ctx.drawImage(img, 0, 0);
          // };
          ctx.fillStyle="#f6f7f9"          
          ctx.fillRect(0,0,400,200)
          ctx.fillStyle="#3b5998"          
          ctx.fillRect(25,40,100,120)
          ctx.font = 'bold 20px Arial'
          ctx.fillStyle="#365899"
          ctx.fillText(data.name, 150, 50)
          ctx.font = '18px Arial'     
          ctx.fillStyle="#1d2129"     
          wrapText(ctx, data.comment, 150,80, 230, 20);
          ctx.font = '12px Arial'
          ctx.fillStyle="#90949c"                    
          ctx.fillText(date.toString().substring(0,24), 150, 170);

          // fs.readFile("test.jpg", function(err, squid){
          //     if (err) throw err;
          //     img = new Image;
          //     img.src = squid;
          //     ctx.drawImage(img, 0, 0, img.width / 4, img.height / 4);
          //     resolve(img.toDataURL())
          // });

          // var te = ctx.measureText('Awesome! สุดยอด');
          // ctx.strokeStyle = 'rgba(0,0,0,0.5)';
          // ctx.beginPath();
          // ctx.lineTo(50, 102);
          // ctx.lineTo(50 + te.width, 102);
          // ctx.stroke();
          resolve(canvas.toDataURL())

      // })
      // .catch(error => {
      //   reject(error)
      // })
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
     console.log('textCount '+textCount+" "+testLine)
     console.log('space[spaceIndex].length ' + space[spaceIndex].length+' '+space[spaceIndex])
     console.log('spaceCount ' + spaceCount) 
     console.log('out ' + out)              
     console.log('----- ')     
          
      if( spaceCount+space[spaceIndex].length-out ==textCount){
          spaceCount=textCount+1          
          textCount = 0
          testLine= testLine+" "
          spaceIndex=spaceIndex+1
          out = 0
      }
      var metrics = context.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, y)
        line = words[n]

        if(line.length == space[spaceIndex-1].length){
          line= line+" "
          spaceCount=line.length       
          
        }
        else{
          out = textCount-spaceCount-line.length
          spaceCount=0
          
        }
         
          console.log('line '+line.length+" "+line)
          console.log('space[spaceIndex].length ' + space[spaceIndex].length+' '+space[spaceIndex])
          console.log('spaceCount ' + spaceCount) 
          console.log('out ' + out)              
          console.log('----- ')   
    
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
