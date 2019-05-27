import React, { Component } from 'react';
import './Locations.css'

export default class LocationList extends Component {
    render() {
        return (
            <section className="locations">
                {
                    this.props.locations.map(location =>
                        <div key={location.id}>
                            <h2>{location.name}</h2>
                            <p>{location.address}</p>
                        </div>
                    )
                }
            </section>
        )
    }
}