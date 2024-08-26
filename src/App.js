import { Col, Container, Row, Form } from 'react-bootstrap'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Component } from 'react'
import MovieCard from './components/MovieCard'

class App extends Component {
  state = {
    movieTitle: 'Thor',
  }

  render() {
    return (
      <div className="App-header">
        {/* DROPDOWN DI SELEZIONE FILM */}
        <Container>
          <Row className="justify-content-center mb-4">
            <Col xs={12} md={8} lg={6}>
              <h2 className="text-center">Scegli il tuo film preferito!</h2>
              <Form.Select
                aria-label="Default select example"
                value={this.state.movieTitle}
                onChange={(e) => {
                  this.setState({
                    movieTitle: e.target.value,
                  })
                }}
              >
                <option>Thor</option>
                <option>Captain America</option>
                <option>Black Widow</option>
                <option>Avengers</option>
                <option>Hulk</option>
                <option>Groot</option>
                <option>Iron Man</option>
              </Form.Select>
            </Col>
          </Row>

          {/* Qui sotto creerò il componente principale, ovvero la
          Card che in base alla scelta del dropdown mostrerà la locandina
          e le info del film selezionato */}
          <Row className="justify-content-center">
            <Col xs={12} md={8} lg={6}>
              <MovieCard movieTitle={this.state.movieTitle} />
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default App
