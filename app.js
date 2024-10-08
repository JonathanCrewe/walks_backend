const cors = require('cors')
const express = require('express')
const apiRouter = require("./routes/api-router")

const app = express()
app.use(cors())
app.use('/api', apiRouter)


// Error handlers. 
app.use((req, res)=>{
    res.status(404).send({msg: 'Not Found'})
})

app.use((err, req, res, next)=>{
    if (err.status && err.msg) {
        res.status(err.status).send({msg: err.msg})
    } else next(err)
})


module.exports = app