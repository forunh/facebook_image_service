
"use strict";
import express from 'express'
import bodyParser from 'body-parser'
import FacebookRouter from './controller/FacebookController'
import cors from 'cors'
// import { Twitter } from './model/Twitter'


const port = process.env.port || 7771
let app = express()

app.use(cors())
// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

//parent url
app.route('/').get((req, res) => {
  res.send('<h1>Social REST Api</h1><ul><li>/twitter</li><li>/facebook</li></ul>')
})

app.use('/facebook', FacebookRouter)


//service start
app.listen(port, () => {
  console.log('Starting node.js on port ' + port)
});
