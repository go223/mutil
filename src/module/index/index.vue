<style lang="less">
    @import url('./index.less');
</style>
<template>
<div>
    <h1>{{ message }}</h1>
    <p>我是背景图</p>
    <div class="yb-bg">
        给我一个text-shadow
    </div>
    <p>我是img</p>
    <img src="./assets/333.png" alt="img插入">
</div>
</template>
<script>
    export default {
        name:'index',
        data () {
            return {
                message:'hello 首页'
            }
        },
        created () {

        },
        mounted (){
            this.pageCurrent();
        },
        methods:{
            pageCurrent:function () {
                console.log('index')
            }
        }
    }
</script>


