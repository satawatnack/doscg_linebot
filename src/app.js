const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const perf = require('execution-time')()
const app = express()
const port = process.env.PORT || 4000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('/webhook', async (req, res) => {
    const reply_token = req.body.events[0].replyToken
    const timeCheck = await reply(reply_token)
    if(timeCheck > 10000) notify('Line Bot can not answer a question to the customer more than 10 second')
    res.sendStatus(200)
})
app.listen(port)
async function reply(reply_token) {
    perf.start('apiCall')
    await sleep(10000)
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer pGUvnj301pByYj93RZtj1pSVy1ROd82791zO1J677bjiJTnWoW2V9iZWdiTCd9FQ2v5NL0EE53+7KE5ZO4bYufglG1Uvu9xrOCqET6uLXYwAIqSyE5vU8zdtmc2e8YXs7kAoecME6juJFsBQox/fogdB04t89/1O/w1cDnyilFU='
    }
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: 'Hello'
        },
        {
            type: 'text',
            text: 'How are you?'
        }]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode)
    })
    const results = perf.stop('apiCall')
    return results.time
}

async function notify(text) {
    request({
        method: 'POST',
        uri: 'https://notify-api.line.me/api/notify',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: {
          bearer: '1yA2Q9qVavFitiSrTRJYrTA0yv3h5xDRkBChHtOM3Ki',
        },
        form: {
          message: text,
        },
      }, (err, httpResponse, body) => {
        if (err) {
          console.log(err)
        } else {
          console.log(body)
        }
      })
}

function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis))
}