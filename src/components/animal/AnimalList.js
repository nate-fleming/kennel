import React, { Component } from 'react';
import AnimalItem from './AnimalItem'
import './Animals.css'

export default class AnimalList extends Component {

    render() {
        return (
            <section className="animal-list">
                <div className="animalButton">
                    <button type="button"
                        className="btn btn-success"
                        onClick={() => {
                            this.props.history.push("/animals/new")
                        }
                        }>
                        Admit Animal
                    </button>
                </div>
                <div className="animals">
                    {
                        this.props.animals.map(animal => {
                            return <AnimalItem key={animal.id} animal={animal}
                                owners={this.props.owners} deleteAnimal={this.props.deleteAnimal} {...this.props} />
                        })
                    }
                </div>
            </section>
        )
    }
}