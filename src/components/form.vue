<template>
    <el-form :model="form" :rules="rules">
        <el-form-item :label="$t('validationLevel')" @change="validationLevelChange" class="fix-height">
            <el-radio-group v-model="form.validationLevel" class="ml-4">
                <el-radio :disabled="!isAvailableValidationLevel('DV')" label="DV" size="large">DV</el-radio>
                <el-radio :disabled="!isAvailableValidationLevel('OV')" label="OV" size="large">OV</el-radio>
                <el-radio :disabled="!isAvailableValidationLevel('EV')" label="EV" size="large">EV</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="Common Name" prop="commonName">
            <el-input v-model="form.commonName" />
        </el-form-item>
        <el-form-item :label="$t('CAName')" prop="CAName">
            <el-select v-model="form.CAName" style="width: 100%" class="m-2" placeholder="Select">
                <el-option v-for="item in CANameList" :key="item" :label="item" :value="item" />
            </el-select>
        </el-form-item>
        <el-form-item v-if="!isDV" :label="$t('countryName')">
            <el-select v-model="form.countryName" style="width: 100%" class="m-2" placeholder="Select">
                <el-option v-for="item in ISO3166" :key="item" :label="item" :value="item" />
            </el-select>
        </el-form-item>
        <el-form-item v-if="!isDV" :label="$t('stateOrProvinceName')" prop="stateOrProvinceName">
            <el-input v-model="form.stateOrProvinceName" />
        </el-form-item>
        <el-form-item v-if="!isDV" :label="$t('localityName')" prop="localityName">
            <el-input v-model="form.localityName" />
        </el-form-item>
        <el-form-item v-if="!isDV" :label="$t('organizationName')" prop="organizationName">
            <el-input v-model="form.organizationName" />
        </el-form-item>
        <el-form-item v-if="isEV" :label="$t('serialNumber')" prop="serialNumber">
            <el-input v-model="form.serialNumber" />
        </el-form-item>
        <el-form-item v-if="isEV" :label="$t('businessCategory')">
            <el-select v-model="form.businessCategory" style="width: 100%" class="m-2" placeholder="Select">
                <el-option v-for="item in businessCategory" :key="item" :label="item" :value="item" />
            </el-select>
        </el-form-item>
        <el-form-item v-if="isEV" :label="$t('jurisdictionCountryName')">
            <el-select v-model="form.jurisdictionCountryName" style="width: 100%" class="m-2" placeholder="Select">
                <el-option v-for="item in ISO3166" :key="item" :label="item" :value="item" />
            </el-select>
        </el-form-item>
        <el-form-item v-if="isEV" :label="$t('jurisdictionStateOrProvinceName')" prop="jurisdictionStateOrProvinceName">
            <el-input v-model="form.jurisdictionStateOrProvinceName" />
        </el-form-item>
        <el-form-item v-if="isEV" :label="$t('jurisdictionLocalityName')" prop="jurisdictionLocalityName">
            <el-input v-model="form.jurisdictionLocalityName" />
        </el-form-item>
        <el-form-item v-if="isEV" :label="$t('postalCode')" prop="postalCode">
            <el-input v-model="form.postalCode" />
        </el-form-item>
        <el-form-item v-if="isEV" :label="$t('streetAddress')" prop="streetAddress">
            <el-input v-model="form.streetAddress" />
        </el-form-item>
        <el-form-item :label="$t('validityPeriod')">
            <el-select v-model="form.validityPeriod" style="width: 100%" class="m-2" placeholder="Select">
                <el-option v-for="item in validityPeriod" :key="item" :label="`${item} ${$t('day')}`" :value="item" />
            </el-select>
        </el-form-item>
        <el-form-item :label="$t('signatureHashingAlgorithm')">
            <el-select v-model="form.signatureHashingAlgorithm" style="width: 100%" class="m-2" placeholder="Select">
                <el-option v-for="item in signatureHashingAlgorithm" :key="item" :label="item" :value="item" />
            </el-select>
        </el-form-item>
        <el-form-item :label="$t('altName')" prop="altName">
            <el-input v-model="altNamePlain" :rows="2" type="textarea" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submit">{{ $t('generate') }}</el-button>
        </el-form-item>
    </el-form>
