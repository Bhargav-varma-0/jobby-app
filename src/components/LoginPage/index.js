import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const errorMassage = {
  userError: 'Please Enter User Name',
  passwordError: 'Please Enter Password',
  apiError: "User name and Passwoed didn't match",
}

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    isError: false,
    errmsg: errorMassage.apiError,
  }

  handleSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    if (username.replace(' ', '') === '' && password.replace(' ', '') === '') {
      console.log('b0th')
      // alert('Username and password cannot be empty.')
      this.setState({errmsg: errorMassage.userError, isError: true})
      return
    }
    if (username.replace(' ', '') === '') {
      console.log('1')
      this.setState({errmsg: errorMassage.userError, isError: true})
      return
    }
    if (password.replace(' ', '') === '') {
      console.log('2')
      this.setState({errmsg: errorMassage.passwordError, isError: true})
      return
    }

    const userDetails = JSON.stringify({username, password})
    const options = {
      method: 'POST',
      body: userDetails,
    }
    console.log(username, password)
    console.log(options)
    const response = await fetch('https://apis.ccbp.in/login', options)

    if (response.ok) {
      const responseObject = await response.json()
      console.log(responseObject)
      const jwtToken = responseObject.jwt_token
      if (jwtToken) {
        const {history} = this.props
        Cookies.set('jwt_token', jwtToken, {
          expires: 30,
          path: '/',
        })
        this.setState({isError: false})
        history.replace('/')
      } else {
        this.setState({isError: true, errmsg: errorMassage.apiError})
      }
    } else {
      // had to add error message heare
      this.setState({isError: true})
    }
  }

  handleEvent = event => {
    const {name, value} = event.target
    this.setState({[name]: value})
  }

  render() {
    const {username, password, isError, errmsg} = this.state
    const authToken = Cookies.get('jwt_token')
    if (authToken) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-main flex-cc">
        <div className="login-sub flex-cc flex-msb">
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />

          <form
            className="login-form flex-cc flex-crs"
            onSubmit={this.handleSubmit}
          >
            <label htmlFor="username" className="mt10">
              USERNAME
            </label>
            <input
              type="text"
              className="w100 mtb10 input-log"
              name="username"
              id="username"
              value={username}
              placeholder="Username"
              onChange={this.handleEvent}
            />
            <label htmlFor="password" className="mt10">
              PASSWORD
            </label>
            <input
              type="password"
              className="w100 mtb10 input-log"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={this.handleEvent}
            />

            <button type="submit" className="w100 mtb10 input-log btn-log">
              Login
            </button>
          </form>
          {isError && (
            <div className="error">
              <p>*{errmsg}</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}
export default LoginPage
