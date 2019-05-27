import { Route, Redirect } from "react-router-dom"
import React, { Component } from "react"
import { withRouter } from 'react-router'
import AnimalList from './animal/AnimalList'
import LocationList from './location/LocationList'
import EmployeeList from './employee/EmployeeList'
import OwnerList from './owner/Owners'
import AnimalManager from "../modules/AnimalManager"
import OwnerManager from '../modules/OwnerManager'
import EmployeeManager from '../modules/EmployeeManager'
import LocationManager from '../modules/LocationManager'
import SearchResults from './search/SearchResults'
import AnimalDetail from './animal/AnimalDetail'
import AnimalForm from './animal/AnimalForm'
import AnimalEditForm from './animal/AnimalEditForm'
import Login from './authenication/Login'



class ApplicationViews extends Component {

    // Check if credentials are in local storage
    isAuthenticated = () => sessionStorage.getItem("credentials") !== null

    state = {
        employees: [],
        locations: [],
        animals: [],
        owners: [],
        search: []
    }


    deleteAnimal = id => {
        const newState = {}
        AnimalManager.deleteAnimal(id)
            .then(AnimalManager.getAll)
            .then(allAnimals => newState.animals = allAnimals)
            .then(() => {
                this.props.history.push('/animals')
                this.setState(newState)
            })
    }

    addAnimal = animal => {
        AnimalManager.post(animal)
            .then(AnimalManager.getAll)
            .then(animals => this.setState({ animals: animals }))
            .then(() => this.props.history.push("/animals"));
    }

    updateAnimal = (editedAnimalObject) => {
        return AnimalManager.put(editedAnimalObject)
            .then(() => AnimalManager.getAll())
            .then(animals => {
                this.props.history.push("/animals")
                this.setState({
                    animals: animals
                })
            })
    }

    deleteEmployee = id => {
        const newState = {}
        EmployeeManager.deleteEmployee(id)
            .then(EmployeeManager.getAll)
            .then(allEmployees => newState.employees = allEmployees)
            .then(() => this.setState(newState))
    }



    componentDidMount() {
        const newState = {}

        AnimalManager.getAll()
            .then(allAnimals => newState.animals = allAnimals)
            .then(OwnerManager.getAll)
            .then(allOwners => newState.owners = allOwners)
            .then(EmployeeManager.getAll)
            .then(allEmployees => newState.employees = allEmployees)
            .then(LocationManager.getAll)
            .then(allLocations => newState.locations = allLocations)
            .then(() => this.setState(newState))

    }


    render() {
        return (
            <React.Fragment>
                <Route path="/login" component={Login} />
                <Route exact path="/" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <LocationList locations={this.state.locations} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
                <Route exact path="/animals" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <AnimalList animals={this.state.animals}
                            owners={this.state.owners}
                            deleteAnimal={this.deleteAnimal}
                            {...props} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
                <Route exact path="/animals/:animalId(\d+)" render={(props) => {
                    // Find the animal with the id of the route parameter
                    let animal = this.state.animals.find(animal =>
                        animal.id === parseInt(props.match.params.animalId)
                    )

                    // If the animal wasn't found, create a default one
                    if (!animal) {
                        animal = { id: 404, name: "", breed: "Dog not found" }
                    }

                    return <AnimalDetail animal={animal}
                        employees={this.state.employees}
                        deleteAnimal={this.deleteAnimal}
                    />
                }} />
                <Route
                    path="/animals/:animalId(\d+)/edit" render={props => {
                        return <AnimalEditForm {...props} employees={this.state.employees} updateAnimal={this.updateAnimal} />
                    }}
                />
                <Route path="/animals/new" render={(props) => {
                    return <AnimalForm {...props}
                        addAnimal={this.addAnimal}
                        employees={this.state.employees} />
                }} />
                <Route exact path="/employees" render={props => {
                    if (this.isAuthenticated()) {
                        return <EmployeeList deleteEmployee={this.deleteEmployee}
                            employees={this.state.employees}
                            animals={this.state.animals} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
                <Route path="/owners" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <OwnerList owners={this.state.owners} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
                <Route path="/search" render={(props) => {
                    return <SearchResults searchAnimals={this.props.searchAnimals}
                        searchEmployees={this.props.searchEmployees}
                        searchLocations={this.props.searchLocations}
                        searchOwners={this.props.searchOwners} />
                }} />
            </React.Fragment>
        )
    }
}

export default withRouter(ApplicationViews)