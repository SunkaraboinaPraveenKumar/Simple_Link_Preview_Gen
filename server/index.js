const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const { getUrlPreview } = require('./url_controller');

const app = express()
app.use(bodyParser.json())
app.use(cors())

const port = process.env.PORT||3000

app.post('/preview',getUrlPreview)

app.get('/health',(req,res)=>{
    return res.status(200).json({status:'Sever Running'})
})

app.listen(port,()=>{
    console.log(`Server running on ${port}`)
})
