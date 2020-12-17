import { Divider, Layout, List, Card, Col, Typography, Image, Row } from "antd"
import React from "react"
import { Navigation, Sketches } from "../components"
import Logo from "../images/Sketch.svg"
import { Link } from "gatsby"
import { useCollection } from "../firebase"
const { Header, Footer, Sider, Content } = Layout
const Designer = () => {
  let { data } = useCollection("track")
  return (
    <Layout className="simplePage">
      <Header style={{ height: "380px" }} className="designHeader">
        <Navigation />
      </Header>
      <Layout className="bg">
        <Row>
          <Col lg={4}></Col>

          <Col style={{ padding: "25px" }} lg={16}>
            <Typography.Title>Sketches</Typography.Title>
            <Divider></Divider>
            <Sketches />
          </Col>

          <Col lg={4}></Col>
        </Row>
      </Layout>
    </Layout>
  )
}
export default Designer
