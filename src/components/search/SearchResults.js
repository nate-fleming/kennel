import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './SearchResults.css'

export default class SearchResults extends Component {
    render() {
        return (
            <div>
                <div className="result">
                    <h2>Animal Results</h2>
                    {
                        this.props.searchAnimals.map(result =>
                            <div key={result.id}>
                                <h4>{result.name}</h4>
                                <Link to={`/animals/${result.id}`}><button>Details</button></Link>
                            </div>
                        )
                    }
                </div>
                <div className="result">
                    <h2>Employee Results</h2>
                    {
                        this.props.searchEmployees.map(result =>
                            <h4 key={result.id}>{result.name}</h4>
                        )
                    }
                </div>
                <div className="result">
                    <h2>Location Results</h2>
                    {
                        this.props.searchLocations.map(result =>
                            <h4 key={result.id}>{result.name}</h4>
                        )
                    }
                </div>
                <div className="result">
                    <h2>Owerns Results</h2>
                    {
                        this.props.searchOwners.map(result =>
                            <h4 key={result.id}>{result.name}</h4>
                        )
                    }
                </div>


            </div>
        )
    }
}
