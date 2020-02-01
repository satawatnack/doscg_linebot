const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const perf = require('execution-time')()
const app = express()
const port = process.env.PORT || 4000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken
    perf.start('apiCall')
    await sleep(3000)
    reply(reply_token)
    const results = perf.stop('apiCall')
    res.sendStatus(200)
})
app.listen(port)
async function reply(reply_token) {
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
}

async function replyagain(reply_token) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer pGUvnj301pByYj93RZtj1pSVy1ROd82791zO1J677bjiJTnWoW2V9iZWdiTCd9FQ2v5NL0EE53+7KE5ZO4bYufglG1Uvu9xrOCqET6uLXYwAIqSyE5vU8zdtmc2e8YXs7kAoecME6juJFsBQox/fogdB04t89/1O/w1cDnyilFU='
    }
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: 'more than 10 seconds for ans'
        }]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode)
    })
}

function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis))
}