<!--
 * @Author: your name
 * @Date: 2021-05-01 17:16:12
 * @LastEditTime: 2021-05-04 21:02:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Vue3project\ewshop\src\components\content\tabControl\TabControl.vue
-->
<template>
    <div class="tab-control">
        <div v-for="(item, index) in titles" 
            :key="index"
            @click="itemClick(index)" 
            class="tab-control-item" :class="{active: index == currentIndex}">
            <span>{{ item }}</span>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
export default {
    name: "TabControl",
    props: {
        titles: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    setup(props, { emit }) {
        let currentIndex = ref(0);
        const itemClick = (index) => {
            currentIndex.value = index;
            // console.log(index);
            emit('tabClick', index);
        }
        return {
            currentIndex,
            itemClick,
        }
    }
}
</script>

<style scoped lang="scss">
.tab-control {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    background-color: #FFFFFF;
    position: sticky;
    top: 44px;
    z-index: 10;

    .tab-control-item {
        flex: 1;
        span {
            padding: 5px;
        }
    }
    .active {
        color: var(--color-tint);
        span {
            border-bottom: 3px solid var(--color-tint);
        }
    }
}
</style>