import express from 'express'
import { connect } from './config/database.js';
const app= express();

app.listen(4000,async ()=>{
    console.log('App started at PORT 4000');
   await connect();
   console.log("Database Connected");
})