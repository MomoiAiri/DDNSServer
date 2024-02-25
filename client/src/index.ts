import axios, { AxiosResponse } from "axios";
import * as fs from 'fs';
import path from 'path';

interface Config{
    posturl:string,
    interval:number
}
interface Req{
    action:string
}
const mainDir = path.dirname(__dirname)
const configPath = path.join(mainDir,'src/config.json')
const json:string= fs.readFileSync(configPath,'utf-8');
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