import React, { Component } from "react"
import NavBar from "./nav/NavBar"
import ApplicationViews from "./ApplicationViews"
import { withRouter } from 'react-router'

import "./Kennel.css"
import "bootstrap/dist/css/bootstrap.min.css"


class Kennel extends Component {

    state = {
        searchEmployees: [],
        searchLocations: [],
        searchAnimals: [],
        searchOwners: [],
    }

    search = (results) => {
        const newState = {}
        fetch(`http://localhost:5002/animals?name_like=${results}`)
            .then(e => e.json())
            .then(results => newState.searchAnimals = results)
            .then(() => fetch(`http://localhost:5002/employees?name_like=${results}`))
            .then(e => e.json())
            .then(results => newState.searchEmployees = results)
            .then(() => fetch(`http://localhost:5002/locations?q=${results}`))
            .then(e => e.json())
            .then(results => newState.searchLocations = results)
            .then(() => fetch(`http://localhost:5002/owners?name_like=${results}`))
            .then(e => e.json())
            .then(results => newState.searchOwners = results)
            .then(() => {
                this.props.history.push('/search')
                this.setState(newState)
            })
    }

    handleSearch = (e) => {
        if (e.key === 'Enter') {
            this.search(e.target.value)
        }
    }

    render() {
        return (
            <React.Fragment>
                <NavBar handleSearch={this.handleSearch} />
                <ApplicationViews searchAnimals={this.state.searchAnimals}
                    searchEmployees={this.state.searchEmployees}
                    searchLocations={this.state.searchLocations}
                    searchOwners={this.state.searchOwners} />
            </React.Fragment>
        )
    }
}

export default withRouter(Kennel)
