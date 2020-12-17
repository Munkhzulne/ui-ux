import React, { useContext } from "react"
import { Link } from "gatsby"
// import { App } from "./"
// import { AuthContext } from "../contexts/AuthContext"
// import { useDocumentWithAccount } from "../firebase"
import { Layout, Row, Col, Menu, Space, Dropdown, Spin } from "antd"
import Logo from "../images/Sketch.svg"

const Navigation = () => {
  // const { user, ready } = useContext(AuthContext)
  return (
    <Layout.Header className="bg" style={{ padding: "10px" }}>
      <Row justify="space-between" className="w100">
        <Col offset={2} lg={4}>
          <Link to="/">
            <img src={Logo} width={160}></img>
          </Link>
        </Col>

        <Col offset={11} style={{ alignContent: "end" }}>
          <Space size="large">
            <Link style={{ fontSize: "18px", color: "#BDBDBD" }}>Log In</Link>
            <Link style={{ fontSize: "18px", color: "#4776e6" }}>Sign Up</Link>
          </Space>
        </Col>
        <Col lg={1}></Col>
      </Row>
    </Layout.Header>
  )
}
export { Navigation }
