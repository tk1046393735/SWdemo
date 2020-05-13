<template>
  <div class="body">
    <div class="headline">
      <h2>问卷调查</h2>
    </div>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="top">
      <div >
        <div class="f_title">
          <FormItem prop="title">
              <H1 v-model="formValidate.title"></H1>
          </FormItem>
        </div>
        <div class="f_titlemini">
          <FormItem prop="titleMini">
            <!-- <Row>
              <Col span="20">
                <p>(</p>
              </Col>
              <Col span="2"> -->
                <H3 v-model="formValidate.titleMini"></H3>
              <!-- </Col>
              <Col span="2" style="margin-left: -390px;">
                <p>)</p>
              </Col>
            </Row>  -->
          </FormItem>
        </div>
        <div class="f_content">
          <FormItem prop="content">
              <P v-model="formValidate.content"></P>
          </FormItem>
        </div>
      </div>
      
      <div >
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
          <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
        </div>
      </FormItem>
      <!-- <div class="interval">
        <FormItem label="1.你的性别是:" prop="radio_1">
              <RadioGroup v-model="vertical" vertical> 
                <div class="move_l">
                  <Radio label="boy" size=large> 
                    <span>男</span>
                  </Radio>

                  <Radio label="gril" size=large>
                    <span>女</span>
                  </Radio>
                </div>
              </RadioGroup>
        </FormItem>
      </div> -->

      <!-- <div class="interval">
        <FormItem label="2.你的年级是:" prop="radio_1">
              <RadioGroup v-model="vertical" vertical>
                <div class="move_l">
                  <Radio label="one" size=large>
                    <span>一年级</span>
                  </Radio>
  
                  <Radio label="two" size=large>
                    <span>二年级</span>
                  </Radio>

                  <Radio label="three" size=large>
                    <span>三年级</span>
                  </Radio>
                </div>
              </RadioGroup>
        </FormItem>
      </div> -->

      <!-- <div class="interval">
        <FormItem label="3.你的爱好是:" prop="radio_1">
              <RadioGroup v-model="vertical" vertical> 
                <div class="move_l">
                  <Radio label="play" size=large> 
                    <span>娱乐</span>
                  </Radio>

                  <Radio label="other" size=large>
                    <span>其他</span><br>
                  </Radio>
                </div>
              </RadioGroup><br>
              <Input class="in1" v-model="formValidate.radio_1"/>
        </FormItem>
      </div> -->
      <!-- <div class="interval">
        <FormItem label="6.喜欢吃的食物是:" prop="checkbox_1">
          <div class="move_l">
            <Checkbox v-model="single1">香蕉</Checkbox><br>
            <Checkbox v-model="single2">苹果</Checkbox><br>
            <Checkbox v-model="single3">梨</Checkbox><br>
            <Checkbox v-model="single4">榴莲</Checkbox>
          </div>
        </FormItem>
      </div>

      <div class="interval">
        <FormItem label="7.喜欢玩的游戏是:" prop="checkbox_1">
          <div class="move_l">
            <Checkbox v-model="single5">tencent</Checkbox><br>
            <Checkbox v-model="single6">steam</Checkbox><br>
            <Checkbox v-model="single7">bizzard</Checkbox><br>
            <Checkbox v-model="single8">其他</Checkbox><br>
          </div>
          <Input class="in2" v-model="formValidate.checkbox_1"/>
        </FormItem>
      </div> -->
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
                // single1: 'false',
                // single2: 'false',
                // single3: 'false',
                // single4: 'false',
                // single5: 'false',
                // single6: 'false',
                // single7: 'false',
                // single8: 'false',
                formValidate: {
                    radio_1: '',
                    nswerBy: '',
                    answerCompany: '',
                    answerJob: '',
                    answerTime: '',
                    // checkbox_1: '',
                    
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
                }
            }
        },
        mounted() {
          this.addDate();
        },
        methods: {
          addDate() {
                axios({
                  method: 'get',
                  url: 'http://101.132.123.158:8080/questionnaire/qn/{qnId}/question/details',
                }).then(function(res) {
                  console.log(res);
                  var vm = this;
                  vm.formValidate = res.data.data;
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
