import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete
} from "antd";
import React from "react";
import Link from 'next/link';

import redirect from "../../lib/redirect";
import checkLoggedIn from "../../lib/checkLoggedIn";
import Layout from "../../layouts/default";
import RegisterBtn  from "./RegisterBtn"

import './register.less'

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    username: "",
    //email: '',
    password: ""
  };

  static async getInitialProps(context) {
    const { loggedInUser } = await checkLoggedIn(context.apolloClient);

    if (loggedInUser.me) {
      // Already signed in? No need to continue.
      // Throw them back to the main page
      redirect(context, "/");
    }

    return {};
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  validateToCheckAgreement = (rule, value, callback) => {    
    if (!value) {
       callback("Please check the agreement to continue!");
    }
    else callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const antdForm = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 17 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 17,
          offset: 7
        }
      }
    };

    return (
      <Layout title="Register">
        <Form {...formItemLayout} className="register-form">
          <Form.Item label="E-mail">
            {getFieldDecorator("email", {
              rules: [
                {
                  type: "email",
                  message: "The input is not valid E-mail!"
                },
                {
                  required: true,
                  message: "Please input your E-mail!"
                }
              ]
            })(<Input/>)}
          </Form.Item>
          <Form.Item label="Password">
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "Please input your password!"
                },
                {
                  validator: this.validateToNextPassword
                }
              ]
            })(<Input type="password"/>)}
          </Form.Item>
          <Form.Item label="Confirm Password">
            {getFieldDecorator("confirm", {
              rules: [
                {
                  required: true,
                  message: "Please confirm your password!"
                },
                {
                  validator: this.compareToFirstPassword
                }
              ]
            })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
          </Form.Item>
          <Form.Item
            label={
              <span>
                Nickname&nbsp;
                <Tooltip title="What do you want others to call you?">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator("username", {
              rules: [
                {
                  required: true,
                  message: "Please input your nickname!",
                  whitespace: false
                },
                {
                    min:3, 
                    max:10,
                    message:'Length must be between 3 and 10!'
                },
                {
                    pattern:new RegExp('^\\w+$','g'),
                    message:'Nickname must be letters or number'
                }
              ]
            })(<Input />)}
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            {getFieldDecorator("agreement", {
              valuePropName: "checked",
              rules: [
                {
                    validator: this.validateToCheckAgreement
                }
              ]
            })(
              <Checkbox style={{float: "left"}}>
                I have read the <a href="">agreement</a>
              </Checkbox>
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <RegisterBtn {...{antdForm: this.props.form}}/>

            Already have an account?{' '}
            <Link prefetch href='/login'>
                <a>Sign In</a>
            </Link>
          </Form.Item>

        </Form>
        
        
      </Layout>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: "register" })(
  RegistrationForm
);

export default WrappedRegistrationForm;
