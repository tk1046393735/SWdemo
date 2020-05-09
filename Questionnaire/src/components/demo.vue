<template>
    <div>
        <Row>
            <Col span="6">
                <Input v-model="value" placeholder="输入姓名" style="width: 300px;padding: 0 0 20px 0;" />
            </Col>
            <Col span="15" style="margin: 0 0 0 50px;">
                <Button type="primary" @click="search">搜索</Button>
            </Col>
            <Col span="3" style="margin: 0 0 0 -50px;">
                <Button type="primary" style="margin-right: 5px" @click="add = true">增加</Button>
            </Col>
        </Row>
        <Table border :columns="columns12" :data="data1">
            <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="editBus(row,index)">修改</Button>
                <Button type="error" size="small" @click="remove(index)">删除</Button>
            </template>
        </Table>

        <!-- <Page :total="100" show-total style="margin: 0 0 0 300px;"/> -->
        <div style="margin: 10px;overflow: hidden;">
          <div style="float:left;">
             <Page
                :total="dataCount"
                :page-size="pageSize"
                show-total
                :current="1"
                @on-change="changepage"
                style="margin: 0 0 0 400px;
                       "
            ></Page>
          </div>
        </div>
        <!-- fullscreen -->
        <Modal

        v-model="add"
        title="增加"
        @on-ok="handleSubmitadd('formCustom')"
        @on-cancel="handleReset('formCustom')">
            <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
                <FormItem label="Name:" prop="name">
                    <Input type="text" v-model="formCustom.name" placeholder="请输入姓名"></Input>
                </FormItem>
                <FormItem label="Age:" prop="age">
                    <Input type="text" v-model="formCustom.age" placeholder="请输入年龄" number></Input>
                </FormItem>
                <FormItem label="Address:" prop="address">
                    <Select v-model="formCustom.address" placeholder="选择地址">
                        <Option value="test1">测试地址一</Option>
                        <Option value="test2">测试地址二</Option>
                        <Option value="test3">测试地址三</Option>
                    </Select>
                    <!-- <Input type="text" v-model="formCustom.address" placeholder="请输入地址"></Input> -->
                </FormItem>
            </Form>
        </Modal>

        <Modal
        v-model="update"
        title="修改"
        @on-ok="handleSubmitupdate('formCustom')"
        @on-cancel="handleReset('formCustom')">
        <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
        <FormItem label="Name:" prop="name">
            <Input type="text" v-model="formCustom.name" placeholder="请输入姓名"></Input>
        </FormItem>
        <FormItem label="Age:" prop="age">
            <Input type="text" v-model="formCustom.age" placeholder="请输入年龄" number></Input>
        </FormItem>
        <FormItem label="Address:" prop="address">
            <Select v-model="formCustom.address" placeholder="选择地址">
                <Option value="test1">测试地址一</Option>
                <Option value="test2">测试地址二</Option>
                <Option value="test3">测试地址三</Option>
            </Select>
            <!-- <Input type="text" v-model="formCustom.address" placeholder="请输入地址"></Input> -->
        </FormItem>
        <!-- <FormItem>
            <Button type="primary" @click="handleSubmit('formCustom')">Submit</Button>
            <Button @click="handleReset('formCustom')" style="margin-left: 8px">Reset</Button>
        </FormItem> -->
        </Form>
        </Modal>
    </div>
</template>

