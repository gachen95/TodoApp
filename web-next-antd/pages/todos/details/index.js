import React from "react";
import { Breadcrumb, Skeleton, Icon, Empty, Button, Row, Col } from "antd";
import redirect from "../../../lib/redirect";
import checkLoggedIn from "../../../lib/checkLoggedIn";
import Layout from "../../../layouts/todo";

import withData from "./data";

class Todo extends React.Component {
  static async getInitialProps(context, apolloClient) {
    const { loggedInUser } = await checkLoggedIn(context.apolloClient);

    if (!loggedInUser.me) {
      // If not signed in, send them somewhere more useful
      redirect(context, "/login");
    }

    const { id } = context.query;

    return {
      loggedInUser,
      id
    };
  }

  render() {
    const type = "todo";
    const title = "Todo";

    const {
      id,
      data: { loading, getTodoById }
    } = this.props;

    return (
      <Layout title="Todo">
        <Breadcrumb>
          <Breadcrumb.Item href="">
            <Icon type="home" />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="">
            <Icon type="smile" theme="outlined" />
            <span>{title}</span>
          </Breadcrumb.Item>
        </Breadcrumb>

        <div>
          {loading ? (
            <Skeleton paragraph={{ rows: 6 }} active />
          ) : (
            <div>
              {!getTodoById ? (
                <Empty />
              ) : (
                <Row type="flex">
                  <Col span={6}>{getTodoById.title}</Col>
                  <Col span={18}>{getTodoById.description}</Col>
                </Row>
              )}
            </div>
          )}
        </div>
      </Layout>
    );
  }
}

export default withData(Todo);
