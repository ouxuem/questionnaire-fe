import { Button, Checkbox, Form, Input, Select, Space } from 'antd'
import React, { useEffect } from 'react'
import { QuestionRadioProps, RadioOptionType } from './component'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
// import { nanoid } from 'nanoid'
const PropComponent: React.FC<QuestionRadioProps> = ({ title, isVertical, value, options = [], onChange, disabled, isRequired }) => {
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({ title, isVertical, value, options, isRequired })
  }, [title, isVertical, value, options, isRequired])

  const handleValuesChange = () => {
    if (onChange == null) return
    const allValues = form.getFieldsValue() as QuestionRadioProps
    const { options = [] } = allValues
    options.forEach((item) => {
      // if (item.value) return
      // item.value = nanoid(5)
      item.value = item.text
    })

    onChange(allValues)
  }
  return (
    <Form disabled={disabled} onValuesChange={handleValuesChange} form={form} layout="vertical" initialValues={{ title, isVertical, value, options, isRequired }}>
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align="baseline">
                    <Form.Item
                      name={[name, 'text']}
                      rules={[
                        { required: true, message: '请输入选项文字...' },
                        {
                          validator: (_, text) => {
                            const { options = [] } = form.getFieldsValue()
                            let num = 0
                            options.forEach((item: RadioOptionType) => {
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
                        placeholder="请输入选项文字..."
                        onBlur={(e) => {
                          const newText = e.target.value
                          const { list } = form.getFieldsValue()
                          list[index].value = newText
                          form.setFieldsValue({ list })
                        }}
                      />
                    </Form.Item>
                    {index > 1 && <MinusCircleOutlined onClick={() => remove(name)} />}
                  </Space>
                )
              })}
              <Form.Item>
                <Button block icon={<PlusOutlined />} type="link" onClick={() => add({ text: '', value: '' })}>
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item label="默认选中" name="value">
        <Select options={options.map(({ text, value }) => ({ value, label: text || '' }))} value={value}></Select>
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
