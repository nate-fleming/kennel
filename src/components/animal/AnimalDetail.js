import React, { Component } from "react"
import Modal from 'react-modal'
import dog from './dogIcon.ico'
import './AnimalDetail.css'

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



export default class Animal extends Component {
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

    render() {
        return (
            <section className="animal">
                <div key={this.props.animal.id} className="card">
                    <div className="card-body">
                        <h4 className="card-title">
                            <img src={dog} className="icon--dog" alt="" />
                            {this.props.animal.name}
                        </h4>
                        <p>Caretaker:&nbsp;
                                {(this.props.employees.length > 0) ?
                                this.props.employees.find(employee => employee.id === this.props.animal.employeeId).name :
                                ""
                            }
                        </p>
                        <button onClick={this.openModal}>Delete</button>
                        <Modal isOpen={this.state.modalIsOpen}
                            conRequestClose={this.closeModal}
                            deleteAnimal={this.deleteAnimal}
                            style={customStyles}>
                            <h2>Are you sure?</h2>
                            <button onClick={
                                () => {
                                    this.setState(
                                        { saveDisabled: true },
                                        () => this.props.deleteAnimal(this.props.animal.id)
                                    )
                                }
                            }
                                disabled={this.state.saveDisabled}
                                className="card-link">Yes</button>
                            <button onClick={this.closeModal}>No</button>
                        </Modal>
                    </div>
                </div>
            </section >
        )
    }
}
