<template>
    <el-form :model="form" :rules="rules">
        <el-form-item label="认证级别" @change="validationLevelChange" class="fix-height">
            <el-radio-group v-model="form.validationLevel" class="ml-4">
                <el-radio label="DV" size="large">DV</el-radio>
                <el-radio label="OV" size="large">OV</el-radio>
                <el-radio label="EV" size="large">EV</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="Common Name" prop="commonName">
            <el-input v-model="form.commonName" placeholder="请在此输入" />
        </el-form-item>
        <el-form-item label="CA 名称" prop="CAName">
            <el-select v-model="form.CAName" style="width: 100%" class="m-2" placeholder="Select">
                <el-option v-for="item in CANameList" :key="item" :label="item" :value="item" />
            </el-select>
        </el-form-item>
        <el-form-item v-if="!isDV" label="国家">
            <el-select v-model="form.countryName" style="width: 100%" class="m-2" placeholder="Select">
                <el-option v-for="item in ISO3166" :key="item" :label="item" :value="item" />
            </el-select>
        </el-form-item>
        <el-form-item v-if="!isDV" label="州省" prop="stateOrProvinceName">
            <el-input v-model="form.stateOrProvinceName" placeholder="请在此输入" />
        </el-form-item>
        <el-form-item v-if="!isDV" label="城市" prop="localityName">
            <el-input v-model="form.localityName" placeholder="请在此输入" />
        </el-form-item>
        <el-form-item v-if="!isDV" label="组织名称" prop="organizationName">
            <el-input v-model="form.organizationName" placeholder="请在此输入" />
        </el-form-item>
        <el-form-item v-if="isEV" label="序列号" prop="serialNumber">
            <el-input v-model="form.serialNumber" placeholder="请在此输入" />
        </el-form-item>
        <el-form-item v-if="isEV" label="商业性质">
            <el-select v-model="form.businessCategory" style="width: 100%" class="m-2" placeholder="Select">
                <el-option v-for="item in businessCategory" :key="item" :label="item" :value="item" />
            </el-select>
        </el-form-item>
        <el-form-item v-if="isEV" label="司法管辖城市" prop="jurisdictionLocalityName">
            <el-input v-model="form.jurisdictionLocalityName" placeholder="请在此输入" />
        </el-form-item>
        <el-form-item v-if="isEV" label="司法管辖州省" prop="jurisdictionStateOrProvinceName">
            <el-input v-model="form.jurisdictionStateOrProvinceName" placeholder="请在此输入" />
        </el-form-item>
        <el-form-item v-if="isEV" label="司法管辖国家">
            <el-select v-model="form.jurisdictionCountryName" style="width: 100%" class="m-2" placeholder="Select">
                <el-option v-for="item in ISO3166" :key="item" :label="item" :value="item" />
            </el-select>
        </el-form-item>
        <el-form-item label="有效期">
            <el-select v-model="form.validityPeriod" style="width: 100%" class="m-2" placeholder="Select">
                <el-option v-for="item in validityPeriod" :key="item" :label="item + ' 天'" :value="item" />
            </el-select>
        </el-form-item>
        <el-form-item label="签名哈希算法">
            <el-select v-model="form.signatureHashingAlgorithm" style="width: 100%" class="m-2" placeholder="Select">
                <el-option v-for="item in signatureHashingAlgorithm" :key="item" :label="item" :value="item" />
            </el-select>
        </el-form-item>
        <el-form-item label="扩展名称" prop="altName">
            <el-input v-model="altNamePlain" :rows="2" type="textarea" placeholder="请在此输入" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submit">生成</el-button>
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
    CAName: 'Youngdo Basic Site CA - R3',
    altName: computed(() => {
        if (altNamePlain.value.split("\n")[0] === "") return []
        return altNamePlain.value.split("\n")
    })
})

const validateCommonName = (value: string, callback: any) => {
    let schema = [joi.string().ip(), joi.string().hostname()]
    if (!(form.validationLevel === "EV")) {
        schema.push(joi.string().
            regex(/^(?=^.{3,255}$)\*\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/))
    }
    const { error } = joi.object({ text: schema }).validate({ text: value })
    if (error) callback("填写错误")
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
    stateOrProvinceName: [required('州省'), shortText],
    localityName: [required('城市'), shortText],
    organizationName: [required('组织'), shortText],
    jurisdictionLocalityName: [required('司法管辖城市'), shortText],
    jurisdictionStateOrProvinceName: [required('司法管辖州省'), shortText],
    serialNumber: [
        required('序列号'), shortText,
        { validator: validateSerialNumber, trigger: 'blur' }
    ],
    altName: [
        { validator: validateDomain, trigger: 'blur' }
    ]
})

const isDV = computed(() => form.validationLevel === "DV")
const isEV = computed(() => form.validationLevel === "EV")

const CANameList = computed(() => CAName(form.validationLevel as CAType))

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
        'serialNumber', 'businessCategory', 'jurisdictionLocalityName', 'jurisdictionStateOrProvinceName', 'jurisdictionCountryName'],
}

const submit = async () => {
    const data = Object.assign({}, form)
    const picked = Object.assign({}, pick(data, getInfoMap(form.validationLevel as CAType)))
    fetch(picked)
}
</script>

<style>
.fix-height label {
    line-height: 40px;
}
</style> 