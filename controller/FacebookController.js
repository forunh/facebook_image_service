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


export default FacebookRouter
