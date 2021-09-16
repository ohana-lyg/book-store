<!--
 * @Author: your name
 * @Date: 2021-04-29 21:25:29
 * @LastEditTime: 2021-05-21 21:26:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Vue3project\ewshop\src\views\category\Category.vue
-->
<template>
    <div>
        <nav-bar>
            <template v-slot:default>商品分类</template>
            <template v-slot:right></template>
        </nav-bar>
        <div id="mainbox">
            <div class="ordertab">
                <van-tabs v-model="active" @click="tabClick">
                    <van-tab title="销量排序"></van-tab>
                    <van-tab title="价格排序"></van-tab>
                    <van-tab title="评论排序"></van-tab>
                </van-tabs>
            </div>
            <van-sidebar class="leftmenu" v-model="activeKey">
                <van-collapse v-model="activeName" accordion>
                    <van-collapse-item 
                        v-for="item in categories" 
                        :key="item.id"
                        :title="item.name" 
                        :name="item.name">
                        
                        <van-sidebar-item 
                            v-for="sub in item.children" 
                            :key="sub.id" 
                            :title="sub.name" 
                            @click="getGoods(sub.id)"
                        />
                    </van-collapse-item>
                </van-collapse>
            </van-sidebar>
            <div class="goodslist">
                <div class="content">
                    <van-card
                        v-for="item in ShowGoods"
                        :key="item.id"
                        @click="itemClick(item.id)" 
                        :num="item.sales"
                        :tag="item.comments_count >= 0 ? '热门' : '一般'"
                        :price="item.price"
                        :desc="item.updated_at"
                        :title="item.title"
                        :thumb="item.cover_url"
                    />
                </div>
            </div>
        </div>
        <back-top @BTop="BTop" v-show="isShowBackTop"></back-top>
    </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
import BackTop from "../../components/common/backtop/BackTop";
import { getCategory, getCategoryGoods } from "../../network/category";
import { ref, onMounted, reactive, computed, watchEffect, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import BScroll from "better-scroll";
export default {
    name: "Category",
    setup() {
        const router = useRouter();
        let active = ref(1);
        let activeKey = ref(0);
        let activeName = ref(1);
        let categories = ref([]);
        let isShowBackTop = ref(false);
        
        //当前排序
        let currentOrders = ref('sales');
        //当前的分类商品
        let currrentCid = ref(0);

        //数据模型
        const goods = reactive({
            sales:{ page: 1, list: []},
            price:{ page: 1, list: []},
            comments_count:{ page: 1, list: []}
        })

        const ShowGoods = computed(() => {
            return goods[currentOrders.value].list;
        })

        const init = () => {
            getCategoryGoods('sales', currrentCid.value).then( res => {
                goods.sales.list = res.goods.data;
            })
            getCategoryGoods('price', currrentCid.value).then( res => {
                goods.price.list = res.goods.data;
            })
            getCategoryGoods('comments_count', currrentCid.value).then( res => {
                goods.comments_count.list = res.goods.data;
            })
        }

        let bscroll = reactive({});

        onMounted(() => {
            getCategory().then(res => {
                categories.value = res.categories;
            })
            getCategoryGoods('sales', currrentCid.value).then( res => {
                goods.sales.list = res.goods.data;
            })
            // init();

            bscroll = new BScroll(document.querySelector('.goodslist'), {
                probeType: 3, // 0,1,2,3   3只要在运动就触发scroll事件
                click: true, //是否允许点击
                pullUpLoad: true, //上拉加载更多，默认是false
            });

            bscroll.on('scroll', (position) => {
                // console.log(banref.value.offsetHeight);
                // console.log(-position.y);
                isShowBackTop.value = (-position.y) > 300;
                // isShowBackTop.value = isTabFixed.value = -(position.y) > banref.value.offsetHeight;
            })

            //上拉加载数据，触发pullingUp
            bscroll.on('pullingUp', () => {
                // console.log('上拉加载数据...');
                const page = goods[currentOrders.value].page + 1;
                getCategoryGoods(currentOrders.value, currrentCid.value, page).then( res => {
                    goods[currentOrders.value].list.push(...res.goods.data);
                    goods[currentOrders.value].page += 1;
                })

                //完成上拉，等待数据请求完成，要将新数据展示出来
                bscroll.finishPullUp();
                //重新计算高度
                // console.log("contentheight"+document.querySelector('.content').clientHeight);
                nextTick(() => {
                    //重新计算高度
                    bscroll && bscroll.refresh();
                })
            })
        })
        //排序选项卡
        const tabClick = (index) => {
            let orders = ['sales','price','comments_count'];
            currentOrders.value = orders[index];
            getCategoryGoods(currentOrders.value, currrentCid.value).then( res => {
                goods[currentOrders.value].list = res.goods.data;
                nextTick(() => {
                    //重新计算高度
                    bscroll && bscroll.refresh();
                })
            })

            // console.log("当前分类：" + currrentCid.value);
            // console.log("当前排序：" + currentOrders.value);
        }
        //通过分类得到商品
        const getGoods = (cid) => {
            currrentCid.value = cid;
            init();

            // console.log("当前分类：" + currrentCid.value);
            // console.log("当前排序：" + currentOrders.value);
        }

        //监听 任何一个变量有变化，触发
        watchEffect(() => {
            nextTick(() => {
                //重新计算高度
                bscroll && bscroll.refresh();
            })
        })

        const BTop = () => {
            bscroll.scrollTo(0, 0, 500);
        }

        return {
            active,
            activeKey,
            activeName,
            categories,
            tabClick,
            currentOrders,
            getGoods,
            goods,
            currrentCid,
            ShowGoods,
            bscroll,
            isShowBackTop,
            BTop,
            itemClick:(id) => {
                router.push({ path: '/detail', query: { id }});
            }
        }
    },
    components: {
        NavBar,
        BackTop
    }
}
</script>

<style scoped lang="scss">
#mainbox {
    margin-top: 45px;
    // margin-bottom: 50px;
    display: flex;
    .ordertab {
        flex: 1;
        float: right;
        position: fixed;
        top: 45px;
        right: 0;
        left: 130px;
        // background: pink;
        height: 50px;
        z-index: 6;
    }

    .leftmenu {
        position: fixed;
        top: 95px;
        left: 0;
        // background: skyblue;
        width: 130px;
    }

    .goodslist {
        flex: 1;
        // background: yellow;
        position: absolute;
        top: 100px;
        left: 130px;
        right: 0;
        height: 100vh;
        padding: 10px;
        text-align: left !important;
    }
}
.van-card__thumb {
    width: 68px !important;
}
</style>