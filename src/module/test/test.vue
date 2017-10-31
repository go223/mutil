<style lang="less">
    @import url('./test.less');
</style>
<template>
    <div>
        <p>
            {{message}}
        </p>
    </div>
</template>
<script>
    export default {
        name:'Test',
        create () {

        },
        mounted () {
            console.log('test')
        }
    }
</script>

