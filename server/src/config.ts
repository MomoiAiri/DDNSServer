import * as fs from 'fs';

interface Config{
    secretID:string,
    secretKey:string,
    domainName:string,
    subDomainName:string,
    listenPort:number
}

const configPath:string = '../data/config.json';
const json:string = fs.readFileSync(configPath,'utf-8')
export const config:Config = JSON.parse(json)
console.log(config);
