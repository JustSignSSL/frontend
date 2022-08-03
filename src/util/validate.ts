import joi from 'joi'

export const validateSerialNumber = (_rule: any, value: string, callback: any) => {
    let schema = joi.object({ text: [joi.string().regex(/^[A-Z\d]+$/)] })
    const { error } = schema.validate({ text: value })
    if (error) callback("填写错误")
}

export const shortText = { min: 3, max: 50, message: '字段大小必须在 3 到 50 之间', trigger: 'blur' }
export const longText = { min: 0, max: 200, message: '字段大小必须在 0 到 200 之间', trigger: 'blur' }
export const required = (str: string) => ({ required: true, message: `${str}是必填项`, trigger: 'blur' })
