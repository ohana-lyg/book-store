<!--
 * @Author: your name
 * @Date: 2021-05-27 20:53:53
 * @LastEditTime: 2021-05-30 20:30:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ewshop\src\views\profile\AddressEdit.vue
-->
<template>
    <div class="addres-edit-box">
        <nav-bar class="nav-bar">
            <template v-slot:default>
                {{ title }}
            </template>
        </nav-bar>
        <van-address-edit
            class="edit"
            :area-list="areaList"
            :address-info="addressInfo"
            :show-delete="type == 'edit'"
            show-set-default
            show-search-result
            :search-result="searchResult"
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
            @delete="onDelete"
        />
    </div>
</template>

<script>

import NavBar from '../../components/common/navbar/NavBar';
import { useRouter, useRoute } from 'vue-router';
import { Toast } from 'vant';
import { Districts } from '../../utils/address';
import { ADDaddress,  Editaddress,  Deleteaddress, getaddressdetail  } from '../../network/address';
import { computed, onMounted, reactive, toRefs } from 'vue';
export default {
    components: {
        NavBar,
    },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const state = reactive({
            areaList: {
                province_list: {},
                city_list: {},
                county_list: {}
            },
            searchResult: [],
            addressInfo: {},
            type: 'add',
            addressId: '',
            title: ''
        })
        onMounted(() => {
            //省市区 列表 构造出来
            let _province_list = {};
            let _city_list = {};
            let _county_list = {};
            //console.log(Districts.getLev1());

            Districts.getLev1().forEach(pr => {
                _province_list[pr.id] = pr.text;

                Districts.getLev2(pr.id).forEach(ci => {
                    _city_list[ci.id] = ci.text;

                    Districts.getLev3(ci.id).forEach(co => {
                        _county_list[co.id] = co.text;
                    })
                })
            })

            state.areaList.province_list = _province_list;
            state.areaList.city_list = _city_list;
            state.areaList.county_list = _county_list;

            //接收参数
            const { type, addressId } = route.query;
            state.type = type;
            state.addressId = addressId;
            if(type == 'edit') {
                getaddressdetail(addressId).then(res => {
                    // console.log(res);
                    const addressdetail = res;
                    let _areaCode = '';
                    const province = Districts.getLev1();
                    Object.entries(state.areaList.county_list).forEach(([id, text]) => {
                        //先找出当前对应的区（县）
                        if(text == addressdetail.county) {
                            const provinceIndex = province.findIndex(item => item.id.substr(0,2) == id.substr(0,2));
                            // console.log(provinceIndex);
                            // console.log(province[provinceIndex].text);
                            // eslint-disable-next-line no-unused-vars
                            const cityItem = Object.entries(state.areaList.city_list).filter(([cityId,city]) => cityId.substr(0,4) == id.substr(0,4));
                            // console.log(cityItem);
                            // console.log(cityItem[0][1]);
                            // console.log(addressdetail.city);
                            if(province[provinceIndex].text == addressdetail.province && cityItem[0][1] == addressdetail.city) {
                                _areaCode = id;
                                // console.log(id);
                            }
                        }
                    })
                    // console.log(ok);
                    
                    state.addressInfo = {
                        name: addressdetail.name,
                        tel: addressdetail.phone,
                        province: addressdetail.province,
                        city: addressdetail.city,
                        county: addressdetail.county,
                        areaCode: _areaCode,
                        addressDetail: addressdetail.address,
                        isDefault: !!addressdetail.is_default
                    }
                })
            }

        })

        const title = computed(() => {
            return state.type == 'add' ? '新增地址' : '编辑地址';
        })

        const onSave = (content) => {
            // console.log(content);
            const params = {
                name: content.name,
                phone: content.tel,
                province: content.province,
                city: content.city,
                county: content.county,
                address: content.addressDetail,
                is_default: content.isDefault ? 1 : 0
            }

            //
            if(state.type == 'edit') {
                //修改数据（更新数据）
                Editaddress(state.addressId, params);
            }
            else if(state.type == 'add'){
                //调用接口添加数据（地址）
                ADDaddress(params);
            }

            Toast('地址保存成功');
            setTimeout(() => {
                router.back();
            } ,1000)

        }

        const onDelete = () => {
            Deleteaddress(state.addressId).then(() => {
                Toast('删除成功');
                setTimeout(() => {
                    router.back();
                } ,1000)
            })
        }

        return {
            ...toRefs(state),
            onSave,
            onDelete,
            title
        }
    }
}
</script>

<style lang="scss">
.edit {
    margin-top: 50px;
    .van-field__body {
        textarea {
            height: 26x !important;
        }
    }
}
.address-edit-box {
    margin-top: 50px;
}
</style>