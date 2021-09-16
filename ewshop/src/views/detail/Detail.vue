<!--
 * @Author: your name
 * @Date: 2021-04-29 21:27:21
 * @LastEditTime: 2021-05-21 22:30:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Vue3project\ewshop\src\views\detail\Detail.vue
-->
<template>
    <div>
        <nav-bar>
            <template v-slot:default>商品详情:{{id}}</template>
            <template v-slot:right></template>
        </nav-bar>
        <van-image style="margin-top: 50px"
            width="100%"
            lazy-load
            :src="detail.cover_url"
        />
        <van-card style="text-align: left"
            :num="detail.stock"
            :price="detail.price + '.00'"
            :desc="detail.description"
            :title="detail.title"
        >
            <template #tags>
                <van-tag plain type="danger">新书</van-tag>
                <van-tag plain type="danger">推荐</van-tag>
            </template>
            <template #footer>
                <van-button type="warning" @click="addshoppingCart">加入购物车</van-button>
                <van-button type="danger" @click="goToCart">立即购买</van-button>
            </template>
        </van-card>
        <van-tabs class="con" v-model="active">
            <van-tab title="概述">
                <div class="content" v-html="detail.details">
                    
                </div>
            </van-tab>
            <van-tab title="热评">
                <div v-for="item in detail.comments" :key="item">
                    
                </div>
            </van-tab>
            <van-tab title="相关图书">
                <goods-list :goods='like_goods' ></goods-list>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
import GoodsList from "../../components/content/goods/GoodsList";
import { getDetail } from "../../network/detail";
import { addCart } from '../../network/cart';
import { useRoute, useRouter } from "vue-router";
import { useStore } from 'vuex';
import { ref, onMounted, reactive, toRefs } from "vue";
import { Toast } from 'vant';
export default {
    name: "Detail",
    components: {
        NavBar,
        GoodsList
    },
    setup() {
        let active = ref(1);
        const route = useRoute();
        const router = useRouter();
        const store = useStore();
        let id = ref(0);
        let book = reactive({
            detail: {},
            like_goods: [],
        });

        onMounted(() => {
            id.value = route.query.id;
            getDetail(id.value).then(res => {
                book.detail = res.goods;
                book.like_goods = res.like_goods;
            })
        })
        //添加购物车
        const addshoppingCart = () => {
            addCart({
                goods_id: book.detail.id,
                num: 1
            }).then(res => {
                //204是购物车存在该商品，返回状态码204 
                //201是购物车没有该商品，即在将该商品加入购物车会返回状态码201
                if(res.status == '204' || res.status == '201') {
                    Toast.success('添加成功');
                    //设置store中的cartCount数量
                    store.dispatch('updateCart');
                }
            })
        }

        //立即购买
        const goToCart = () => {
            addCart({
                goods_id: book.detail.id,
                num: 1
            }).then(res => {
                //204是购物车存在该商品，返回状态码204 
                //201是购物车没有该商品，即在将该商品加入购物车会返回状态码201
                if(res.status == '204' || res.status == '201') {
                    Toast.success('显示购物车');
                    //设置store中的cartCount数量
                    store.dispatch('updateCart');
                    router.push({path: '/shopcart'});
                }
            })
        }
        
        return {
            id,
            ...toRefs(book),
            active,
            addshoppingCart,
            goToCart
        }
    }
}
</script>

<style scoped lang="scss">
.content {
    padding: 10px;
}
.con {
    margin-bottom: 50px;
}
</style>