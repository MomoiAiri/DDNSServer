import { Client } from "tencentcloud-sdk-nodejs-dnspod/tencentcloud/services/dnspod/v20210323/dnspod_client";
import { config } from "../config";


export const client:Client = new Client({
    credential: {
        secretId: config.secretID,
        secretKey: config.secretKey,
      },
    region: "ap-shanghai",
    profile: {
    signMethod: "TC3-HMAC-SHA256", // 签名方法
    httpProfile: {
        reqMethod: "POST", // 请求方法
        reqTimeout: 60
        }
    }
});
