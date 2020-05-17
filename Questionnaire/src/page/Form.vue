<template>
  <div class="body">
    <Form :ref="formValidate" :model="formValidate" :rules='ruleValidate' label-position="top">
      <div >
        <div class="f_title">
          <FormItem prop="title">
              <H2 v-text="questionnaire.title"></H2>
          </FormItem>
        </div>
        <div class="f_titlemini">
          <FormItem prop="titleMini">
              <H3>( {{ questionnaire.titleMini }} )</H3>
          </FormItem>
        </div>
        <div class="f_content">
          <FormItem prop="content">
              <P v-text="questionnaire.content"></P>
          </FormItem>
        </div>
      </div>

      <div v-for="(item, index) in dataList" :key="index">
          <div class="interval" v-if="item.type=='1'||item.type=='2'">
            <FormItem 
            v-for="(item, index) in formValidate.items"
            v-if="item.status"
            :label="(index+1)+'. '+item.body" 
            :key="index"
            :prop="'items.' + index + '.value'"
            :rules="{required: true, message: '请选择单选选项', trigger: 'blur'}">
              <div  style="margin-left: 20px;">
                <RadioGroup v-model="list[item.id+'-'+item.type]" vertical>
                   <div v-for="(op,index1) in item.list" :key="index1" >
                    <Radio :label="op.id"><span v-if="item.type=='2'">{{op.op+'、'}}</span>{{op.content}}</Radio>
                   </div>
                </RadioGroup>
              </div> 
            </FormItem>
          </div>
          <div class="interval" v-if="item.type=='3'">
            <FormItem 
            v-for="(item, index) in formValidate.items"
            v-if="item.status"
            :label="(index+1)+'. '+item.body" 
            :key="index"
            :prop="'items.' + index + '.value'"
            :rules="{required: true, message: '请选择多选选项', trigger: 'blur'}">
              <div style="margin-left: 20px;">
                <CheckboxGroup  v-model="list[item.id+'-'+item.type]" vertical>
                   <div v-for="(op,index1) in item.list" :key="index1" >
                    <Checkbox :label="op.id" :value="op.questionId">{{op.op+'、'+op.content}}</Checkbox>
                   </div>
                </CheckboxGroup>
              </div>
            </FormItem>
          </div>
          <div class="interval" v-if="item.type=='4'">
              <FormItem 
              :label="(index+1)+'. '+item.body"
              v-for="(item, index) in formValidate.items"
              v-if="item.status"
              :key="index"
              :prop="'items.' + index + '.value'"
              :rules="{required: true, message: '请输入内容', trigger: 'blur'}" >
                <div v-for="(op,index1) in item.list" :key="index1">
                    <Input class="in1" v-model="list[item.id+'-'+item.type]"/>
                </div>
              </FormItem>
          </div>
      </div>

      <div v-if="questionnaire.anonymousFlag=='1'">
        <div class="interval">
          <FormItem label="答题人" prop="answerBy">
              <Input class="in1" v-model="formValidate['answerBy']"/>
          </FormItem>
        </div>

        <div class="interval">
          <FormItem label="答题人公司" prop="answerCompany">
              <Input class="in1" v-model="formValidate['answerCompany']"/>
          </FormItem>
        </div>

        <div class="interval">
          <FormItem label="答题人岗位" prop="answerJob">
              <Input class="in1" v-model="formValidate['answerJob']"/>
          </FormItem>
        </div>

        <div class="interval">
          <FormItem label="答题时间" prop="answerTime" style="margin-left: 0px;">
              <DatePicker type="date" format="yyyy-MM-dd" placeholder="选择调查时间" v-model="formValidate['answerTime']" style="width: 100%;margin-left: 20px;"></DatePicker>
          </FormItem>
        </div>
      </div>
      
      <FormItem>
        <div class="btn">
          <Button type="primary" @click="submitAnswer(formValidate)">提交</Button>
        </div>
      </FormItem>
      
    </Form>
  </div>
</template>

<script>
import {} from '../js/From'
import axios from 'axios'

export default {
        name: "from",
        data () {
            return {
                value: '',
                vertical: 'false',
                questionnaire:{},
                list:{},
                formValidate: {
                  title:'',
                  titleMini:'',
                  content:'',
                  items: [
                        {
                            value: '',
                            index: 1,
                            status: 1
                        }
                    ]
                },
                ruleValidate: {
                    answerBy: [
                        { required: true, message: '请输入答题人姓名', trigger: 'blur' }
                    ],
                    answerCompany: [
                        { required: true, message: '请输入答题人公司', trigger: 'blur' }
                    ],
                    answerJob: [
                        { required: true, message: '请输入答题人岗位', trigger: 'blur' }
                    ],
                    answerTime: [
                        { required: true, message: '请输入答题时间', type: 'date', trigger: 'blur' }
                    ],
                    
                },
                dataList:[]
            }
        },
        mounted() {
          this.addDate();
        },
        methods: {
          submitAnswer (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                      var vm = this;
                      console.log(JSON.stringify(vm.list));
                      vm.formValidate['list'] = vm.list;
                      console.log(JSON.stringify(vm.formValidate));
                      var qnId = vm.$route.params.id;
                      vm.formValidate['qnId'] = qnId;
                      axios({
                            method: 'post',
                            url: 'http://101.132.123.158:8080/questionnaire/answer',
                            data:vm.formValidate
                          }).then(function(res) {
                            var data = res.data.data;
                            vm.$router.push({path: '/thank'});
                          }).catch(function(err) {
                            this.$Message.error('提交失败');
                          })
                        this.$Message.success('问卷提交成功');
                    } else {
                        this.$Message.error('请回答完问卷的所有问题');
                    }
                })
            },
 
          // submitAnswer () {
          //   var vm = this;
          //   console.log(JSON.stringify(vm.list));
          //   vm.formValidate['list'] = vm.list;
          //   console.log(JSON.stringify(vm.formValidate));
          //   var qnId = vm.$route.params.id;
          //   vm.formValidate['qnId'] = qnId;
          //   axios({
          //         method: 'post',
          //         url: 'http://101.132.123.158:8080/questionnaire/answer',
          //         data:vm.formValidate
          //       }).then(function(res) {
          //         var data = res.data.data;
          //         vm.$router.push({path: '/thank'});
          //       }).catch(function(err) {
          //         this.$Message.error('提交失败');
          //       })
          // },
          addDate() {
                var vm = this;
                var qnId = vm.$route.params.id;
                axios({
                  method: 'get',
                  url: 'http://101.132.123.158:8080/questionnaire/qn/'+ qnId +'/question/details',
                }).then(function(res) {
                  var data = res.data.data;
                  vm.questionnaire = data;
                  vm.dataList = data.list;
                }).catch(function(err) {
                  console.log(err);
                })
            }
        }
      }
</script>

<style scoped>
.ivu-btn {
    width: 80%!important;
    margin: 0 0 0 12%!important;
}
.f_title {
  text-align:center;
}
.f_titlemini {
  text-align:center;
}
.f_content {
  text-align:center;
}
</style>
