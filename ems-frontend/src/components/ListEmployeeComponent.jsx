

import React, {useEffect, useState} from 'react';
import { listEmployees, deleteEmployee} from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';


const ListEmployeeComponent = () => {
       
       const [employees, setEmployees] = useState([])

       const navigator = useNavigate();

       useEffect(() => {

            getAllEmployees();

             }, [])

        function getAllEmployees(){     
              listEmployees().then((response) => {
                setEmployees(response.data);
              }).catch(error => {
                 console.error(error);
              })
            }


       function addNewEmployee(){
          navigator('/add-employee')  
       }

       function updateEmployee(id){
          navigator(`/edit-employee/${id}`)
       }

        function removeEmployee(id) {
             deleteEmployee(id).then(() => {
                getAllEmployees()
             setEmployees(prev => prev.filter(emp => emp.id !== id));
             }).catch(error => {
             console.error('Error deleting employee:', error);
        });
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>
                <button className="btn btn-info" onClick={() => updateEmployee(employee.id) }>Update</button>
                <button className="btn btn-danger" onClick={() => removeEmployee(employee.id)} 
                   style={{marginLeft: '10px'}} 
                    >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployeeComponent;
