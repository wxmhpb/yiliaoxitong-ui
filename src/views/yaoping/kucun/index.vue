<template>
    <div class="index">
        <el-tabs v-model="activeName">
            <el-tab-pane label="药品总库存" name="first" :key="'first'">
                <child1></child1>
            </el-tab-pane>

            <el-tab-pane label="批次库存及价格" name="second" :key="'second'">
                <child2></child2>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
import Child1 from '@/tabComponents/Child1'
import Child2 from '@/tabComponents/Child2'
export default {
    name: 'index',
    components:{
        child1:Child1,
        child2:Child2
    },
    data() {
        return {
            //默认第一个选项卡
            activeName: "first",
        }
    },
    mounted(){

    }
}
</script>
