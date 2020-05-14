<template>
    <div class="h_body">
        <div>
            <Row>
                <Col span="18">
                    <div class="h_btn">
                        <Button type="primary" style="margin-right: 5px" @click="add = true"><Icon type="ios-add"/>新增问卷</Button>
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
        
        <Table border :columns="columns12" :data="data6" @on-row-click="tackdata">
            <!-- <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
            </template> -->
            
            <template slot-scope="{ row }" slot="action">
                <div class="butn">
                    <Button type="primary" size="small" style="margin-right: 5px" @click="search = true"><Icon type="ios-search-outline" />预览</Button>
                    <!-- <router-link to="/edit"> -->
                        <Button type="success" size="small" @click="gotopage(row.id)"><Icon type="ios-brush-outline" />编辑</Button>
                    <!-- </router-link> -->
                    <Button type="error" size="small" @click="remove(row.id)"><Icon type="ios-close" />删除</Button>
                </div>
            </template>        
        </Table>

        <Modal
        v-model="add"
        title="新增"
        width= 550px
        @on-ok="handleSubmitadd('formCustom')"
        @on-cancel="handleReset('formCustom')">
            <Form ref="formCustom" :model="formCustom" :label-width="120">
                <FormItem label="问卷主题:" prop="title">
                    <Input type="text" v-model="formCustom.title" placeholder="请输入标题" />
                </FormItem>
                <FormItem label="问卷小标题:" prop="titleMini">
                    <Input type="text" v-model="formCustom.titleMini" placeholder="请输入小标题" />
                </FormItem>
                <FormItem label="问卷调查人:" prop="investigator">
                    <Input type="text" v-model="formCustom.investigator" placeholder="请输入调查人" />
                </FormItem>
                <FormItem label="问卷调查时间:" prop="investigatorTime">
                    <!-- <Input type="text" readonly v-model="formCustom.investigatorTime" placeholder="选择调查时间" /> -->
                    <DatePicker type="date" placeholder="选择调查时间" v-model="formCustom.investigatorTime" style="width: 100%!important;"></DatePicker>
                </FormItem>
                <FormItem label="问卷调查地址:" prop="investigatorAddress">
                    <Input type="text" v-model="formCustom.investigatorAddress" placeholder="请输入调查地址" />
                </FormItem>
                <FormItem label="是否匿名:" prop="anonymousFlag">
                    <RadioGroup v-model="formCustom.anonymousFlag">
                        <Row>
                            <Col span="12">
                                <!-- <Row>
                                    <Col span="12">
                                        <Input type="radio" name="anonymousFlag" checked v-model="formCustom.anonymousFlag" style="width: 20px;" />
                                    </Col>
                                    <Col span="12">
                                        <span style="margin: -10px 0 0 5px;">是</span>
                                    </Col>
                                </Row> -->
                                <Radio name="anonymousFlag" checked label="0" placeholder="请输入调查地址">是</Radio>
                            </COl>
                            <Col span="12">
                                <!-- <Row>
                                    <Col span="12">
                                        <Input type="radio" name="anonymousFlag" v-model="formCustom.anonymousFlag" style="width: 20px;margin: 0 0 0 10px;" />
                                    </Col>
                                    <Col span="12">
                                        <span style="margin: -10px 0 0 15px;">否</span>
                                    </Col>
                                </Row> -->
                                <Radio name="anonymousFlag" label="1" placeholder="请输入调查地址">否</Radio>
                            </Col>
                        </Row>
                    </RadioGroup>
                </FormItem>
                <!-- <FormItem label="问卷描述:" prop="content">
                    <Textarea type="text" v-model="formCustom.content" placeholder="请输入问卷描述..." style="width: 100%"></Textarea>
                </FormItem> -->
                <FormItem label="问卷描述:" prop="content">
                    <Input v-model="formCustom.content" type="textarea" :autosize="{minRows: 3,maxRows: 6}" placeholder="请输入问卷描述..." />
                </FormItem>
            </Form>
        </Modal>

        <Modal
        v-model="search"
        fullscreen
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
        data () {
            return {
                add: false,
                search: false,
                value: '',
                formCustom: {
                    
                    title: '',
                    titleMini: '',
                    content: '',
                    anonymousFlag: '',
                    investigatorTime: '',
                    investigator: '',
                    investigatorAddress: '',
                    textarea: ''
                },
                columns12: [
                    // {
                    //     title: '问卷序号',
                    //     key: 'qnId'
                    // },
                    {
                        title: '问卷主题',
                        key: 'title'
                    },
                    {
                        title: '问卷描述',
                        key: 'content'
                    },
                    {
                        title: '调查人',
                        key: 'investigator'
                    },
                    {
                        title: '调查时间',
                        key: 'investigatorTime'
                    },
                    {
                        title: '是否匿名',
                        key: 'anonymousFlag'
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        width: 300,
                        align: 'center'
                    }
                ],
                data6: []
            }
        },
        components: {
            Form1
        },
        mounted() {
            this.addDate();
        },
        methods: {
            tackdata(data) {
                console.log(data);
            },
            gotopage(id) {
                this.$router.push('/edit/' + id);
                this.$router.push('/' + id);
            },
            handleSubmitadd (name) {
                var self = this;
                this.$refs[name].validate(valid => {
                    if (valid) {
                        // 获取需要渲染到页面中的数据
                        var params = JSON.parse(JSON.stringify(self.formCustom));
                        console.log(self.formCustom)
                        axios({
                            method: 'post',
                            url: 'http://101.132.123.158:8080/questionnaire/qn/create',
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
            remove (id) {
                axios.delete('http://101.132.123.158:8080/questionnaire/qn/delete' + id).then(function(res) {
                    console.log(res)
                    this.$Message.success('删除成功');
                }).catch(function(err) {
                    console.log(err)
                    this.$Message.error('删除失败');
                })
                // this.data6.splice(index, 1);
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
                    // if判断  如果文本框中的值等于表格中title的值 输出
                    if (len[i].title == this.value) {
                        arr.push(len[i]);
                    // 如果等于空就给他全部数据
                    } else if (this.value == "") {
                        let vm = this;
                        let url = "http://101.132.123.158:8080/questionnaire/qn/list?page=0&limit=10";
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
            //获取后台数据
            addDate() {
                var vm = this;
                var url = "http://101.132.123.158:8080/questionnaire/qn/list?page=0&limit=10";
                axios.get(url).then(function(response) {
                    vm.ajaxHistoryData = response.data.data;
                    vm.data6 = vm.ajaxHistoryData;
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
