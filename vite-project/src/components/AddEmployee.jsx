import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
// import multer from 'multer'
// import path from 'path'


const AddEmployee = () => {
    const[employee, setEmployee] = useState({
        name:'',
        email:'',
        password:'',
        salary:'',
        address: '',
        category_id:''
    });

    const [category, setCategory] = useState([])

    useEffect(()=> {
        axios.get('http://localhost:3000/auth/category')
        .then((result) => {
            if(result.data.Status) {
                setCategory(result.data.Result);
            } else {
                alert(result.data.Error)
            }
        }).catch((err) => console.log(err))
    }, [])


    const navigate = useNavigate()
    const handleSubmit = (e) =>{
        e.preventDefault()
        axios.post("http://localhost:3000/auth/add_employee", employee)
        .then((result) => {
            if(result.data.Status) {
                navigate('/dashboard/employee')
            } else {
                alert(result.data.Error)
            }
        })
        .catch((err) => console.log(err))
    }

  return (
    <div className='d-flex justify-content-center align-items-center mt-3'>
        <div className='p-3 rounded w-50 border'>
            <h3 className='text-center'>Add Employee</h3>
            <form className='row g-1 ' onSubmit={handleSubmit}>

                <div className='col-12'>
                    <label htmlFor="inputName" className='form-label mt-2'>Name</label>
                    <input type="text" className="form-control rounded-0"
                    id="inputName" placeholder="Enter name"
                    onChange={(e) => setEmployee({...employee, name : e.target.value})}/>
                </div>

                <div className='col-12'>
                    <label htmlFor="inputEmail" className='form-label mt-2'>Email</label>
                    <input type="email" className='form-control rounded-0'
                    id="inputEmail" placeholder="Enter Email" 
                    onChange={(e) => setEmployee({...employee, email : e.target.value})}/>
                </div>

                <div className='col-12'>
                    <label htmlFor="inputPassword" className='form-label mt-2'>Password</label>
                    <input type="password" className='form-control rounded-0'
                    id="inputPassword" placeholder="Enter password"
                    onChange={(e) => setEmployee({...employee, password : e.target.value})}/>
                </div>

                <div className='col-12'>
                    <label htmlFor="inputSalary" className='form-label mt-2'>Salary</label>
                    <input type="text" className='form-control rounded-0'
                    id="inputSalary" placeholder="Enter Salary"
                    onChange={(e) => setEmployee({...employee, salary : e.target.value})}/>
                </div>

                <div className='col-12'>
                    <label htmlFor="inputAddress" className='form-label mt-2'>Address</label>
                    <input type="text" className='form-control rounded-0'
                    id="inputAddress" placeholder="Enter Address"
                    onChange={(e) => setEmployee({...employee, address: e.target.value})}/>
                </div>

                <div className="col-12">
            <label htmlFor="category" className="form-label">Category</label>
            <select name="category" id="category" className="form-select"
              onChange={(e) => setEmployee({ ...employee, category_id: e.target.value })}>
              {
                category.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))
              }
            </select>
          </div>

                <button className='btn btn-primary w-100 rounded-0 mb-3 mt-4'>Add Employee</button>
            </form>
        </div>
    </div>
  )
}

export default AddEmployee
