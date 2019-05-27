import React, { Component } from 'react';

export default class Joke extends Component {

    tellNewJoke = () => {
        console.log("hey")
        const joke = {
            id: 1005,
            type: "sean joke",
            setup: "what do you call a fly with now wings?",
            punchline: "a walk"
        }
        this.props.setNewJokeState(joke)
    }


    render() {
        return (
            < div key={this.props.joke.id}>
                <header>{this.props.joke.type}</header>
                <h2>{this.props.joke.setup}</h2>
                <p>{this.props.joke.punchline}</p>
                <button onClick={this.tellNewJoke}>Tell A New Joke</button>
            </div>

        )
    }
}
