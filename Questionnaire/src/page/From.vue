<template>
  <div class="body">
    <div class="headline">
      <h2>问卷调查</h2>
    </div>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="top">
      <div class="interval">
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
      </div>

      <div class="interval">
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
      </div>

      <div class="interval">
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
      </div>

      <div class="interval">
        <FormItem label="4.你每个月生活费是多少?" prop="input_1">
            <Input class="in1" v-model="formValidate.input_1"/>
        </FormItem>
      </div>

      <div class="interval">
        <FormItem label="5.你每个月消费多少?" prop="input_2">
            <Input class="in1" v-model="formValidate.input_2"/>
        </FormItem>
      </div>

      <div class="interval">
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
      </div>

        <FormItem>
          <div class="btn">
            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
          </div>
        </FormItem>
    </Form>
  </div>
</template>

<script>
import {} from '../js/From'

export default {
        name: "from",
        data () {
            return {
                value: '',
                vertical: 'false',
                single1: 'false',
                single2: 'false',
                single3: 'false',
                single4: 'false',
                single5: 'false',
                single6: 'false',
                single7: 'false',
                single8: 'false',
                formValidate: {
                    radio_1: '',
                    input_1: '',
                    input_2: '',
                    checkbox_1: '',
                    
                },
                ruleValidate: {
                    radio_1: [
                        { required: true, message: '请输入内容', trigger: 'blur'}
                    ],
                    input_1: [
                        { required: true, message: '请输入内容', trigger: 'blur' }
                    ],
                    input_2: [
                        { required: true, message: '请输入内容', trigger: 'blur' }
                    ],
                    checkbox_1: [
                        { required: true, message: '请输入内容', trigger: 'blur' }
                    ],
                    
                }
            }
        }
      }

</script>

<style scoped>
.ivu-btn {
    width: 80%!important;
    margin: 0 0 0 12%!important;
}
</style>
