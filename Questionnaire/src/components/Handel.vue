<template>
    <div class="h_body">
        <div>
            <Row>
                <Col span="18">
                    <div class="h_btn">
                        <Button type="primary" style="margin-right: 5px" @click="add = true"><Icon type="ios-add"/>新增</Button>
                    </div>
                </Col>
                <div class="h_serch">
                    <Col span="4">
                        <Input v-model="value" placeholder="输入问卷名称" style="padding: 0 10px 0 0;" />
                    </Col>
                    <Col span="2">
                        <Button type="primary" @click="search1">搜索</Button>
                    </Col>
                </div>  
            </Row>
        </div>
        

        <Table border :columns="columns12" :data="data6">
            <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <div class="butn">
                    <Button type="primary" size="small" style="margin-right: 5px" @click="search = true"><Icon type="ios-search-outline" />预览</Button>
                    <router-link to="/edit">
                        <Button type="success" size="small"><Icon type="ios-brush-outline" />编辑</Button>
                    </router-link>
                    <Button type="error" size="small" @click="remove(index)"><Icon type="ios-close" />删除</Button>
                </div>
            </template>        
        </Table>
        
        <Modal
        v-model="add"
        title="新增"
        @on-ok="handleSubmitadd('formCustom')"
        @on-cancel="handleReset('formCustom')">
            <Form ref="formCustom" :model="formCustom" :label-width="90">
                <FormItem label="问卷名称:" prop="name">
                    <Input type="text" v-model="formCustom.name" placeholder="请输入名称" />
                </FormItem>
                <FormItem label="问卷描述:" prop="address">
                    <Input type="text" v-model="formCustom.address" placeholder="请输入描述" />
                </FormItem>
            </Form>
        </Modal>

        <Modal
        v-model="search"
        title="预览"
        ok-text="关闭"
        cancel-text=" ">
            <Form1></Form1>
        </Modal>
    </div>
</template>

<script>
import Form1 from '@/page/Form'
    export default {
        data () {
            return {
                add: false,
                search: false,
                value: '',
                formCustom: {
                    name: '',
                    address: ''  
                },
                columns12: [
                    {
                        title: '问卷列表',
                        slot: 'name'
                    },
                    {
                        title: '问卷描述',
                        key: 'address'
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        width: 300,
                        align: 'center'
                    }
                ],
                data6: [
                    {
                        name: '问卷一',
                        address: '所选择的电脑品牌'
                    },
                    {
                        name: '问卷二',
                        address: '所购买的价格'
                    },
                    {
                        name: '问卷三',
                        address: '心中的定价'
                    },
                    {
                        name: '问卷四',
                        address: '以下哪个选项正确?'
                    },
                    {
                        name: '问卷五',
                        address: '以下哪个选项正确?'
                    },
                    {
                        name: '问卷六',
                        address: '以下哪个选项正确?'
                    },
                    {
                        name: '问卷七',
                        address: '以下哪个选项正确?'
                    }
                ]
            }
        },
        components: {
            Form1
        },
        methods: {
            handleSubmitadd (name) {
                var self = this;
                this.$refs[name].validate(valid => {
                    if (valid) {
                        var params = JSON.parse(JSON.stringify(self.formCustom));
                        // 获取需要渲染到页面中的数据
                        self.$Message.success("新增成功!");
                        self.data6.push(params);
                        this.$refs[name].resetFields();
                    } else {
                        this.$Message.error('新增失败!');
                    }
                })
            },
            remove (index) {
                this.$Message.success('删除成功');
                this.data6.splice(index, 1);
            },
            handleReset (name) {
                this.$refs[name].resetFields();
                this.$Message.info('取消操作');
            },
            search1() {
                // 获取表格数据
                var len = this.data6;
                // 设置一个空的数组
                var arr = [];
                // 循环遍历
                for (var i in len) {
                    // if判断  如果文本框中的值等于表格中name的值 输出
                    if (len[i].name == this.value) {
                        arr.push(len[i]);
                    // 如果等于空就给他全部数据
                    } else if (this.value == "") {
                        // this.data1 = this.data7;
                        // this.data1 = testData.data6;
                        
                    }
                // 将查找出来的数据给表格
                this.data6 = arr;
                }
            }
            
        }
    }
</script>

<style scoped>
.h_btn {
    margin: 10px 0 5px 0px;
}
.h_serch {
    margin: 10px 0 0 0;
}
</style>

