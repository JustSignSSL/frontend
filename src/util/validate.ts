import joi from 'joi'
import { t } from './i18n'

export const validateSerialNumber = (_rule: any, value: string, callback: any) => {
    let schema = joi.object({ text: [joi.string().regex(/^[A-Z\d]+$/)] })
    const { error } = schema.validate({ text: value })
    if (error) callback(t('incorrectInput'))
}

export const shortText = { min: 3, max: 50, message: t('shortText'), trigger: 'blur' }
export const longText = { min: 0, max: 200, message: t('longText'), trigger: 'blur' }
export const required = (str: string) => ({ required: true, message: `${str} ${t('isRequired')}`, trigger: 'blur' })
