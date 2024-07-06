import { Button, Checkbox, Form, Input, Space } from 'antd'
import React, { useEffect } from 'react'
import { CheckboxOptionType, QuestionCheckboxProps } from './component'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
// import { nanoid } from 'nanoid'
const PropComponent: React.FC<QuestionCheckboxProps> = ({ title, isVertical, list = [], onChange, disabled, isRequired }) => {
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({ title, isVertical, list, isRequired })
  }, [title, isVertical, list, isRequired])
  const handleValuesChange = () => {
    if (onChange == null) return
    const allValues = form.getFieldsValue() as QuestionCheckboxProps
    const { list = [] } = allValues
    list.forEach((item) => {
      // if (item.value) return
      // item.value = nanoid(5)
      item.value = item.text
    })
    onChange(allValues)
  }
  return (
    <Form disabled={disabled} onValuesChange={handleValuesChange} form={form} layout="vertical" initialValues={{ title, isVertical, list, isRequired }}>
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="list">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align="baseline">
                    <Form.Item valuePropName="checked" name={[name, 'checked']}>
                      <Checkbox />
                    </Form.Item>
                    <Form.Item
                      name={[name, 'text']}
                      rules={[
                        { required: true, message: '请输入选项文字...' },
                        {
                          validator: (_, text) => {
                            const { list = [] } = form.getFieldsValue()
                            let num = 0
                            list.forEach((item: CheckboxOptionType) => {
                              if (item.text === text) {
                                num++
                              }
                            })
                            if (num === 1) {
                              return Promise.resolve()
                            }
                            return Promise.reject(new Error('和其他选项重复！'))
                          },
                        },
                      ]}
                    >
                      <Input
                        onBlur={(e) => {
                          const newText = e.target.value
                          const { list } = form.getFieldsValue()
                          list[index].value = newText
                          form.setFieldsValue({ list })
                        }}
                        placeholder="请输入选项文字..."
                      />
                    </Form.Item>
                    {index > 0 && <MinusCircleOutlined onClick={() => remove(name)} />}
                  </Space>
                )
              })}
              <Form.Item>
                <Button block icon={<PlusOutlined />} type="link" onClick={() => add({ text: '', value: '', checked: false })}>
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
      <Form.Item name="isRequired" valuePropName="checked">
        <Checkbox>是否必填</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
