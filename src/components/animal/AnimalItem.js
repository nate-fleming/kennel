import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'
import './animal.css'
import dog from './dogIcon.ico'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('div')

export default class AnimalItem extends Component {
    state = {
        saveDisabled: false,
        modalIsOpen: false
    }

    openModal = () => {
        this.setState({ modalIsOpen: true });
    }


    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }

    handleClick = (e) => {
        this.setState(
            { saveDisabled: true }
        )
        this.props.deleteAnimal(this.props.animal.id)
    }

    render() {

        return (
            <div className="animal">
                <img src={dog} className="icon--dog" alt="" />
                <h2>{this.props.animal.name}</h2>
                <button onClick={this.openModal}>Delete</button>
                <Modal isOpen={this.state.modalIsOpen}
                    conRequestClose={this.closeModal}
                    deleteAnimal={this.deleteAnimal}
                    style={customStyles}>
                    <h2>Are you sure?</h2>
                    <button onClick={this.handleClick} disabled={this.state.saveDisabled}>Yes</button>
                    <button onClick={this.closeModal}>No</button>
                </Modal>
                <Link to={`/animals/${this.props.animal.id}`}><button>Details</button></Link>
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => {
                        this.props.history.push(`/animals/${this.props.animal.id}/edit`);
                    }}
                >
                    Edit
                </button>
            </div >
        )
    }
}
