import {
  Button,
  Layout,
  Tabs,
  Col,
  Spin,
  Row,
  Form,
  Input,
  Divider,
} from "antd"
import "antd/dist/antd.css"
import React, { useState, useRef } from "react"
import { Navigation, Sketches } from "../components"
import Logo from "../images/Sketch.svg"
import { TagOutlined, ProfileOutlined } from "@ant-design/icons"
import { useCollection, useFirebase } from "../firebase"
const { Header, Footer, Sider, Content } = Layout
const Designer = () => {
  const [form1] = Form.useForm()
  const [form, setForm] = useState({ task: "", description: "" })
  const fileInput = useRef(null)
  const onInputChanged = e => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }
  const [loading, setLoading] = useState(false)
  let { data } = useCollection("track")
  const { firebase } = useFirebase()

  const upload = async () => {
    setLoading(true)
    let storage = firebase.storage().ref()
    const file = fileInput.current.files[0]
    if (file != null) {
      var thisRef = storage.child(file.name)
      await thisRef.put(file).then(snapshot => {
        snapshot.ref.getDownloadURL().then(downloadURL => {
          firebase.firestore().collection(`track`).add({
            picture: downloadURL,
            task: form.task,
            description: form.description,
          })
        })
      })
    }
    setForm({ task: "", description: "" })
    fileInput.current.value = ""
    form1.resetFields()
    setLoading(false)
  }
  return (
    <Layout className="simplePage">
      <Header style={{ height: "380px" }} className="designHeader">
        <Navigation />
      </Header>
      <Layout className="bg">
        <Row>
          <Col lg={4}></Col>
          <Col style={{ padding: "25px" }} lg={16}>
            <Tabs defaultActiveKey="1" className="w100">
              <Tabs.TabPane tab="Upload sketch" key="1" >
                <Spin spinning={loading} size="large">
                  <Form onFinish={upload} form={form1}>
                    <Form.Item
                      label="Title"
                      name="title"
                      rules={[
                        { required: true, message: "Please fill this input!" },
                      ]}
                    >
                      <Input
                        id="task"
                        value={form.task}
                        onChange={onInputChanged}
                        size="large"
                        prefix={<ProfileOutlined />}
                        placeholder="Task title..."
                      />
                    </Form.Item>
                    <Form.Item
                      name="description"
                      label="Description"
                      rules={[
                        { required: true, message: "Please fill this input!" },
                      ]}
                    >
                      <Input.TextArea
                        id="description"
                        value={form.description}
                        onChange={onInputChanged}
                        placeholder="Task description..."
                      />
                    </Form.Item>
                    <Form.Item
                      label="Sketch"
                      name="pic"
                      rules={[
                        { required: true, message: "Please fill this input!" },
                      ]}
                    >
                      <input type="file" ref={fileInput} />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="btn-grad "
                        size="large"
                        block
                      >
                        Upload
                      </Button>
                    </Form.Item>
                  </Form>
                </Spin>
              </Tabs.TabPane>

              <Tabs.TabPane tab="Sketches" key="2">
                  <Sketches/>
              </Tabs.TabPane>
            </Tabs>
          </Col>
          <Col lg={4}></Col>
        </Row>
      </Layout>
    </Layout>
  )
}
export default Designer
