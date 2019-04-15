import Head from "next/head";
import Router from 'next/router'
import { Layout, Row, Col, Menu, Breadcrumb, Icon } from "antd";
import cookie from "cookie";

const { Header, Footer, Content } = Layout;

import "./todo-layout.less";
import redirect from "../../lib/redirect";

export default ({ children, title = "This is the default title", apolloClient }) => {


  function signout(apolloClient) {
    document.cookie = cookie.serialize("token", "", {
      maxAge: -1 // Expire the cookie immediately
    });

    // Force a reload of all the current queries now that the user is
    // logged in, so we don't accidentally leave any state around.
    apolloClient.cache.reset().then(() => {
      // Redirect to a more useful page when signed out
      redirect({}, "/login");
    });
  };

  function handleMenuClick({ key }) {

    if (key === 'home') {
      Router.push('/')
      return;
    }
  
    if (key === 'todos') {
      Router.push('/todos')
      return;
    }

    if (key === 'logout') {
      signout(apolloClient);
      return;
    }
  };

  return (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          style={{ lineHeight: "64px" }}
          onClick = {handleMenuClick}
        >
          <Menu.Item key="home">Home</Menu.Item>
          <Menu.Item key="todos">Todos</Menu.Item>
          <Menu.Item key="users">Users</Menu.Item>
          <Menu.Item key="logout">Logout</Menu.Item>
        </Menu>
      </Header>


      <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ padding: '24px 0', background: '#fff' }}>
          <Breadcrumb.Item href="">
            <Icon type="home" />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="">
            <Icon type="ordered-list" />
            <span>{title}</span>
          </Breadcrumb.Item>
        </Breadcrumb>

        <Row type="flex" justify="center" align="middle">
          <Col xs={24} sm={16} align="middle">
            {children}
          </Col>
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
};
