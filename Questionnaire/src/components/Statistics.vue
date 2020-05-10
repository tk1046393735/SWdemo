<template>
    <div>
        <div>
            <h2>问卷统计</h2>
        </div>
        <div class="s_circle">
            <i-circle
            :size="250"
            :trail-width="4"
            :stroke-width="5"
            :percent="75"
            stroke-linecap="square"
            stroke-color="#43a3fb">
                <div class="demo-Circle-custom">
                    <h1>100</h1>
                    <p>提交问卷人数</p>
                    <span>
                        总占人数
                        <i>75%</i>
                    </span>
                </div>
            </i-circle>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.s_circle {
    margin: 50px 0 0 410px;
}
</style>