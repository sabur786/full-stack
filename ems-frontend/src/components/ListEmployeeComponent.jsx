

import React, {useEffect, useState} from 'react';
import { listEmployees } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';


const ListEmployeeComponent = () => {
       
       const [employees, setEmployees] = useState([])

       const navigator = useNavigate();

       useEffect(() => {
              listEmployees().then((response) => {
                setEmployees(response.data);
              }).catch(error => {
                 console.error(error);
              })
       }, [])


       function addNewEmployee(){
          navigator('/add-employee')  
       }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">List of Employees</h2>
      <button className="btn btn-primary mb-4" onClick={addNewEmployee}>Add Employee</button>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployeeComponent;
