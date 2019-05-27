import React, { Component } from 'react';
import './Owners.css'

export default class OwnerList extends Component {
    render() {
        return (
            <div className="owners">
                {
                    this.props.owners.map(owner =>
                        <div key={owner.id}>
                            <h2>{owner.name}</h2>
                            <p>Number: {owner.phoneNumber}</p>
                        </div>
                    )
                }
            </div>
        )
    }

}