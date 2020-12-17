import React, { createRef, useState } from "react"
import { Link, navigate } from "gatsby"
import { useFirebase, useCollection } from "../firebase"
import { Landing, Navigation } from "../components"
import { Layout, Row, Col, Space, Button, Typography } from "antd"
import "../css/index.css"
const IndexPage = () => {
  return (
    <Layout className="landingPage">
      <Navigation/>
      <Landing/>
    </Layout>
  )
}

export default IndexPage
