import { createI18n } from 'vue-i18n'

const messages = {
    "zh-CN": {
        "noData": "没有数据",
        "publicKey": "公钥",
        "privateKey": "私钥",
        "certificateChain": "证书链",
        "validationLevel": "认证级别",
        "CAName": "CA 名称",
        "countryName": "国家",
        "stateOrProvinceName": "州省",
        "localityName": "城市",
        "organizationName": "组织",
        "serialNumber": "序列号",
        "businessCategory": "商业性质",
        "jurisdictionLocalityName": "司法城市",
        "jurisdictionStateOrProvinceName": "司法州省",
        "jurisdictionCountryName": "司法国家",
        "validityPeriod": "有效期",
        "signatureHashingAlgorithm": "签名哈希算法",
        "altName": "扩展名称",
        "postalCode": "邮政编码",
        "streetAddress": "街道",
        "generate": "生成",
        "fetchSuccess": "获取成功",
        "day": "天",
        "paramIncorrect": "参数错误",
        "serverError": "服务端错误",
        "incorrectInput": "填写错误",
        "isRequired": "是必填项",
        "shortText": "字段大小必须在 3 到 50 之间",
        "longText": "字段大小必须在 3 到 200 之间",
    },
    "en-US": {
        "noData": "No Data",
        "publicKey": "Public Key",
        "privateKey": "Private Key",
        "certificateChain": "Certificate Chain",
        "validationLevel": "Validation Level",
        "CAName": "CA Name",
        "countryName": "Country Name",
        "stateOrProvinceName": "State or Province Name",
        "localityName": "Locality Name",
        "organizationName": "Organization Name",
        "serialNumber": "Serial Number",
        "businessCategory": "Business Category",
        "jurisdictionLocalityName": "Jurisdiction Locality Name",
        "jurisdictionStateOrProvinceName": "Jurisdiction State or Province Name",
        "jurisdictionCountryName": "Jurisdiction Country Name",
        "validityPeriod": "Validity Period",
        "signatureHashingAlgorithm": "Signature Hashing Algorithm",
        "altName": "Alt Name",
        "postalCode": "Postal Code",
        "streetAddress": "Street Address",
        "generate": "Generate",
        "fetchSuccess": "Fetch Success",
        "day": "days",
        "paramIncorrect": "Param incorrect",
        "serverError": "Internal Server Error",
        "incorrectInput": "Incorrect input",
        "isRequired": " is required",
        "shortText": "Field size must be between 3 and 50",
        "longText": "Field size must be between 3 and 200",
    }
}

export const i18n = createI18n({
    legacy: false,
    locale: navigator.language.startsWith("zh") ? "zh-CN" : "en-US",
    fallbackLocale: 'en-US',
    messages
})

export const t = (query: string) => {
    let currLang = navigator.language in messages ? navigator.language : "en-US"
    // @ts-ignore
    return messages[currLang][query]
}