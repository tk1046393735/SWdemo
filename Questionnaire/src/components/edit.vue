<template>
    <div class="h_body">
        <div>
            <Row>
                <Col span="18">
                    <div class="h_btn">
                        <Button type="primary" style="margin-right: 5px" @click="add = true"><Icon type="ios-add"/>新增问题</Button>
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
        
        <Table class="child" border :columns="columns12" :data="data6">
            <!-- <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
            </template> -->
            
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
                <FormItem label="问题描述:" prop="body">
                    <Input type="text" v-model="formCustom.body" placeholder="请输入问题描述" />
                </FormItem>
                <FormItem label="问题类型:" prop="type">
                    <Select v-model="formCustom.type" placeholder="请选择" @on-select="creatOptions">
                        <Option v-for="item in questionTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
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
import axios from 'axios'

    export default {
        name: 'child',
        data () {
            return {
                add: false,
                search: false,
                value: '',
                formCustom: {
                    body: '',
                    type: ''  
                },
                columns12: [
                    {
                        title: '问题内容',
                        key: 'body'
                    },
                    {
                        title: '问题类型',
                        key: 'type'
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        width: 300,
                        align: 'center'
                    }
                ],
                data6: [],
                questionTypeList: [
                    {
                        value: '1',
                        label: '判断题'
                    },
                    {
                        value: '2',
                        label: '选择题(单选)'
                    },
                    {
                        value: '3',
                        label: '选择题(多选)'
                    },
                    {
                        value: '4',
                        label: '填空题'
                    }
                ],
                model1: ''
            }
        },
        components: {
            Form1
        },
        mounted() {
            this.addlist();
            console.log(this.$route.params.id);
        },
        methods: {
             handleSubmitadd (name) {
                var self = this;
                this.$refs[name].validate(valid => {
                    if (valid) {
                        // 获取需要渲染到页面中的数据
                        var params = JSON.parse(JSON.stringify(self.formCustom));
                        console.log(self.formCustom)
                        var qnId = this.$route.params.id;
                        axios({
                            method: 'post',
                            url: 'http://101.132.123.158:8080/questionnaire/qn/'+ qnId +'/question/create',
                            data: self.formCustom
                        }).then(function(res) {
                            console.log(res);
                        }).catch(function(err) {
                            console.log(err);
                        }) 
                        self.$Message.success("新增成功!");
                    } else {
                        this.$Message.error('新增失败!');
                    }
                })
            },
            creatOptions(data) {
                console.log(data.value);
                var typeValue = data.value;
                switch(typeValue){
                    case '1': 
                        
                        break
                    case '2':

                        break
                    case '3':
                        
                        break
                    case '4':

                        break
                }
            },
            remove (index) {
                this.data6.splice(index, 1);
                this.$Message.success('删除成功');
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
                        let vm = this;
                        let url = "/static/Handel_Data.json";
                        axios.get(url).then(function(response) {
                            vm.ajaxHistoryData = response.data;
                            vm.data6 = vm.ajaxHistoryData;
                            // vm.dataCount = response.data.length;
                            // if(vm.dataCount < vm.pageSize) {
                            //     vm.data6 = vm.ajaxHistoryData;
                            // } else {
                            //     vm.data6 = vm.ajaxHistoryData.slice(0, vm.pageSize);
                            // }
                        })
                    }
                // 将查找出来的数据给表格
                this.data6 = arr;
                }
            },
            addlist() {
                var vm = this;
                var qnId = this.$route.params.id;
                var url = 'http://101.132.123.158:8080/questionnaire/qn/' + qnId + '/question/list'
                axios.get(url).then(function(res) {
                    console.log(res.data.data);
                    vm.data6 = res.data.data;
                }).catch(function(err) {
                    console.log(err);
                })
            }
            //获取后台数据
            // add123() {
            //     var vm = this;
            //     var url = "http://101.132.123.158:8080/questionnaire/qn/{qnId}/question/details";
            //     axios.get(url).then(function(response) {
            //         vm.ajaxHistoryData = response.data;
            //         vm.data6 = vm.ajaxHistoryData;
            //     })
            // }
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

