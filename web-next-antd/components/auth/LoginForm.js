import { Mutation, withApollo } from "react-apollo";
import Link from 'next/link';
import { Form, Input, Button, Checkbox, Spin, Icon, Alert } from 'antd';
import gql from "graphql-tag";
import cookie from "cookie";
import redirect from "../../lib/redirect";

import "./login.less"

const SIGN_IN = gql`
  mutation Signin($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        username
        role
      }
      token
    }
  }
`;


const LoginForm = ({ getFieldDecorator, antForm, client }) => {
  let email, password;  

  return (
    <Mutation
      mutation={SIGN_IN}
      onCompleted={data => {
        //console.log(data);
        //console.log(data.login.token);
        // Store the token in cookie
        document.cookie = cookie.serialize("token", data.login.token, {
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
      {(signinUser, { loading, error, data }) => (
        

        // if (loading) return "Loading...";
        // if (error) return `Error! ${error.message}`;
        <Form className="login-form"
              onSubmit={e => {
                  e.preventDefault()
                  e.stopPropagation()

                  antForm.validateFields((err, values) => {
                    if (!err) {
                      console.log('Received values of form: ', values);
                    }

                    if (err)
                       return;

                    signinUser({
                      variables: {
                        email: values.email,
                        password: values.password
                      }
                    })
                  });

                }}
        >
              <Form.Item>
                {getFieldDecorator('email', {
                  validateTrigger: '',
                  rules: [
                    { required: true, message: 'Please input your email!' },
                    { type: 'email', message: 'The input is not valid E-mail!'}
                  ],
                })(
                  <Input name='email' prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                  <Input name='password' prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(
                  <Checkbox className="login-form-rememberme">Remember me</Checkbox>
                )}
                <a className="login-form-forgot" href="">Forgot password</a>
                <Button type="primary" htmlType="submit" className="login-form-button" loading = {loading}>
                  Sign in
                </Button>
                <br/>             
                { error && <Alert message={error.message} type="error" showIcon /> }
                OR {'   '}
                <Link prefetch href='/register'>
                  <a>register now!</a>
                </Link>
              </Form.Item>
            </Form>

      )}
    </Mutation>
  );
};

export default withApollo(LoginForm);