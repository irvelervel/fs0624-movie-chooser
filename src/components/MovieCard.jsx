import { Component } from 'react'
import { Alert, Card, Spinner } from 'react-bootstrap'

class MovieCard extends Component {
  state = {
    movieData: {},
    // avere movieData con "null" all'inizio ci permetterà di poter facilmente
    // creare uno spinner o un altro indicatore di caricamento controllando
    // this.state.movieData
    isLoading: true,
    isError: false,
  }

  componentDidMount = () => {
    this.fetchMovieData()
  }

  // ora creiamo una funzione in grado di utilizzare la prop "movieTitle"
  // per avviare una ricerca su OMDB, e salvare in this.state.movieData
  // il risultato più pertinente
  fetchMovieData = () => {
    fetch('http://www.omdbapi.com/?apikey=24ad60e9&s=' + this.props.movieTitle)
      // this.props.movieTitle inizialmente è "Thor"
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Errore nella chiamata')
        }
      })
      .then((data) => {
        console.log('RISULTATI DI RICERCA', data)
        console.log(data.Search[0]) // il primo risultato, il più rilevante
        this.setState({
          movieData: data.Search[0],
          isLoading: false,
        })
      })
      .catch((err) => {
        console.log('ERRORE', err)
        this.setState({
          isLoading: false,
          isError: true,
        })
      })
  }

  render() {
    return (
      <>
        {this.state.isLoading && (
          <div className="text-center">
            <Spinner animation="border" variant="success" />
          </div>
        )}

        {this.state.isError && (
          <Alert variant="danger" className="text-center">
            Errore nel recupero dati
          </Alert>
        )}

        {!this.state.isLoading && !this.state.isError && (
          <Card className="text-center">
            <Card.Img variant="top" src={this.state.movieData.Poster} />
            <Card.Body>
              <Card.Title>{this.state.movieData.Title}</Card.Title>
              <Card.Text>
                {this.state.movieData.Year} - {this.state.movieData.Type}
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </>
    )
  }
}

export default MovieCard
