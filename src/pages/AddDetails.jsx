import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import Dropdown from '../components/Dropdown';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';


function AddDetails() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dob: '',
        mobileNumber: '',
        email: ''
    });

    const [selectedOption, setSelectedOption] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
        const jwtToken = localStorage.getItem('token');
        if (jwtToken) {
            setToken(jwtToken);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleClear = () => {
        // Clear form fields
        setFormData({
            firstName: '',
            lastName: '',
            dob: '',
            mobileNumber: '',
            email: '',
            gender: '',
        });


        toast.dismiss();

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if any of the required fields are empty
        if (
            !formData.firstName ||
            !formData.lastName ||
            !formData.dob ||
            !formData.mobileNumber ||
            !formData.email ||
            !selectedOption
        ) {
            // Show error toast for empty fields
            toast.error('Please fill in all required fields.', {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return; // Prevent further execution of the submission logic
        }

        // Regular expression pattern for validating email addresses
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validate email format
        if (!emailPattern.test(formData.email)) {
            // Show error toast for invalid email format
            toast.error('Please enter a valid email address.', {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return; // Prevent further execution of the submission logic
        }

        // Display SweetAlert2 confirmation dialog
        const result = await Swal.fire({
            title: 'Submit Form?',
            text: 'Are you sure you want to submit the form data?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, submit!',
            cancelButtonText: 'No, cancel'
        });

        if (result.isConfirmed) {
            // User confirmed, proceed with form submission

            const userData = {
                type: 'USER',
                basic_info: {
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    dob: formData.dob,
                    gender: selectedOption,
                },
                contact_info: {
                    mobile_number: formData.mobileNumber,
                    email: formData.email,
                },
                auth_info: {
                    password: '', // or any other necessary auth information
                },
            };

            try {
                const response = await axios.post('http://localhost:8000/registerUser', userData, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the JWT token in the request headers
                    },
                });
                console.log(response.data);
                // Show success toast message
                toast.success('User added successfully!', {
                    position: 'top-center',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                // Reset the form after successful submission
                setFormData({
                    firstName: '',
                    lastName: '',
                    dob: '',
                    mobileNumber: '',
                    email: '',
                    gender: '',
                });
            } catch (error) {
                console.error('Error adding user:', error);
                // Handle error
                if (error.response && error.response.data) {
                    // Display the error message received from the server
                    toast.error(error.response.data.error, {
                        position: 'top-center',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else {
                    // Display a generic error message
                    toast.error('An error occurred while adding the user.', {
                        position: 'top-center',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            }
        }
    };


    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };
    return (
        <form className='flex flex-col items-center w-[90%] h-full gap-5' onSubmit={handleSubmit}>
            <div className='flex flex-col w-[90%] h-[70%] border-[2px] items-center '>
                {/* Basic details */}
                <div className='flex flex-col w-full h-[60%] items-center '>
                    <div className='flex w-[90%] h-[30%] items-center '>
                        <span className='text-[16px] font-semibold text-text'>Basic Details</span>
                    </div>
                    <div className='flex flex-col gap-7 w-[90%] h-[50%] '>
                        <div className='w-full h-[40%] flex justify-between'>
                            <input
                                type='text'
                                name='firstName'
                                placeholder='First Name'
                                value={formData.firstName}
                                onChange={handleChange}
                                className='w-[30%] h-[40px] outline-none border-[1px] border-[#D9D9D9] rounded-[4px] pl-3 placeholder:text-placeholder'
                            />
                            <input
                                type='text'
                                name='lastName'
                                placeholder='Last Name'
                                value={formData.lastName}
                                onChange={handleChange}
                                className='w-[30%] h-[40px] outline-none border-[1px] border-[#D9D9D9] rounded-[4px] pl-3 placeholder:text-placeholder'
                            />
                            <input
                                type='date'
                                name='dob'
                                placeholder='Date of Birth'
                                value={formData.dob}
                                onChange={handleChange}
                                className='w-[30%] h-[40px] outline-none border-[1px] border-[#D9D9D9] rounded-[4px] pl-3 placeholder:text-placeholder'
                            />
                        </div>
                        <div className='w-full h-[50%] '>
                            <Dropdown selectedOption={selectedOption} handleOptionSelect={handleOptionSelect} />
                        </div>
                    </div>
                </div>
                {/* Contact Details */}
                <div className='flex flex-col gap-5 w-[90%] h-[30%]' >
                    <div className='flex w-[90%] h-[30%]  items-center'>
                        <span className='text-[16px] font-semibold text-text'>Contact Details</span>
                    </div>
                    <div className='w-full h-[40%] flex gap-12'>
                        <input
                            type='text'
                            name='mobileNumber'
                            placeholder='Mobile Number'
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            className='w-[30%] h-[40px] outline-none border-[1px] border-[#D9D9D9] rounded-[4px] pl-3 placeholder:text-placeholder'
                        />
                        <input
                            type='text'
                            name='email'
                            placeholder='Email'
                            value={formData.email}
                            onChange={handleChange}
                            className='w-[30%] h-[40px] outline-none border-[1px] border-[#D9D9D9] rounded-[4px] pl-3 placeholder:text-placeholder'
                        />
                    </div>
                </div>
            </div>
            <div className='flex flex-row items-start justify-end w-[90%] h-[10%] gap-1  '>
                <Button
                    type="button"
                    handleClick={handleClear}
                    title="Clear"
                    style={{
                        color: '#003FE4',
                        border: "1px solid #003FE4"
                    }}
                />
                <Button
                    type="submit"
                    title="Save"
                    style={{
                        color: 'white',
                        backgroundColor: "#003FE4"
                    }}
                />
            </div>
            <ToastContainer />
        </form>
    );
}

export default AddDetails;
