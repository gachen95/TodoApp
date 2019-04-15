import Link from "next/link";
import Head from "next/head";

import { Layout, Row, Col } from "antd";

import "./layout.less";

const { Header, Footer, Sider, Content } = Layout;

export default ({ children, title = "This is the default title" }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

    <Layout>
      <Header style={{ textAlign: "center", backgroundColor: "#f8f8f8" }}>
        <h1>{title}</h1>
      </Header>

      <Content className="center">
        <Row type="flex" justify="center" align="middle">
          <Col xs={24} sm={8} align="middle">{children}</Col>
        </Row>
      </Content>

      <Footer style={{ textAlign: "center" }}>
        {
          "This is an example app using client (Nextjs, Express, Apollo GraphQL, Antd) and server(Nest, Prisma)"
        }
      </Footer>
    </Layout>
  </div>
);
