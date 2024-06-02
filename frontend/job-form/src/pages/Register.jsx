import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const Register = () => {
  const [data, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    phone: '',
    dob: '',
    degree: '',
    cgpa: '',
    hsc: '',
    hscPercentage: '',
    sslc: '',
    sslcPercentage: '',
    addressOne: '',
    addressTwo: '',
    experience: 'fresher',
    yearsOfExperience: '',
  });

  const [files, setFiles] = useState({
    resume: null,
    selfIntroVideo: null,
    profileImage: null,
  });

  const [errors, setErrors] = useState({});

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    setFiles({ ...files, [name]: file });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...data, [name]: value });
  };

  const handleExperienceChange = (e) => {
    const experience = e.target.value;
    setFormData({
      ...data,
      experience,
      yearsOfExperience: experience === "experienced" ? data.yearsOfExperience : ''
    });
  };

  const handleYearsOfExperienceChange = (e) => {
    const { value } = e.target;
    setFormData({ ...data, yearsOfExperience: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!data.name) newErrors.name = 'Name is required';
    if (!data.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!data.password) newErrors.password = 'Password is required';
    if (!data.gender) newErrors.gender = 'Gender is required';
    if (!data.phone) newErrors.phone = 'Phone number is required';
    if (!data.dob) newErrors.dob = 'Date of Birth is required';
    if (!data.degree) newErrors.degree = 'Degree is required';
    if (!data.cgpa) newErrors.cgpa = 'CGPA is required';
    if (!data.hsc) newErrors.hsc = 'HSC qualification is required';
    if (!data.hscPercentage) newErrors.hscPercentage = 'HSC percentage is required';
    if (!data.sslc) newErrors.sslc = 'SSLC qualification is required';
    if (!data.sslcPercentage) newErrors.sslcPercentage = 'SSLC percentage is required';
    if (!data.addressOne) newErrors.addressOne = 'Address 1 is required';
    if (!data.addressTwo) newErrors.addressTwo = 'Address 2 is required';
    if (data.experience === 'experienced' && !data.yearsOfExperience) newErrors.yearsOfExperience = 'Years of experience is required for experienced candidates';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const Navigate=useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
     //   event.preventDefault();
//       //   console.log('data', data);
//       //   const formData = new FormData();
//       //   formData.append('name', data.name);
//       //   formData.append('email', data.email);
//       //   formData.append('password', data.password);
//       //   formData.append('gender', data.gender);
//       //   formData.append('phone', data.phone);
//       //   formData.append('dob', data.dob);
//       //   formData.append('degree', data.degree);
//       //   formData.append('cgpa', data.cgpa);
//       //   formData.append('hsc', data.hsc);
//       //   formData.append('hscPercentage', data.hscPercentage);
//       //   formData.append('sslc', data.sslc);
//       //   formData.append('sslcPercentage', data.sslcPercentage);
//       //   formData.append('addressOne', data.addressOne);
//       //   formData.append('addressTwo', data.addressTwo);
//       //   formData.append('experience', data.experience);
//       //   formData.append('yearsOfExperience', data.yearsOfExperience);
//       //   formData.append('resume', files.resume);
//       //   formData.append('selfIntroVideo', files.selfIntroVideo);
//       //   formData.append('profileImage', files.profileImage);
    if (!validate()) return;

    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    for (const key in files) {
      if (files[key]) formData.append(key, files[key]);
    }

    try {
      const response = await axios.post('http://localhost:7000/api/users/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if(response.data.success){
        toast.success('User registered successfully!');
        Navigate('/login');
        console.log('User registered successfully:', response.data);
      }
    } catch (error) {
      console.error('Error registering user:', error);
      if (error.response) {
        if (error.response.status === 400 && error.response.data.message === 'User already exists with this email address.') {
          toast.error('User already exists with this email address.');
        } else {
          toast.error('Failed to register user. Please try again.');
        }
      } else {
        toast.error('Failed to register user. Please try again.');
      }
    }
  };

  return (
    <>
      <div className='d-flex justify-content-center'>
        <div className='card p-3' style={{ width: '440px' }}>
          <h2 className='text-center'>Registration Form</h2>
          <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <div className="mb-2">
              <label htmlFor="name">
                <strong>Name:</strong>
              </label>
              <input onChange={handleChange} type="text" name='name' placeholder='Enter your Name' className='form-control' />
              {errors.name && <p className="text-danger">{errors.name}</p>}
            </div>
            <div className="row mb-3">
              <div className='col-md-6 col-6'>
                <label htmlFor="email">
                  <strong>Email:</strong>
                </label>
                <input onChange={handleChange} type="email" name='email' placeholder='Enter your Email' className='form-control' />
                {errors.email && <p className="text-danger">{errors.email}</p>}
              </div>
              <div className='col-md-6 col-6'>
                <label htmlFor="password">
                  <strong>Password:</strong>
                </label>
                <input onChange={handleChange} type="password" name='password' placeholder='Enter your Password' className='form-control' />
                {errors.password && <p className="text-danger">{errors.password}</p>}
              </div>
            </div>
            <div className="mb-2">
              <label htmlFor="gender">
                <strong className='me-2'>Gender:</strong>
              </label>
              <span className="me-2">Male:</span>
              <input onChange={handleChange} type="radio" name="gender" className="form-check-input" value='male' checked={data.gender === 'male'} />
              <span className="me-2 ms-3">Female:</span>
              <input onChange={handleChange} type="radio" name="gender" className="form-check-input" value='female' checked={data.gender === 'female'} />
              {errors.gender && <p className="text-danger">{errors.gender}</p>}
            </div>
            <div className="mb-2">
              <label htmlFor="phone">
                <strong>Phone No:</strong>
              </label>
              <input onChange={handleChange} type="text" name='phone' placeholder='Enter your Phone Number ' className='form-control' />
              {errors.phone && <p className="text-danger">{errors.phone}</p>}
            </div>
            <div className="mb-2">
              <label htmlFor="dob">
                <strong>Date Of Birth:</strong>
              </label>
              <input onChange={handleChange} type="date" name='dob' className='form-control' />
              {errors.dob && <p className="text-danger">{errors.dob}</p>}
            </div>
            <div className="mb-2">
              <label htmlFor="resume">
                <strong>Upload Your Resume:</strong>
              </label>
              <input onChange={handleFileChange} type="file" name='resume' className='form-control' accept='.pdf'/>
            </div>
            <div className="mb-2">
              <label htmlFor="selfIntroVideo">
                <strong>Upload Self Intro Video:</strong>
              </label>
              <input onChange={handleFileChange} type="file" name='selfIntroVideo' className='form-control' accept='.mp4'/>
            </div>
            <div className="mb-2">
              <label htmlFor="profileImage">
                <strong>Upload Profile Image:</strong>
              </label>
              <input onChange={handleFileChange} type="file" name='profileImage' className='form-control' accept='.png,.jpeg,.jpg'/>
            </div>
            <div className="row mb-3">
              <div className='col-md-6 col-6'>
                <label htmlFor="degree">
                  <strong>Degree:</strong>
                </label>
                <div className="mb-3">
                  <select className="form-select" name='degree' onChange={handleChange}>
                    <option value="">Select Your Degree</option>
                    <option value="BE">BE/B.Tech</option>
                    <option value="BA">BA</option>
                    <option value="BSC">BSc</option>
                    <option value="others">Others</option>
                  </select>
                  {errors.degree && <p className="text-danger">{errors.degree}</p>}
                </div>
              </div>
              <div className='col-md-6 col-6'>
                <label htmlFor="cgpa">
                  <strong>CGPA:</strong>
                </label>
                <input onChange={handleChange} type="text" name='cgpa' placeholder='Enter your cgpa' className='form-control' />
                {errors.cgpa && <p className="text-danger">{errors.cgpa}</p>}
              </div>
            </div>
            <div className="row mb-3">
              <div className='col-md-6 col-6'>
                <label htmlFor="school">
                  <strong> School:</strong>
                </label>
                <div className='mb-3'>
                  <select className="form-select" name='hsc' onChange={handleChange}>
                    <option value="">Select Your Qualification</option>
                    <option value="10">10</option>
                    <option value="12">12</option>
                  </select>
                  {errors.hsc && <p className="text-danger">{errors.hsc}</p>}
                </div>
              </div>
              <div className='col-md-6 col-6'>
                <label htmlFor="hscPercentage">
                  <strong>Percentage:</strong>
                </label>
                <input onChange={handleChange} type="text" name='hscPercentage' placeholder='Enter your percentage' className='form-control' />
                {errors.hscPercentage && <p className="text-danger">{errors.hscPercentage}</p>}
              </div>
            </div>

            <div className="row mb-3">
              <div className='col-md-6 col-6'>
                <label htmlFor="school">
                  <strong>School:</strong>
                </label>
                <div>
                  <select className="form-select" name='sslc' onChange={handleChange}>
                    <option value="">Select Your Qualification</option>
                    <option value="10">10</option>
                    <option value="12">12</option>
                  </select>
                  {errors.sslc && <p className="text-danger">{errors.sslc}</p>}
                </div>
              </div>
              <div className='col-md-6 col-6'>
                <label htmlFor="sslcPercentage">
                  <strong>Percentage:</strong>
                </label>
                <input onChange={handleChange} type="text" name='sslcPercentage' placeholder='Enter your percentage' className='form-control' />
                {errors.sslcPercentage && <p className="text-danger">{errors.sslcPercentage}</p>}
              </div>
            </div>
            <div className="row mb-3">
              <div className='col-md-6 col-6'>
                <label htmlFor="addressOne">
                  <strong>Address 1:</strong>
                </label>
                <input onChange={handleChange} type="text" name='addressOne' placeholder='Enter your Address' className='form-control' />
                {errors.addressOne && <p className="text-danger">{errors.addressOne}</p>}
              </div>
              <div className='col-md-6 col-6'>
                <label htmlFor="addressTwo">
                  <strong>Address 2:</strong>
                </label>
                <input onChange={handleChange} type="text" name='addressTwo' placeholder='Enter your Address' className='form-control' />
                {errors.addressTwo && <p className="text-danger">{errors.addressTwo}</p>}
              </div>
            </div>
           
            <div className='mb-2'>
              <label htmlFor="experience">
                <strong className='me-2'>Experience:</strong>
              </label>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  name="experience"
                  value="fresher"
                  className="form-check-input"
                  onChange={handleExperienceChange}
                  checked={data.experience === 'fresher'}
                />
                <label className="form-check-label me-2">Fresher</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  name="experience"
                  value="experienced"
                  className="form-check-input"
                  onChange={handleExperienceChange}
                  checked={data.experience === 'experienced'}
                />
                <label className="form-check-label me-2">Experienced</label>
              </div>
              {data.experience === 'experienced' && (
                <div className="mt-2">
                  <input
                    type="text"
                    name="yearsOfExperience"
                    placeholder="Enter years of experience"
                    className="form-control"
                    value={data.yearsOfExperience}
                    onChange={handleYearsOfExperienceChange}
                  />
                  {errors.yearsOfExperience && <p className="text-danger">{errors.yearsOfExperience}</p>}
                </div>
              )}
            </div>
            <p className='text-center'>If you already have an account, <Link to='/login' className='text-decoration-none'>Login</Link></p>
            <button className='btn btn-primary w-100'>Register</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
