"use strict";
import express from 'express'
import * as FacebookService from '../service/FacebookService'

let FacebookRouter = express.Router()

FacebookRouter.route('/').get((req, res) => {
  res.send('<h1>Hello Facebook generate image service</h1>')
})

FacebookRouter.route('/testCanvas').get((req, res) => {
  FacebookService.testCanvas().then(canvas => {
    res.send('<img src="' + canvas + '" />')
  })
})

FacebookRouter.route('/getLatestComment/kmids').get((req, res) => {
  FacebookService.getLastestComment().then(canvas => {
    res.send('<img src="' +canvas+ '" />')
  })
})

// twitterRouter.route('/getFiveTopHashtagImage').get((req, res) => {
//   TwitterService.getFiveTopHashtagImage().then(canvas => {
//     let arrImage = new Array(canvas.length)
//     canvas.forEach((item, index) => {
//       arrImage[index] = item
//     })
//     res.send({images : arrImage})
//   })
// })

// twitterRouter.route('/testFiveTopHashtagImage').get((req, res) => {
//   TwitterService.getFiveTopHashtagImage().then(canvas => {
//     let str = ''
//     canvas.forEach(item => {
//       str = str + '<img src="' + item + '" />' + '<br/><br/>'
//     })
//     res.send(str)
//   })
// })

export default FacebookRouter
