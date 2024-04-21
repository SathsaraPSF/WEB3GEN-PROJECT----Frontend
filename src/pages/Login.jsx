import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Login() {

    const navigate = useNavigate();

    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/login', {
                email: data.email,
                password: data.password
            });
            const { token } = response.data;
            localStorage.setItem('token', token);

            toast.success('Login Successfully', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                onClose: () => {
                    navigate('/UserOnboarding');
                }
            });
        } catch (error) {
            toast.error('Login Failed', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };


    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div className='w-[533px] h-[490px] border-[1px] border-blue-500'>
                <div className='w-full h-full flex flex-col'>
                    <div className='w-full h-[5%] bg-blue-500' />
                    <div className='flex items-center justify-center w-full h-[95%] '>

                        <form className=' flex flex-col w-[484px] h-[351px] gap-10' onSubmit={loginUser}>

                            {/* Header arera */}
                            <div className='flex flex-col  justify-center w-full h-[10%]'>
                                <span className='font-Lato text-[28px] font-[700] text-text text-center'>Login</span>
                                <span className='font-Lato font-[700] text-[16px] text-center  text-[#64748B]'>Lorem ipsum dolor sit amet consectetur. Risus commodo faucibus pellentesque habitan. Tincidunt</span>
                            </div>

                            {/* Input arera */}
                            <div className='relative flex flex-col gap-4 items-center justify-center h-[50%] '>

                                <input
                                    type='text '
                                    placeholder='Email'
                                    value={data.email}
                                    onChange={(e) => setData({ ...data, email: e.target.value })}
                                    className='w-full h-[40px] outline-none border-[1px] border-[#D9D9D9] rounded-[4px] pl-3 placeholder:text-placeholder' />
                                <input
                                    type='password'
                                    placeholder='Password'
                                    value={data.password}
                                    onChange={(e) => setData({ ...data, password: e.target.value })}
                                    className='w-full h-[40px] outline-none border-[1px] border-[#D9D9D9] rounded-[4px] pl-3 placeholder:text-placeholder' />

                                <span className='absolute bottom-0 right-0 font-Lato text-text'>Forgot Password</span>
                            </div>


                            {/* Login button area */}
                            <div className='flex items-center w-full h-[20%] '>
                                <button
                                    type='submit'
                                    className='w-full h-[40px] bg-blue-500 border-none outline-none rounded-[4px] text-[16px] font-medium text-white'
                                > Login </button>
                            </div>


                        </form>

                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Login