<script>
// import { Script } from "vm";
//     let testData = {
//         data6: [
//                     {
//                         name: 'John Brown',
//                         age: 18,
//                         address: 'New York No. 1 Lake Park'
//                     },
//                     {
//                         name: 'Jim Green',
//                         age: 24,
//                         address: 'London No. 1 Lake Park'
//                     },
//                     {
//                         name: 'Joe Black',
//                         age: 30,
//                         address: 'Sydney No. 1 Lake Park'
//                     },
//                     {
//                         name: 'Jon Snow',
//                         age: 261,
//                         address: 'Ottawa No. 2 Lake Park'
//                     },
//                     {
//                         name: 'Jon Snow1',
//                         age: 262,
//                         address: 'Ottawa No. 2.1 Lake Park'
//                     },
//                     {
//                         name: 'Jon Snow2',
//                         age: 263,
//                         address: 'Ottawa No. 2.2 Lake Park'
//                     },
//                     {
//                         name: 'Jon Snow3',
//                         age: 264,
//                         address: 'Ottawa No. 2.3 Lake Park'
//                     },
//                     {
//                         name: '123',
//                         age: 265,
//                         address: 'Ottawa No. 2.4 Lake Park'
//                     }
//                 ]
//     };

    export default {
        data () {
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Name不能为空'));
                } else {
                    // if (this.formCustom.passwdCheck !== '') {
                    //     // 对第二个密码框单独验证
                    //     this.$refs.formCustom.validateField('passwdCheck');
                    // }
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Age不能为空'));
                } 
                // else if (value !== this.formCustom.passwd) {
                //     callback(new Error('The two input passwords do not match!'));
                // } 
                // 模拟异步验证效果
                setTimeout(() => {
                    if (!Number.isInteger(value)) {
                        callback(new Error('输入数字'));
                    } else {
                        if (value < 18) {
                            callback(new Error('必须大于18岁'));
                        } else {
                            callback();
                        }
                    }
                }, 1000);
            };
            const validateAge = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('Address不能为空'));
                }else {
                    callback();
                }
            };
            return {
                dataCount: 0,
                pageSize: 5,
                data1: [],
                // addmodal: false,
                companyName: "",
                columns12: [
                    {
                        title: 'Name',
                        slot: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    },
                    {
                        title: 'Action',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ],
                tableData: [],
                data6: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park'
                    },
                    {
                        name: 'Jon Snow',
                        age: 261,
                        address: 'Ottawa No. 2 Lake Park'
                    },
                    {
                        name: 'Jon Snow1',
                        age: 262,
                        address: 'Ottawa No. 2.1 Lake Park'
                    },
                    {
                        name: 'Jon Snow2',
                        age: 263,
                        address: 'Ottawa No. 2.2 Lake Park'
                    },
                    {
                        name: 'Jon Snow3',
                        age: 264,
                        address: 'Ottawa No. 2.3 Lake Park'
                    },
                    {
                        name: '123',
                        age: 265,
                        address: 'Ottawa No. 2.4 Lake Park'
                    }
                ],
                data7: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park'
                    },
                    {
                        name: 'Jon Snow',
                        age: 261,
                        address: 'Ottawa No. 2 Lake Park'
                    },
                    {
                        name: 'Jon Snow1',
                        age: 262,
                        address: 'Ottawa No. 2.1 Lake Park'
                    },
                    {
                        name: 'Jon Snow2',
                        age: 263,
                        address: 'Ottawa No. 2.2 Lake Park'
                    },
                    {
                        name: 'Jon Snow3',
                        age: 264,
                        address: 'Ottawa No. 2.3 Lake Park'
                    },
                    {
                        name: '123',
                        age: 265,
                        address: 'Ottawa No. 2.4 Lake Park'
                    }
                ],
                update: false,
                add: false,
                formRight: {
                    input1: '',
                    input2: '',
                    input3: ''
                },
                value: '',
                formCustom: {
                    name: '',
                    age: '',
                    address: ''  
                },
                ruleCustom: {
                    name: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    age: [
                        { validator: validatePassCheck, trigger: 'blur' }
                    ],
                    address: [
                        { validator: validateAge, trigger: 'blur' }
                    ]
                },
                input: {
                    Name: '',
                    Age: '',
                    Addreess: ''
                }
            }
        },
              methods: {
            
            handleSubmitadd (name) {
                var self = this;
                this.$refs[name].validate(valid => {
                    if (valid) {
                        var params = JSON.parse(JSON.stringify(self.formCustom));
                        // 获取需要渲染到页面中的数据
                        self.$Message.success("新增成功!");
                        self.data1.push(params);
                    } else {
                        this.$Message.error('新增失败!');
                    }
                })
            },
            remove (index) {
                this.data1.splice(index, 1);
                 this.$Message.info('已删除');
            },
            handleSubmitupdate (name) {
                var self = this;
                this.$refs[name].validate(valid => {
                    if (valid) {   
                        var params = JSON.parse(JSON.stringify(self.formCustom));
                        this.$set(self.data1, self.itemIndex, params);
                        self.$Message.success("修改成功!");
                        self.update = false;
                    } else {
                        this.$Message.error('修改失败!');
                    }
                })
            },
            editBus(item, index) {
                this.update = true;
                this.itemIndex = index;
                this.formCustom = JSON.parse(JSON.stringify(item));
            },
            search() {
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
                    return;
                    }
                }
                // 将查找出来的数据给表格
                // this.data1 = arr;
            },
            handleReset (name) {
                this.$refs[name].resetFields();
                this.$Message.info('取消操作');
            },
            handleListApproveHistory() {
                // 保存取到的所有数据
                this.ajaxHistoryData = this.data6;
                this.dataCount = this.data6.length;
                // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
                if (this.data6.length < this.pageSize) {
                    this.data1 = this.ajaxHistoryData;
                } else {
                    this.data1 = this.ajaxHistoryData.slice(0, this.pageSize);
                }
            },
            changepage(index) {
                this.page = index;
                var _start = (index - 1) * this.pageSize;
                var _end = index * this.pageSize;
                this.data1 = this.ajaxHistoryData.slice(_start, _end);
            },
            mounted() {
        // 页面一加载就将数据给出给表格
            this.data1 = this.data6;
            },
        },
        // mounted() {
        // // 页面一加载就将数据给出给表格
        //     this.data1 = this.data6;
        // },
        created() {
            this.handleListApproveHistory();
        }
        }
           
</script>

<style scoped>

</style>