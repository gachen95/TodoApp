import React from "react";
import cookie from "cookie";
import { ApolloConsumer } from "react-apollo";
import { Row, Col } from "antd";

import redirect from "../lib/redirect";
import checkLoggedIn from "../lib/checkLoggedIn";
import Layout from "../layouts/todo";

export default class Index extends React.Component {
  static async getInitialProps(context, apolloClient) {
    const { loggedInUser } = await checkLoggedIn(context.apolloClient);

    if (!loggedInUser.me) {
      // If not signed in, send them somewhere more useful
      redirect(context, "/login");
    }

    return { loggedInUser };
  }

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <Layout title="Home" apolloClient={client}>
            <Row justify="space-around" type="flex">
              <Col span={20}>
                <div>
                  Hello {this.props.loggedInUser.me.username}!<br />
                </div>
              </Col>
            </Row>
          </Layout>
        )}
      </ApolloConsumer>
    );
  }
}
