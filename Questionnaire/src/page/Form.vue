<template>
  <div class="body">
    <div class="headline">
      <h2>问卷调查</h2>
    </div>
    <Form :model="formValidate" label-position="top">
      <div >
        <div class="f_title">
          <FormItem prop="title">
              <H1 v-text="questionnaire.title"></H1>
          </FormItem>
        </div>
        <div class="f_titlemini">
          <FormItem prop="titleMini">
              <H3 v-text="questionnaire.titleMini"></H3>
          </FormItem>
        </div>
        <div class="f_content">
          <FormItem prop="content">
              <P v-text="questionnaire.content"></P>
          </FormItem>
        </div>
      </div>
      
      <div v-for="(item, index) in dataList" :key="index">
           <div class="interval" v-if="item.type=='1'">
            <FormItem :label="item.body" prop="body">
              <RadioGroup v-model="item.id">
                <Radio label="正确" value="0"></Radio>
                <Radio label="错误" value="1"></Radio>
              </RadioGroup>
            </FormItem>
          </div>
          <div class="interval" v-if="item.type=='2'">
            <FormItem :label="item.body" prop="body">
                 <RadioGroup :model="item.id" vertical>
                   <div v-for="(op,index1) in item.list" :key="index1" >
                    <Radio :label="op.op+'、'+op.content" :value="op.questionId"></Radio>
                   </div>
                </RadioGroup>
            </FormItem>
          </div>
          <div class="interval" v-if="item.type=='3'">
            <FormItem :label="item.body" prop="body">
                 <CheckboxGroup  :model="item.id" vertical>
                   <div v-for="(op,index1) in item.list" :key="index1" >
                    <Checkbox  :label="op.op+'、'+op.content" :value="op.questionId"></Checkbox>
                   </div>
                </CheckboxGroup>
            </FormItem>
          </div>
          <div class="interval" v-if="item.type=='4'">
          <FormItem :label="item.body" prop="answerBy">
              <div v-for="(op,index1) in item.list" :key="index1" >
                  <Input class="in1" :model="item.id"/>
              </div>
          </FormItem>
        </div>
      </div>

      <div v-if="questionnaire.anonymousFlag=='1'">
        <div class="interval">
          <FormItem label="答题人" prop="answerBy">
              <Input class="in1" v-model="formValidate.answerBy"/>
          </FormItem>
        </div>

        <div class="interval">
          <FormItem label="答题人公司" prop="answerCompany">
              <Input class="in1" v-model="formValidate.answerCompany"/>
          </FormItem>
        </div>

        <div class="interval">
          <FormItem label="答题人岗位" prop="answerJob">
              <Input class="in1" v-model="formValidate.answerJob"/>
          </FormItem>
        </div>

        <div class="interval">
          <FormItem label="答题时间" prop="answerTime" style="margin-left: 10px;">
              <DatePicker type="date" placeholder="选择调查时间" v-model="formValidate.answerTime" style="width: 100.5%;margin-left: 10px;"></DatePicker>
          </FormItem>
        </div>
      </div>
      
      <FormItem>
        <div class="btn">
          <Button type="primary" @click="submitAnswer('formValidate')">提交</Button>
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
                // single1: 'false',
                // single2: 'false',
                // single3: 'false',
                // single4: 'false',
                // single5: 'false',
                // single6: 'false',
                // single7: 'false',
                // single8: 'false',
                formValidate: {
                },
                ruleValidate: {
                    radio_1: [
                        { required: true, message: '请输入内容', trigger: 'blur'}
                    ],
                    answerBy: [
                        { required: true, message: '请输入答题人姓名', trigger: 'blur' }
                    ],
                    answerCompany: [
                        { required: true, message: '请输入答题人公司', trigger: 'blur' }
                    ],
                    answerJob: [
                        { required: true, message: '请输入答题人岗位', trigger: 'blur' }
                    ],
                    // checkbox_1: [
                    //     { required: true, message: '请输入内容', trigger: 'blur' }
                    // ],
                },
                dataList:[]
            }
        },
        mounted() {
          this.addDate();
        },
        methods: {
          submitAnswer (name) {
            var vm = this;
              console.log(vm.$refs.item);
          },
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
