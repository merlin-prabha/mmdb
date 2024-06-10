import {Link, withRouter} from 'react-router-dom'
import MovieContext from '../../context/MovieContext'
import './index.css'

const NavBar = props => {
  const renderSearchBar = () => (
    <MovieContext.Consumer>
      {value => {
        const {onTriggerSearchQuery, searchInput, onChangeSearchInput} = value

        const onChangeInput = event => {
          onChangeSearchInput(event.target.value)
        }

        const onSearch = event => {
          event.preventDefault()
          onTriggerSearchQuery()
          const {history} = props
          history.push('/search')
        }

        return (
          <form className="input-container" onSubmit={onSearch}>
            <input
              type="search"
              className="search"
              onChange={onChangeInput}
              value={searchInput}
              placeholder="Search"
            />
            <button type="submit" className="search-btn">
              Search
            </button>
          </form>
        )
      }}
    </MovieContext.Consumer>
  )
  return (
    <nav className="navbar">
      <Link to="/" className="link-element">
        <h1 className="heading">movieDB</h1>
      </Link>
      <div className="center">
        <ul className="navigation-buttons">
          <li className="list">
            <Link to="/" className="link-element">
              <button type="button" className="nav-btn">
                Popular
              </button>
            </Link>
          </li>
          <li className="list">
            <Link to="/top-rated" className="link-element">
              <button type="button" className="nav-btn">
                Top Rated
              </button>
            </Link>
          </li>
          <li className="list">
            <Link to="/upcoming" className="link-element">
              <button type="button" className="nav-btn">
                Upcoming
              </button>
            </Link>
          </li>
        </ul>
      </div>
      <div className="center">{renderSearchBar()}</div>
    </nav>
  )
}

export default withRouter(NavBar)
