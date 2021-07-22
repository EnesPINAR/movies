import React from "react";
import { Link } from "react-router-dom";

class Searchbar extends React.Component {

    handleFormSubmit = (event) => {
        event.preventDefault();
    }

    render(){
        return (
            <form onSubmit={this.handleFormSubmit} style={{width:"100%", display:"flex" , alignItems:"center", justifyContent:"center"}}>
                <div className="form row" style={{width:"100%"}}>
                    <div className="col-10">
                        <input
                        type="text"
                        onChange={this.props.searchMovieProp}
                        className="form-control"
                        placeholder="Search here"
                        />
                    </div>
                    <div className="col-2">
                        <Link to="/add" className="btn-secondary" style={{float: "right", height: "100%", width: "100%", borderRadius: "0.25rem", display:"grid", placeItems:"center", textDecoration:"none"}}>
                            Add +
                        </Link>
                    </div>
                </div>
            </form>
        )
    }
}

export default Searchbar;
