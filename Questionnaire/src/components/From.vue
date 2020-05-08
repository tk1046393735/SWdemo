<template>
  <div class="">
    <!-- <Form :model="formTop" label-position="top" >
        <FormItem label="Title">
            
        </FormItem>
        <FormItem label="Name" prop="name">
            <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
        </FormItem>
        <FormItem label="3.你每个月生活费是多少?">
            <Input v-model="formTop.input1"></Input>
        </FormItem>
        <FormItem label="4.你每个月消费多少?">
            <Input v-model="formTop.input2"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
        </FormItem>
    </Form> -->
    <div class="headline">
      <h2>调查问券</h2>
    </div>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="top">
        <FormItem label="1.你的性别是:" prop="radio_1">
            
              <RadioGroup v-model="vertical" vertical>

                <div class="div1">
                <Radio label="boy">
                  <Icon type="social-apple"></Icon>
                  <span>男</span>
                </Radio>
                </div>

                <div class="div1">
                <Radio label="gril">
                  <Icon type="social-android"></Icon>
                  <span>女</span>
                </Radio>
                </div>

              </RadioGroup>
            
        </FormItem>
        <FormItem label="2.你的年级是:" prop="radio_1">
            
              <RadioGroup v-model="vertical" vertical>

                <div class="div1">
                <Radio label="one">
                  <Icon type="social-apple"></Icon>
                  <span>一年级</span>
                </Radio>
                </div>

                <div class="div1">
                <Radio label="two">
                  <Icon type="social-android"></Icon>
                  <span>二年级</span>
                </Radio>
                </div>

                <div class="div1">
                <Radio label="three">
                  <Icon type="social-android"></Icon>
                  <span>三年级</span>
                </Radio>
                </div>

              </RadioGroup>
          
        </FormItem>
        <FormItem label="3.你每个月生活费是多少?" prop="input_1">
            <Input v-model="formValidate.input_1"></Input>
        </FormItem>
        <FormItem label="4.你每个月消费多少?" prop="input_2">
            <Input v-model="formValidate.input_2"></Input>
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
                vertical: false,
                formValidate: {
                    radio_1: '',
                    input_1: '',
                    input_2: '',

                },
                ruleValidate: {
                    radio_1: [
                        { required: true, trigger: 'blur'}
                    ],
                    input_1: [
                        { required: true, message: '请输入内容', trigger: 'blur' }
                    ],
                    input_2: [
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

<style scoped>
.div1 {
    width: 1000px;
    height: 50px;
    border: 1px solid #e0e0e0;
}
</style>
