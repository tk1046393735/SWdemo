<template>
    <Table border :columns="column" :data="form.scoreList">
  <template slot-scope="{ row, index  }" slot="subject">
    <FormItem :prop="`scoreList.${index}.subject`" :label-width="0" :rules="rules.subject">
      <Select v-model="form.scoreList[index].subject" transfer>
        <Option v-for="(item,idx) in subjectList" :key="index + '_' + idx" :value="item.value"
          :disabled="hasSelectedSubject[item.value]">
          {{item.label}}
        </Option>
      </Select>
    </FormItem>
  </template>
  <template slot-scope="{ row, index }" slot="score">
    <FormItem :prop="`scoreList.${index}.score`" :label-width="0" :rules="rules.score">
      <Input v-model="form.scoreList[index].score" />
    </FormItem>
  </template>
  <template slot-scope="{ row, index }" slot="edit">
    <Button type="error" size="small" @click="delSubject(index)">删除</Button>
  </template>
</Table>
</template>

<script>
export default {
    data () {
    return {
      // 表单数据
      form: {
        name: '',
        sex: 'male',
        provinceCode: '',
        cityCode: '',
        scoreList: [{
          subject: '',
          score: ''
        }]
      },
      rules: {
        subject: [
          { required: true, message: '请选择科目！', trigger: 'change' }
        ],
        score: [
          { required: true, message: '请输入成绩！', trigger: 'blur' },
          { pattern: /^\d+$/, message: '成绩必须为整数!', trigger: 'blur' },
          {
            validator (rule, value, callback) {
              value = Number(value)
              if (value <= 100 && value >= 0) {
                callback()
              } else {
                callback(new Error('成绩必须为0-100之间的整数！'))
              }
            },
            message: '请输入成绩！', trigger: 'blur'
          }
        ]
      },
    }
  }
}
</script>
