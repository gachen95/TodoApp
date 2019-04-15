import React from "react";
import cookie from "cookie";
import { ApolloConsumer } from "react-apollo";
import { Breadcrumb, Icon, Row, Col, Card, Content } from "antd";

import redirect from "../../lib/redirect";
import checkLoggedIn from "../../lib/checkLoggedIn";
import Layout from "../../layouts/todo";
//import ListPage from '../components/ListPage'

import ListPage from "../../components/ListPage";
import withData from "./data";

class Todos extends React.Component {
  static async getInitialProps(context, apolloClient) {
    const { loggedInUser } = await checkLoggedIn(context.apolloClient);

    if (!loggedInUser.me) {
      // If not signed in, send them somewhere more useful
      redirect(context, "/login");
    }

    return { loggedInUser };
  }

  signout = apolloClient => () => {
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

  render() {
    const type = "todos";
    const title = "Todos";

    const { loading, data, page, count, loadPage } = this.props;

    return (
      <ApolloConsumer>
        {client => (
          <Layout title="Todo List" apolloClient={client}>
            <Row justify="space-around" type="flex">
              <Col span={20}>
                <ListPage
                  onPagerChange={loadPage}
                  page={page}
                  count={count}
                  loading={loading}
                  data={data}
                  type={type}
                  title={title}
                />
              </Col>
            </Row>
          </Layout>
        )}
      </ApolloConsumer>
    );
  }
}

export default withData(Todos);
