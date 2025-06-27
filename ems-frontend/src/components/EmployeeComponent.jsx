import React, { useState } from 'react';
import { createEmployee } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';

const EmployeeComponent = () => { 
    const [employee, setEmployee] = useState({
        firstName: '',
        lastName: '', 
        email: ''
    });
    
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '', 
        email: ''
    });

    const navigator = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {...errors};
        
        if (!employee.firstName.trim()) {
            newErrors.firstName = 'First Name is required';
            valid = false;
        } else {
            newErrors.firstName = '';
        }
        
        if (!employee.lastName.trim()) {
            newErrors.lastName = 'Last Name is required';
            valid = false;
        } else {
            newErrors.lastName = '';
        }
        
        if (!employee.email.trim()) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(employee.email)) {
            newErrors.email = 'Please enter a valid email';
            valid = false;
        } else {
            newErrors.email = '';
        }
        
        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            createEmployee(employee).then((response) => {
                console.log(response.data);
                navigator('/employees');
            }).catch(error => {
                console.error('Error creating employee:', error);
            });
        }
    }

  return (
    <div className='container'>
         <br /> <br />
          <div className='row'>
             <div className='card col-md-6 offset-md-3'>
                 <h2 className='text-center'>Add Employee</h2>
                 <div className='card-body'>
                     <form onSubmit={handleSubmit} noValidate>
                        <div className='form-group mb-2'>
                             <label className='form-label'>First Name: </label>
                             <input
                                 type='text'
                                 placeholder='Enter Employee First Name'
                                 name='firstName'
                                 value={employee.firstName}
                                  className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                  onChange={handleChange}/>
                                {errors.firstName && 
                                    <div className="invalid-feedback">{errors.firstName}</div>
                                }
                        </div>
                        <div className='form-group mb-2'>
                             <label className='form-label'>Last Name: </label>
                             <input
                                 type='text'
                                 placeholder='Enter Employee Last Name'
                                 name='lastName'
                                    value={employee.lastName}
                                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                    onChange={handleChange}
                                />
                                {errors.lastName && 
                                    <div className="invalid-feedback">{errors.lastName}</div>
                                }
                        </div>
                        <div className='form-group mb-2'>
                             <label className='form-label'>Email: </label>
                             <input
                                 type='text'
                                 placeholder='Enter Employee Email'
                                 name='email'
                                    value={employee.email}
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    onChange={handleChange}
                                />
                                {errors.email && 
                                    <div className="invalid-feedback">{errors.email}</div>
                                }
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