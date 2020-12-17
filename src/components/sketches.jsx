import { Divider, Layout, List, Card, Col, Typography, Image, Row } from "antd"
import React from "react"
import { Navigation } from "../components"
import Logo from "../images/Sketch.svg"
import { Link } from "gatsby"
import { useCollection } from "../firebase"
const { Header, Footer, Sider, Content } = Layout
const Sketches = () => {
  let { data } = useCollection("track")
  return (
    <List
      grid={{ gutter: 9, column: 3 }}
      dataSource={data}
      renderItem={item => (
        <List.Item>
          <Card
            hoverable
            cover={<Image src={item.picture} />}
            actions={[
              <Link to={`/track?task=${item.id}`}>Track</Link>,
              <Link to={`/result?task=${item.id}`}>Result</Link>,
            ]}
          >
            <Card.Meta
              title={item.task}
              description={
                item.description ? item.description : "No description"
              }
            />
          </Card>
        </List.Item>
      )}
    ></List>
  )
}
export { Sketches }
