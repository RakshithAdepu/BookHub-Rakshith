import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const token = Cookies.get('jwt_token')
    Cookies.remove('jwt_token')

    if (token === undefined) {
      const {history} = props
      history.push('/login')
    }
  }

  return (
    <nav className="navbar">
      <img
        src="https://res.cloudinary.com/dvm3hga6j/image/upload/v1678700544/Group_7731_title_kd3mnv.svg"
        alt="bookHub logo"
        className="header_img_logo"
      />
      <Link to="/" className="Header_home">
        Home
      </Link>
      <Link to="/bookshelves" className="Header_home">
        Bookshelves
      </Link>
      <button type="button" onClick={onClickLogout} className="logout_button">
        logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
