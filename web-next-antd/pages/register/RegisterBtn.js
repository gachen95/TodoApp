import { Mutation, withApollo } from "react-apollo";
import gql from "graphql-tag";
import cookie from "cookie";
import {
  Button,
  Alert,
  Spin,
  Icon
} from "antd";
import redirect from "../../lib/redirect";

const CREATE_USER = gql`
  mutation Create($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      user {
        id
        username
        role
      }
      token
    }
    # signinUser(email: { email: $email, password: $password }) {
    #   token
    # }
  }
`;

const RegisterBtn = ({ antdForm, client }) => {
  let username, email, password;

  return (
    <Mutation
      mutation={CREATE_USER}
      // variables={{ email, password, username }}
      onCompleted={data => {
        // Store the token in cookie
        document.cookie = cookie.serialize("token", data.signup.token, {
          maxAge: 30 * 24 * 60 * 60 // 30 days
        });
        // Force a reload of all the current queries now that the user is
        // logged in
        client.cache.reset().then(() => {
          redirect({}, "/todos");
        });
      }}
      onError={error => {
        // If you want to send error to external service?
        console.log(error);
      }}
    >
      {(create, { data, loading, error }) => (
      <div>
       <Button
          type="primary"
          htmlType="submit"
          icon="login"
          loading = {loading}
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();

            antdForm.validateFields((err, values) => {
              if (!err) {
                console.log("Received values of form: ", values);
              }

              if (err) return;

              create({
                variables: {
                  username: values.username,
                  email: values.email,
                  password: values.password
                }
              });
            });

            //username.value = email.value = password.value = ''
          }}
        >
          Register
        </Button>  
        <br/>             
        { error && <Alert message={error.message} type="error" showIcon /> }
        </div>
        
      )}
    </Mutation>
  );
};

export default withApollo(RegisterBtn);
