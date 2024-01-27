import express from 'express';
import { compareIP } from './ipcompare';

const router = express.Router();

router.post('/',async(req,res)=>{
    if(req.body.action == 'ddns'){
        let ipaddr:string = req.ip?.toString()??'null';
        if(ipaddr=='null')return;
        if(ipaddr.startsWith('::ffff:')){
            ipaddr = ipaddr.slice(7);
            console.log('ip'+ipaddr+'发来了一条post');
        }
        if(await compareIP(ipaddr)){
            let data = {
                result:'success'
            }
            res.send(data)
        }
        else{
            let data = {
                result:'failed'
            }
            res.send(data)
        }
    }
});

export {router as ddnsRouter};