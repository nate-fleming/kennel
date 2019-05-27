import React, { Component } from 'react';
import './Employee.css'
import AnimalItem from '../animal/AnimalItem'

export default class EmployeeList extends Component {

    render() {
        return (
            <section className="employees">
                <h1>Employees</h1>
                {
                    this.props.employees.map(employee =>
                        <div key={employee.id} className="employee">
                            <h2>{employee.name}</h2>
                            <button onClick={() => this.props.deleteEmployee(employee.id)}>Delete</button>
                            <h4>Caretaker for:</h4>
                            <div className="caretaker">
                                {
                                    this.props.animals.filter(animal => animal.employeeId === employee.id)
                                        .map(animal => <AnimalItem key={animal.id} animal={animal} {...this.props} />)
                                }
                            </div>
                        </div>
                    )
                }
            </section>
        );
    }
}
