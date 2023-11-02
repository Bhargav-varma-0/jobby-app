import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const {history} = props
  const Logout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <ul className="main_header row">
      <li>
        <Link to="/">
          <img
            className="image-header"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
      </li>

      <ul className="row ul-link">
        <li>
          <Link to="/">
            <p className="header-item">Home</p>
          </Link>
        </li>
        <li>
          <Link to="/jobs">
            <p className="header-item ml">Jobs</p>
          </Link>
        </li>
      </ul>
      <li>
        <button className="btn" type="button" onClick={Logout}>
          Logout
        </button>
      </li>
    </ul>
  )
}

export default withRouter(Header)
