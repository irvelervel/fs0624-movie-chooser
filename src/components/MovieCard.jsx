import { Component } from 'react'
import { Alert, Card, Spinner } from 'react-bootstrap'

// FLOW COMPLETO DELL'APP
// - prima caricamento iniziale...
// - poi, al cambiamento della voce della tendina, cambia lo stato in App
// - questo stato viene sempre passato a MovieCard come prop
// - poichè c'è un cambio di prop, componentDidUpdate in MovieCard si attiva
// - con un if controlliamo se il valore della tendina precedente è diverso
// dal valore corrente, e se ciò avviene parte fetchMovieData()
// - fetchMovieData recupera il nuovo film, e lo salva nello stato, aggiornando la Card
// - ma poichè c'è stato un cambio di stato, componentDidUpdate viene attivato una 2° volta!
// - componentDidUpdate viene ri-eseguito, ma questa volta NON a causa di un cambio di prop,
// ma a causa dello stato che è stato aggiornato dalla fetch appena conclusa
// - questo comporta che la seconda esecuzione di componentDidUpdate NON PASSA l'if, salvandoci
// da un loop infinito
// - il lifecycle del componente si ferma, fino ad una nuova selezione della tendina

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

  componentDidUpdate = (prevProps, prevState) => {
    // componentDidUpdate è un metodo di lifecycle esclusivo per i componenti
    // a classe: viene invocato automaticamente (se presente) nei componenti a
    // classe OGNI VOLTA che cambia una prop, o OGNI VOLTA che cambia lo state
    console.log('ATTIVATO COMPONENTDIDUPDATE')
    // this.fetchMovieData() // <--- LOOP INFINITO

    // mi va bene che fetchMovieData venga RI-ESEGUITO ogni volta che cambia
    // la prop movieTitle
    // il VERO problema è che componentDidUpdate viene eseguito a causa di un
    // cambio di stato

    // prevProps VS this.props
    if (prevProps.movieTitle !== this.props.movieTitle) {
      // faccio una verifica per controllare se sono entrato nel componentDidUpdate
      // a causa del cambio della prop movieTitle!
      // in questo modo, lancerò la fetch SOLAMENTE a seguito di un cambio di
      // film nella tendina

      this.fetchMovieData()
      // NON RILANCEREMO fetchMovieData una seconda volta
    }

    // OGNI VOLTA CHE ESEGUIAMO UN'OPERAZIONE IN COMPONENTDIDUPDATE
    // C'È BISOGNO DI UN IF

    // if(!prevState.isError && this.state.isError){
    //     // operazioni da eseguire quando si attiva/disattiva un errore
    // }
  }

  // ora creiamo una funzione in grado di utilizzare la prop "movieTitle"
  // per avviare una ricerca su OMDB, e salvare in this.state.movieData
  // il risultato più pertinente
  fetchMovieData = () => {
    console.log('PARTITA LA FETCH')
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
    // anche render viene re-invocato ogni volta che cambia lo state
    // o che cambia una prop
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
