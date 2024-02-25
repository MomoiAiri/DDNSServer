import * as fs from 'fs';
import path from 'path';

interface Config{
    secretID:string,
    secretKey:string,
    domainName:string,
    subDomainName:string,
    listenPort:number
}
const mainDir:string = path.dirname(__dirname)
const configPath:string = path.join(mainDir,'data/config.json');
const json:string = fs.readFileSync(configPath,'utf-8')
export const config:Config = JSON.parse(json)
console.log(config);
