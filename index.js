const express = require('express')
const app = express()
const { Pool } = require('pg')

const pool = new Pool({
    user: process.env.pg_user,
    database: process.env.pg_database,
    password: process.env.pg_password,
    port: process.env.pg_port,
    host: process.env.pg_host,
  })

const createUser = (request, response) => {
    pool.query('INSERT INTO public.user_access (user_info) VALUES ($1)',[request.headers['user-agent']],(error, results) => {
      if (error) {
        throw error
      }
    })
  }

const port = process.env.PORT || 3032;
var os = require('os');
var d = new Date();
var responsev1 = "docker info: "+os.platform()+"--"+os.release()+"--"+os.version()
var responsev2 = responsev1 + "<br/>Xendit - Trial - Hai Tran Van - 19/9/2020 - "+`${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`
var responsev3 = responsev2 + "<br/>System info:<br/>CPU: "+ os.loadavg() +"  Memory total: "+ os.totalmem()+" Free memory: "+os.freemem()
app.get('/', (req, res) => {
    console.log(`${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}  -  ${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`+"-----"+req.headers['user-agent'])
    createUser(req,res)
    res.send(responsev3)
})
app.listen(port, (err) => {
    if (err) {
      console.log('Error::', err);
    }
    console.log(`xd-trial app listening on port ${port}`);
});