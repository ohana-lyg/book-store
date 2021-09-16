<!--
 * @Author: your name
 * @Date: 2021-05-02 19:37:47
 * @LastEditTime: 2021-05-04 20:12:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Vue3project\ewshop\src\components\content\goods\GoodsList.vue
-->
<template>
    <div class="goods">
        <goods-list-item v-for="item in goods" :product="item" :key="item"></goods-list-item>
    </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";
export default {
    name: "GoodsList",
    props: {
        goods: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    components: {
        GoodsListItem,
    }
}
</script>

<style scoped>
.goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 5px;
}
</style>