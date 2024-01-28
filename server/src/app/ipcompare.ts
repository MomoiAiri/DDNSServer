import fs from 'fs';
import path from 'path';
import {client} from './dnsClient'
import { DescribeRecordListRequest, DescribeRecordListResponse, ModifyRecordRequest } from 'tencentcloud-sdk-nodejs-dnspod/tencentcloud/services/dnspod/v20210323/dnspod_models';
import { config } from '../config';
import moment from 'moment';

const currentRecordFilepath:string = '../data/currentRecord.txt';
const changeRecordFilePath :string = '../data/changeRecord.txt';
const domain:string=config.domainName;
const subdomain:string=config.subDomainName;
let currentIpAddr:string = '';

function checkAndCreatFile(filepath:string):void{
    const folderPath = path.dirname(filepath);
    if(!fs.existsSync(folderPath)){
        fs.mkdirSync(folderPath,{recursive:true});
    }
    if(!fs.existsSync(filepath)){
        fs.writeFileSync(filepath,'','utf-8');
    }
    else{
        currentIpAddr = fs.readFileSync(filepath,'utf-8');
    }
}

export async function compareIP(ipaddr:string):Promise<boolean>{
    if(ipaddr!=currentIpAddr){
        if(currentIpAddr==''){
            currentIpAddr==ipaddr;
            fs.writeFileSync(currentRecordFilepath,currentIpAddr,'utf-8');
            return false;
        }
        let recordListData:DescribeRecordListResponse = {};
        let req1:DescribeRecordListRequest ={
            Domain:domain,
            Subdomain:subdomain
        }
        await client.DescribeRecordList(req1).then((data)=>{recordListData=data},(err)=>{console.log('err'+ err)});
        let recordId = 0;
        recordListData.RecordList?.forEach((item)=>{
            if(item.Value == currentIpAddr){
                recordId = item.RecordId;
            }
        })
        if(recordId!=0){
            let req2:ModifyRecordRequest ={
                Domain:domain,
                SubDomain:subdomain,
                RecordType:'A',
                RecordLine:'默认',
                Value:ipaddr,
                RecordId:recordId
            }
            await client.ModifyRecord(req2).then(
                (data)=>{
                    // console.log(data);
                    if(data.RecordId == recordId){
                        fs.writeFileSync(currentRecordFilepath,ipaddr,'utf-8');
                        addRecord(ipaddr);
                        console.log('ip映射修改成功');
                        return true;
                    }
                    return false;
                },
                (err)=>{
                    console.log(err);
                    return false;
                });
        }
        else{
            return false;
        }
    }
    return false;
}
function addRecord(newip:string):void{
    let data:string = fs.readFileSync(changeRecordFilePath,'utf-8');
    const now:Date = new Date();
    const record:string = `[${moment(now).format('YYYY-MM-DD HH:mm')}] 变更为 ${newip}`;
    data = data + '\n' + record;
    fs.writeFileSync(changeRecordFilePath,data,'utf-8');
}

checkAndCreatFile(currentRecordFilepath);
checkAndCreatFile(changeRecordFilePath);
