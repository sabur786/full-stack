
import React, { useState } from 'react'
import { createEmployee } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';
const EmployeeComponent = () => { 
    const [employee, setEmployee] = useState({firstName: '',lastName: '', email: ''});

    const navigator = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(employee);   
        // Add your API call here
        createEmployee(employee).then((response) => {
            console.log(response.data);
            navigator('/employees');
        })
    };

  return (
    <div className='container'>
         <br /> <br />
          <div className='row'>
             <div className='card col-md-6 offset-md-3 offset-md-2'>
                 <h2 className='text-center'>Add Employee</h2>
                 <div className='card-body'>
                    <form onSubmit={handleSubmit}>
                        <div className='form-group mb-2'>
                             <label className='form-label'>First Name: </label>
                             <input
                                 type='text'
                                 placeholder='Enter Employee First Name'
                                 name='firstName'
                                 value={employee.firstName}
                                 className='form-control'
                                  onChange={handleChange}/>
                        </div>
                        <div className='form-group mb-2'>
                             <label className='form-label'>Last Name: </label>
                             <input
                                 type='text'
                                 placeholder='Enter Employee Last Name'
                                 name='lastName'
                                    value={employee.lastName}
                                    className='form-control'
                                    onChange={handleChange}/>
                        </div>
                        <div className='form-group mb-2'>
                             <label className='form-label'>Email: </label>
                             <input
                                 type='text'
                                 placeholder='Enter Employee Email'
                                 name='email'
                                    value={employee.email}
                                    className='form-control'
                                    onChange={handleChange}/>
                        </div>
                          <button type='submit' className='btn btn-success'>Submit</button>
                    </form>
                 </div>
             </div>
          </div>
    </div>
  );
};

export default EmployeeComponent