import React from 'react'
import { Form } from 'antd';

import redirect from '../../lib/redirect'
import checkLoggedIn from '../../lib/checkLoggedIn'

import LoginForm from '../../components/auth/LoginForm'

import Layout from '../../layouts/default';

class Login extends React.Component {

  state = {
    email: '',
    password: '',
  }

  static async getInitialProps (context) {
    const { loggedInUser } = await checkLoggedIn(context.apolloClient)

    if (loggedInUser.me) {
      // Already signed in? No need to continue.
      // Throw them back to the main page
      redirect(context, '/todos')
    }

    return {}
  }

  render () {
    const { getFieldDecorator } = this.props.form;

    return (
      <Layout title="Sign In">
        <React.Fragment>
          {/* LoginForm handles all login logic. */}
          <LoginForm {...{getFieldDecorator, antForm: this.props.form}}/>
    
        </React.Fragment>
      </Layout>
    )
  }
}

export default Form.create({ name: 'normal_login' })(Login)