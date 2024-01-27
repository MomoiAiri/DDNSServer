import axios, { AxiosResponse } from "axios";
import * as fs from 'fs';

interface Config{
    posturl:string,
    interval:number
}
interface Req{
    action:string
}

const json:string= fs.readFileSync('./config.json','utf-8');
const config:Config = JSON.parse(json);
let req:Req = {action:'ddns'};

async function postToServer(){
    try{
        const response = await axios.post(config.posturl,{action:'ddns'});
        if(response.status==200){
           console.log(response.data);
        }
    }
    catch(e){
        console.log('出现错误'+e);
    }
}
postToServer();
setInterval(postToServer,config.interval)