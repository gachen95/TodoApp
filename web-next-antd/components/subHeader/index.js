import { Breadcrumb, Icon, Row, Col, Layout, Card, Carousel } from "antd";
import Link from "next/link";
import { withRouter } from "next/router";
import cookie from "cookie";
import { ApolloConsumer } from "react-apollo";


// signout = apolloClient => () => {
//   document.cookie = cookie.serialize("token", "", {
//     maxAge: -1 // Expire the cookie immediately
//   });

//   // Force a reload of all the current queries now that the user is
//   // logged in, so we don't accidentally leave any state around.
//   apolloClient.cache.reset().then(() => {
//     // Redirect to a more useful page when signed out
//     redirect({}, "/login");
//   });
// };

// https://github.com/adamsoffer/next-apollo-example/blob/master/components/Header/styles.js
// active link
const SubHeader = ({ router: { pathname } }) => (
  <Row> 
    <Col
      span={24}
      style={{
        width: '100%',
        height: 50,
        display: "flex",
        paddingTop: "10px",
        paddingLeft: "20px",
        paddingRight: "20px",
        justifyContent: "flex-end",
        textTransform: "uppercase"
      }}
    >
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>{"    "}
        |
        <Link href="/todos">
          <a>&nbsp;Todo</a>
        </Link>{"     "}
        |
        <Link href="/users">
          <a>&nbsp;User</a>
        </Link>{"  "}
        |
        <Link href="/logout">
          <a onClick={() => console.log('Does not work')}>&nbsp;Logout</a>
        </Link>
      </nav>
    </Col>
  </Row>
);

export default withRouter(SubHeader);
