<template>
  <div class="body">
    <div class="headline">
      <h2>编辑问卷</h2>
    </div>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="top">
      <div class="interval">
        <FormItem label="1.问卷主题" prop="input_1">
            <Input class="in1" v-model="formValidate.input_1"/>
        </FormItem>
      </div>

      <div class="interval">
        <FormItem label="2.问卷小标题" prop="input_2">
            <Input class="in1" v-model="formValidate.input_2"/>
        </FormItem>
      </div>

      <div class="interval">
        <FormItem label="3.调查人员" prop="input_3">
            <Input class="in1" v-model="formValidate.input_3"/>
        </FormItem>
      </div>

      <div class="interval">
        <div class="e_datebox">
          <FormItem label="调查时间">
            <Row>
              <div class="e_date">
                <Col span="5">
                    <FormItem prop="date">
                        <DatePicker type="date" placeholder="选择日期" v-model="formValidate.date" style="300px!important;"></DatePicker>
                    </FormItem>
                </Col>
              </div>
              
              <div class="e_line">
                <Col span="1" style="text-align: center">
                -
                </Col>
              </div>
              
              <div class="e_time">
                <Col span="5">
                    <FormItem prop="time">
                        <TimePicker type="time" placeholder="选择时间" v-model="formValidate.time"></TimePicker>
                    </FormItem>
                </Col>
              </div>
            </Row>
          </FormItem>
        </div> 
      </div>

      <div class="interval">
        <FormItem label="4.问卷描述" prop="desc">
            <Input class="in1" v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入问题描述..." />
        </FormItem>
      </div>

      <FormItem>
          <div class="e_btn">
          <Button type="primary" @click="create">编辑问卷</Button>
          <Button type="default" @click="back">取消编辑</Button>
          </div>
      </FormItem> 
    </Form>
  </div>
</template>

<script>
export default {
        data () {
            return {
                value: '',
                formValidate: {
                    input_1: '',
                    input_2: '',
                    input_3: '',
                    input_4: '',
                    date: '',
                    desc: ''
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
                    input_3: [
                        { required: true, message: '请输入内容', trigger: 'blur' }
                    ],
                    date: [
                        { required: true, type: 'date', message: '请选择时间', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请输入问卷描述', trigger: 'blur' },
                        // { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
          create() {
            this.$Message.success('编辑成功');
            this.$router.push({path: '/handel'});
          },
          back() {
            this.$Message.error('编辑取消');
            this.$router.push({path: '/handel'});
          }
        }
      }

</script>

<style scoped>
.e_datebox {
  margin: 50px 0 0 20px;
}
.e_date {
  margin: -35px 0 0 100px;
}
.e_btn {
  margin: 0 0 0 80%;
}
</style>
