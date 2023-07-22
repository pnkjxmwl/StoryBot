import express from 'express'
import { connect } from './config/database.js';
import bodyParser from 'body-parser';
import apiRoutes from './routes/index.js'
import Cors from 'cors'
const app= express();
app.use(Cors());
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({extended:true}))

app.use('/api',apiRoutes) 


app.listen(4000,async ()=>{
    console.log('App started at PORT 4000');
    await connect();
   console.log("Database Connected");
})