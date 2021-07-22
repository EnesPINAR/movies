import React from "react";
import {Link} from "react-router-dom"

class MovieList extends React.Component {

    render() {

        const truncateOverview = (string, maxLenght) => {
            if (!string) {
                return null
            }
            if (string < maxLenght) {
                return string
            }
            else {
                return `${string.substring(0, maxLenght)}...`
            }
        }

        return(
            <div className="row">

                {this.props.movies.map((movie) =>(
                    <div className="col-lg-4" key={movie.id}>
                        <div className="card mb-4 shadow-sm" style={{minHeight:"905px"}}>
                            <img src={movie.imageURL} alt="Movie's Image" className="card-img-top"/>
                            <div className="card-body" style={{display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
                                <h5 className="card-title">{movie.name}</h5>
                                <p className="card-text">{truncateOverview(movie.overview, 100)}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <button type="button" onClick={(event) => this.props.deleteMovieProp(movie)} className="btn btn-md btn-outline-danger">Delete</button>
                                    <Link type="button" to={`edit/${movie.id}`} className="btn btn-md btn-outline-primary">Edit</Link>
                                    <span className="badge bg-warning text-dark" style={{lineHeight: "1.5", fontSize: "1rem"}}>{movie.rating}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        )
    }
}

export default MovieList;
