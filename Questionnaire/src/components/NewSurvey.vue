<template>
    <div>
        <h2>创建问卷</h2>
        <Card>
            <span slot="title">
                <Row>
                    <Col span="2">
                        <p style="margin: 5px 0 0 10px;">问题一</p>
                    </Col>
                    <Col span="19">
                        <Input v-model="value" placeholder="输入问题名称" style="width: 300px" />
                    </Col>
                    <Col span="3">
                        <div class="n_drawer">
                            <Button @click="value2 = true" type="primary">类型选择</Button>
                            <Drawer title="类型选择" placement="left" :closable="false" v-model="value2">
                                <div class="">
                                    <h3>单选框</h3>
                                    <Radio v-model="single" style="margin: 0 0 20px 0;">单选框示例</Radio>
                                </div>
                                <div class="">
                                    <h3>多选框</h3>
                                    <Checkbox v-model="single">多选框示例一</Checkbox><br>
                                    <Checkbox v-model="single" style="margin: 0 0 20px 0;">多选框示例二</Checkbox>
                                </div>
                                <div class="">
                                    <h3>输入框</h3>
                                    <Input v-model="value" placeholder="输入框示例" style="width: 200px" />
                                </div>
                            </Drawer>
                        </div>
                    </Col>
                </Row>   
            </span>
        </Card>   

        <div class="n_btn">
            <Button style="width: 100%!important;"><Icon type="ios-add" style="width: 20px!important;"/>新增</Button>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                value2: false
            }
        }
    }
</script>

<style scoped>
.n_btn {
    
    margin: 30px 0 0 0;
}
</style>