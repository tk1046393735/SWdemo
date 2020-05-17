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
                        <Button type="primary" @click="">搜索</Button>
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
                    <!-- <Button type="primary" size="small" style="margin-right: 5px" @click=""><Icon type="ios-search-outline" />预览</Button> -->
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
                    <Select v-model="formCustom.type" placeholder="请选择" @on-select="changeType">
                        <Option v-for="item in questionTypeList" :value="item.value" :key="item.value" >{{ item.label }}</Option>
                    </Select>
                </FormItem>

                <div style="margin-left: 10px;">
                    <template v-if="questionType == '2'">
                        <Form ref="formDynamic" :model="formDynamic" :label-width="80" style="width: 300px">
                            <FormItem
                                    v-for="(item, index) in formDynamic.items"
                                    v-if="item.status"
                                    :key="index"
                                    :label="'选项:'"
                                    :prop="'items.' + index + '.value'"
                                    :rules="{required: true, message: '选项内容不能为空', trigger: 'blur'}">
                                <Row>
                                    <Col span="18">
                                        <Input type="text" v-model="item.value" placeholder="请输入选项" />
                                    </Col>
                                    <Col span="4" offset="1">
                                        <Button @click="handleRemove(index)">移除选项</Button>
                                    </Col>
                                </Row>
                            </FormItem>
                            <FormItem>
                                <Row>
                                    <Col span="12">
                                        <Button type="dashed" long @click="handleAdd" icon="md-add">添加选项</Button>
                                    </Col>
                                </Row>
                            </FormItem>
                        </Form>
                    </template>
                </div>
                
            </Form>
        </Modal>

        <!-- <Modal
        v-model="search"
        title="预览"
        ok-text="关闭"
        cancel-text=" ">
            
        </Modal> -->


    </div>
</template>

<script>
// import Form1 from '@/page/Form'
import axios from 'axios'

    export default {
        name: 'child',
        data () {
            return {
                add: false,
                search: false,
                value: '',
                questionType: '',
                index: 1,
                formDynamic: {
                    items: [
                        {
                            value: '',
                            index: 1,
                            status: 1
                        }
                    ]
                },
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
        // components: {
        //     Form1
        // },
        mounted() {
            this.addlist();
            console.log(this.$route.params.id);
        },
        methods: {
            //  handleSubmit (name) {
            //     this.$refs[name].validate((valid) => {
            //         if (valid) {
            //             this.$Message.success('Success!');
            //         } else {
            //             this.$Message.error('Fail!');
            //         }
            //     })
            // },
            // handleReset (name) {
            //     this.$refs[name].resetFields();
            // },
            handleAdd () {
                this.index++;
                this.formDynamic.items.push({
                    value: '',
                    index: this.index,
                    status: 1
                });
            },
            handleRemove (index) {
                this.formDynamic.items[index].status = 0;
            },
            handleSubmitadd (name) {
                var self = this;
                this.$refs[name].validate(valid => {
                    if (valid) {
                        // 获取需要渲染到页面中的数据
                        var data = self.formCustom;
                        var qnId = self.$route.params.id;
                        var childsObj = self.formDynamic.items;
                        var childs = [];
                        if(data.type=='1'){
                            var yes = {
                                op:'0',
                                content:'正确'
                            };
                            childs.push(yes);
                            var no = {
                                op:'1',
                                content:'错误'
                            };
                            childs.push(no);
                        }else{
                            for(var i=0;i<childsObj.length;i++){
                                var child = {
                                    op:i+1,
                                    content:childsObj[i].value
                                };
                                childs.push(child);
                            }
                        }
                        data.list = childs;
                        axios({
                            method: 'post',
                            url: 'http://101.132.123.158:8080/questionnaire/qn/'+ qnId +'/question/create',
                            data: data
                        }).then(function(res) {
                            var d = res.data;
                            if(d.code==0){
                                 self.$Message.success(d.msg);
                                 location.reload();
                            }else{
                                 self.$Message.error(d.msg);
                            }
                        }).catch(function(err) {
                            console.log(err);
                        }) 
                    }
                })
            },
            changeType(data) {
                var typeValue = data.value;
                console.log(data.value);
                if(typeValue == '2'||typeValue == '3') {
                    this.questionType = 2;
                }else{
                    this.questionType = 1; 
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
            addlist() {
                var vm = this;
                var qnId = vm.$route.params.id;
                var url = 'http://101.132.123.158:8080/questionnaire/qn/' + qnId + '/question/list'
                axios.get(url).then(function(res) {
                    console.log(res.data.data);
                    vm.data6 = res.data.data;
                }).catch(function(err) {
                    console.log(err);
                })
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