</template>


<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import ISO3166 from '../util/ISO3166'
import { businessCategory, validityPeriod, signatureHashingAlgorithm, CAName, CAType } from '../util/define'
import type { FormRules } from 'element-plus'
import { shortText, required, validateSerialNumber } from '../util/validate'
import { pick } from 'lodash';
import fetch from '../util/fetch';
import joi from 'joi'
import { t } from '../util/i18n'

const altNamePlain = ref('')

const form = reactive({
    validationLevel: 'DV',
    commonName: '',
    countryName: 'CN',
    stateOrProvinceName: '',
    localityName: '',
    organizationName: '',
    serialNumber: '',
    businessCategory: 'Private Organization',
    jurisdictionLocalityName: '',
    jurisdictionStateOrProvinceName: '',
    jurisdictionCountryName: 'CN',
    validityPeriod: 90,
    signatureHashingAlgorithm: 'SHA256',
    CAName: '',
    altName: computed(() => {
        if (altNamePlain.value.split("\n")[0] === "") return []
        return altNamePlain.value.split("\n")
    }),
    postalCode: '',
    streetAddress: ''
})

const validateCommonName = (value: string, callback: any) => {
    let schema = [joi.string().ip(), joi.string().hostname()]
    if (!(form.validationLevel === "EV")) {
        schema.push(joi.string().
            regex(/^(?=^.{3,255}$)\*\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/))
    }
    const { error } = joi.object({ text: schema }).validate({ text: value })
    if (error) callback(t("incorrectInput"))
}

const validateDomain = (_rule: any, value: string | string[], callback: any) => {
    if (!value) return
    if (value instanceof Array) {
        if (value[0] === "") return
        value.forEach(item => validateCommonName(item, callback))
    } else {
        validateCommonName(value, callback)
    }
}

const rules = reactive<FormRules>({
    commonName: [
        required('Common Name '), shortText,
        { validator: validateDomain, trigger: 'blur' },
    ],
    stateOrProvinceName: [required(t('stateOrProvinceName')), shortText],
    localityName: [required(t('localityName')), shortText],
    organizationName: [required(t('organizationName')), shortText],
    jurisdictionLocalityName: [shortText],
    jurisdictionStateOrProvinceName: [shortText],
    serialNumber: [
        required(t('serialNumber')), shortText,
        { validator: validateSerialNumber, trigger: 'blur' }
    ],
    altName: [
        { validator: validateDomain, trigger: 'blur' }
    ],
    postalCode: [shortText],
    streetAddress: [shortText],
})

const isDV = computed(() => form.validationLevel === "DV")
const isEV = computed(() => form.validationLevel === "EV")

const CANameList = computed(() => CAName(form.validationLevel as CAType))

form.CAName = CAName(form.validationLevel as CAType)[0]

const validationLevelChange = () => {
    // 认证级别改变后的事件
    form.CAName = CANameList.value[0]
}

const getInfoMap = (str: CAType) => infoMap[str]

let infoMap = {
    "DV": ['validationLevel', 'commonName', 'CAName', 'validityPeriod', 'signatureHashingAlgorithm', 'altName'],
    "OV": ['validationLevel', 'commonName', 'CAName', 'validityPeriod', 'signatureHashingAlgorithm', 'altName',
        'countryName', 'stateOrProvinceName', 'localityName', 'organizationName'],
    "EV": ['validationLevel', 'commonName', 'CAName', 'validityPeriod', 'signatureHashingAlgorithm', 'altName',
        'countryName', 'stateOrProvinceName', 'localityName', 'organizationName',
        'serialNumber', 'businessCategory', 'jurisdictionLocalityName', 'jurisdictionStateOrProvinceName',
        'jurisdictionCountryName', 'postalCode', 'streetAddress'],
}

const submit = async () => {
    const data = Object.assign({}, form)
    const picked = Object.assign({}, pick(data, getInfoMap(form.validationLevel as CAType)))
    fetch(picked)
}

const isAvailableValidationLevel = (type: CAType) => CAName(type).length > 0
</script>

<style>
.fix-height label {
    line-height: 40px;
}
</style> 