<template>
  <div class="">
    <div class="headline">
      <h2>问卷调查</h2>
    </div>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="top">
        <FormItem label="1.你的性别是:" prop="radio_1">
              <RadioGroup v-model="vertical" vertical> 
                <Radio label="boy"> 
                  <span>男</span>
                </Radio>

                <Radio label="gril">
                  <span>女</span>
                </Radio>
              </RadioGroup>
        </FormItem>

        <FormItem label="2.你的年级是:" prop="radio_1">
              <RadioGroup v-model="vertical" vertical>
                <Radio label="one">
                  <span>一年级</span>
                </Radio>
  
                <Radio label="two">
                  <span>二年级</span>
                </Radio>

                <Radio label="three">
                  <span>三年级</span>
                </Radio>
              </RadioGroup>
        </FormItem>

        <FormItem label="3.你的爱好是:" prop="radio_1">
              <RadioGroup v-model="vertical" vertical> 
                <Radio label="play"> 
                  <span>玩</span>
                </Radio>

                <Radio label="other">
                  <span>其他</span><br>
                </Radio>
              </RadioGroup><br>
              <Input v-model="formValidate.radio_1" style="width: 300px" />
        </FormItem>

        <FormItem label="4.你每个月生活费是多少?" prop="input_1">
            <Input v-model="formValidate.input_1"></Input>
        </FormItem>
        <FormItem label="5.你每个月消费多少?" prop="input_2">
            <Input v-model="formValidate.input_2"></Input>
        </FormItem>

        <FormItem label="6.喜欢吃的食物" prop="checkbox_1">
          <Checkbox v-model="single1">香蕉</Checkbox><br>
          <Checkbox v-model="single2">苹果</Checkbox><br>
          <Checkbox v-model="single3">梨</Checkbox><br>
          <Checkbox v-model="single4">榴莲</Checkbox>
        </FormItem>

        <FormItem label="7.喜欢玩的游戏" prop="checkbox_1">
          <Checkbox v-model="single5">tencent</Checkbox><br>
          <Checkbox v-model="single6">steam</Checkbox><br>
          <Checkbox v-model="single7">bizzard</Checkbox><br>
          <Checkbox v-model="single8">其他</Checkbox><br>
          <Input v-model="formValidate.checkbox_1" style="width: 300px" />
        </FormItem>

        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
        </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
        data () {
            return {
                // formTop: {
                //     input1: '',
                //     input2: ''
                // }
                value: '',
                vertical: false,
                single1: false,
                single2: false,
                single3: false,
                single4: false,
                single5: false,
                single6: false,
                single7: false,
                single8: false,
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
        },
        methods: {
            // handleSubmit (name) {
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
            // }
        }
      }

</script>

<style>
.ivu-form .ivu-form-item-label {
  font-size: 20px;
}
.ivu-radio-wrapper {
  font-size: 15px;
}
.ivu-checkbox-wrapper {
  font-size: 15px;
}
</style>

<style scoped>
/* .div1 {
    width: 1000px;
    height: 50px;
    border: 1px solid #e0e0e0;
} */
h2 {
    text-align: center;
    margin: 30px 0;
    color: #1ea0fa;
    font-size: 24px;
}

</style>
