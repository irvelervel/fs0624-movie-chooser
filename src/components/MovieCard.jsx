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

  render() {
    return (
      <>
        {this.state.isLoading && (
          <div className="text-center">
            <Spinner animation="border" variant="success" />
          </div>
        )}
        {this.state.isError && (
          <Alert variant="danger">Errore nel recupero dati</Alert>
        )}
        {!this.state.isLoading && !this.state.isError && (
          <Card className="text-center">
            <Card.Img variant="top" src="https://placedog.net/300" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </>
    )
  }
}

export default MovieCard
