import {Component} from 'react'
import NavBar from '../NavBar'

import './index.css'

class SingleMovieDetails extends Component {
  state = {movieDetails: {}, castDetails: {}}

  componentDidMount() {
    this.getCastDetails()
    this.getMovieDetails()
  }

  getUpdatedData = responseData => ({
    id: responseData.id,
    posterPath: `https://image.tmdb.org/t/p/w500${responseData.poster_path}`,
    voteAverage: responseData.vote_average,
    title: responseData.title,
    runTime: responseData.runtime,
    releaseDate: responseData.release_date,
    overview: responseData.overview,
    genres: responseData.genres.map(each => ({
      id: each.id,
      name: each.name,
    })),
  })

  getMovieDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const API_KEY = '80e75070ba529ff4c88353c550576d1c'
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-`
    const response = await fetch(apiUrl)
    const fetchedData = await response.json()
    const updatedData = this.getUpdatedData(fetchedData)
    this.setState({movieDetails: updatedData})
  }

  getUpdatedCastData = data => ({
    id: data.id,
    cast: data.cast.map(eachCast => ({
      castId: eachCast.cast_id,
      profilePath: `https://image.tmdb.org/t/p/w500${eachCast.profile_path}`,
      character: eachCast.character,
      name: eachCast.name,
    })),
  })

  getCastDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const API_KEY = '80e75070ba529ff4c88353c550576d1c'
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en`
    const response = await fetch(apiUrl)
    const fetchedData = await response.json()

    const updatedCastData = this.getUpdatedCastData(fetchedData)

    this.setState({castDetails: updatedCastData})
  }

  renderMovieDetails = () => {
    const {movieDetails} = this.state
    const {
      posterPath,
      voteAverage,
      title,
      runTime,
      releaseDate,
      overview,
    } = movieDetails

    return (
      <div className="movie-detail">
        <img src={posterPath} alt={title} className="poster-image" />
        <p className="movie-name">{title}</p>
        <div>
          <p className="title">
            <span>Rating:</span> {voteAverage}
          </p>
          <p className="title">
            <span>Duration:</span> {runTime} min
          </p>
          <p className="title">
            <span>Release Date:</span> {releaseDate}
          </p>
          <p className="title">
            <span>Overview:</span> {overview}
          </p>
        </div>
      </div>
    )
  }

  renderCastDetails = () => {
    const {castDetails} = this.state
    const {cast} = castDetails
    console.log(cast)
  }

  render() {
    return (
      <>
        <NavBar />
        <div className="main-container">
          <div className="movie-details-container">
            <h1 className="movie-details-heading">Movie Details</h1>
            {this.renderMovieDetails()}
          </div>
          <div className="movie-details-container-cast">
            {this.renderCastDetails()}
          </div>
        </div>
      </>
    )
  }
}

export default SingleMovieDetails
