import React from "react";
import Searchbar from "./Searchbar";
import MovieList from "./MoviesList";
import AddMovie from "./AddMovie";
import EditMovie from "./EditMovie";
import Axios from "axios";
import { BrowserRouter as Router, Route} from "react-router-dom";
import axios from "axios";

class App extends React.Component {

    state = {
        movies: [

        ],

        searchQuery: ""
    }

    deleteMovie = async (movie) => {

      Axios.delete(`http://localhost:5000/movies/${movie.id}`)

      const newMovies = this.state.movies.filter( m => m.id !== movie.id );

      this.setState(state => ({
       movies: newMovies
      }))

    }

    addMovie = async (movie) => {
        await axios.post(`http://localhost:5000/movies/`, movie)
        this.setState(state => ({movies: state.movies.concat([movie])}))
        this.getMovies()
    }

    editMovie = async (id, updatedMovie) => {
        await axios.put(`http://localhost:5000/movies/${id}`, updatedMovie)
        this.getMovies()
    }

    searchMovie = (event) => {
        this.setState({searchQuery: event.target.value})
    }

   async componentDidMount() {
    this.getMovies() 
   }

   async getMovies() {
     const response = await Axios.get("http://localhost:5000/movies");
     this.setState({movies: response.data});
   }

    render() {

        let searchedMovies = this.state.movies.filter(
            (movie) => {
                return movie.name.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1
            }
        ).sort((a, b) => {
            return a.id < b.id ? 1 
            : a.id > b.id ? -1 
            : 0;
        })

        return(
            <Router>
                    
                <div className="container">

                    <Route path="/" exact render = {
                        () => (
                            <React.Fragment>
                                <div className="row" style={{margin:"20px 0 20px 0"}}>
                                    <div className="col-lg-12" style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                                        <Searchbar
                                            searchMovieProp={this.searchMovie}
                                        />
                                    </div>
                                </div>

                                <MovieList
                                    movies={searchedMovies}
                                    deleteMovieProp={this.deleteMovie}
                                />
                            </React.Fragment>
                        )
                    }>
                        
                    </Route>

                    <Route path="/add" render = {
                        ({history}) => (
                            <AddMovie 
                                onAddMovie={(movie) => {this.addMovie(movie).then(() => {
                                    history.push("/")
                                })}}
                            />
                        )
                    }>
                    </Route>

                    <Route path="/edit/:id" render = {
                        (props) => (                         
                            <EditMovie
                                {...props}
                                onEditMovie={(id, movie) => {this.editMovie(id, movie)}}
                            />
                        )
                    }>
                    </Route>

                </div>

            </Router>
        )
    }

}

export default App;
