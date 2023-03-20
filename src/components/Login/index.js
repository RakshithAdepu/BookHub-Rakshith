import {Component} from 'react'

import './index.css'

import Cookies from 'js-cookie'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showErrorMsg: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onFailure = msg => {
    this.setState({showErrorMsg: true, errorMsg: msg})
  }

  onSuccess = jswToken => {
    const {history} = this.props
    console.log(jswToken)
    Cookies.set('jwt_token', jswToken, {expires: 30})
    history.push('/')
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const responseData = await response.json()

    const jswToken = responseData.jwt_token
    if (response.ok === false) {
      this.onFailure(responseData.error_msg)
    } else {
      this.onSuccess(jswToken)
      this.setState({
        showErrorMsg: false,
      })
    }
    this.setState({username: '', password: ''})
  }

  renderUsername = () => {
    const {username} = this.state
    return (
      <div className="username_cont">
        <label className="label" htmlFor="username">
          Username*
        </label>
        <input
          id="username"
          type="text"
          placeholder="Enter Username"
          className="inputEle"
          onChange={this.onChangeUsername}
          value={username}
        />
      </div>
    )
  }

  renderPassword = () => {
    const {password} = this.state
    return (
      <div className="password_cont">
        <label className="label" htmlFor="password">
          Password*
        </label>
        <input
          className="inputEle"
          id="password"
          type="password"
          placeholder="Enter password"
          onChange={this.onChangePassword}
          value={password}
        />
      </div>
    )
  }

  render() {
    const {errorMsg, showErrorMsg} = this.state

    const {bookshelvesList} = this.props

    console.log(bookshelvesList)

    return (
      <div className="Login_page">
        <div>
          <img
            src="https://res.cloudinary.com/dvm3hga6j/image/upload/v1678699177/Rectangle_1467_1x_bqdhc0.jpg"
            className="page_left_part_image"
            alt="image_login_page"
          />
        </div>
        <div className="page_right_part">
          <form className="login_form" onSubmit={this.onSubmitForm}>
            <img
              src="https://res.cloudinary.com/dvm3hga6j/image/upload/v1678700544/Group_7731_title_kd3mnv.svg"
              alt="logo"
            />
            <div>{this.renderUsername()}</div>
            <div>{this.renderPassword()}</div>
            {showErrorMsg ? (
              <div>
                <p className="error_msg">{errorMsg}</p>
              </div>
            ) : (
              ''
            )}
            <button className="login_btn" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
