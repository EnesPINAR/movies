import React from "react";
import Axios from 'axios';

class EditMovie extends React.Component {

    state = {
        name: "",
        rating: "",
        imageURL: "",
        overview: ""
    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        const response = await Axios.get(`http://localhost:5000/movies/${id}`);
        const movie = response.data;
        this.setState({
            name: movie.name,
            rating: movie.rating,
            imageURL: movie.imageURL,
            overview: movie.overview
        })

    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleFormSubmit = (e) => {
        const {name, rating, overview, imageURL} = this.state;
        const id = this.props.match.params.id;
        const updatedMovie = {
            name,
            rating,          
            imageURL,
            overview,
        }
        this.props.onEditMovie(id, updatedMovie);
        this.props.history.push("/");
    }

    render() { 

        return ( 
        <div className="container">
            <form className="mt-5" onSubmit={this.handleFormSubmit}>
            <input className="form-control" id="disabledInput" type="text" placeholder="Edit The Form" disabled/>
                <div className="form-row">
                    <div className="form-group col-md-10">
                        <label htmlFor="inputName">Name</label>
                        <input  
                                type="text" 
                                className="form-control" 
                                name="name"
                                value={this.state.name}
                                onChange={this.onInputChange}/>
                    </div>
                    <div className="form-group col-md-2">
                        <label htmlFor="inputRating">Rating</label>
                        <input 
                                type="text"
                                min="0"
                                max="10"
                                className="form-control" 
                                name="rating"
                                value={this.state.rating}
                                onChange={this.onInputChange}/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label htmlFor="inputImage">Image URL</label>
                        <input 
                                type="text" 
                                className="form-control" 
                                name="imageURL"
                                value={this.state.imageURL}
                                onChange={this.onInputChange}/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label htmlFor="overviewTextarea">Overview</label>
                        <textarea 
                                className="form-control" 
                                name="overview" rows="5" value={this.state.overview} 
                                onChange={this.onInputChange}></textarea>
                    </div>
                </div>
                <input type="submit" className="btn btn-danger btn-block" value="Edit Movie" />
            </form>
        </div>
         );
    }
}
 
export default EditMovie;