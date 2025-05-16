'use client';

import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';


import Textinput from "@/components/ui/Textinput";

function signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  
  const {
    register,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:4001/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      
     
      if (response.ok && data.user.is_admin == 1 ) {

        localStorage.setItem('token', data.token);
        router.push('/');
        
      } else {
        alert('Invalid credentials or user is not an admin.');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      alert('Error signing in. Please try again later.');
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center bg-gradient-to-tr from-[#fff] from-30% to-[#6BA6FE]/40 to-100%">
      <div className="text-center">
        <h2 className="text-5xl mb-3">Welcome Back!</h2>
        <p className="mb-10 text-5xl text-black">Sign in with your credentials.</p>
        <div className="w-[80%] mx-auto">
          <Textinput 
            type="input"
            register={register}
            className="bg-white border border-gray-200 p-5 py-3 mb-5"
            name="email"
            placeholder="Enter Email ..." 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <Textinput 
             register={register}
             className="bg-white border border-gray-200 p-5 py-3 mb-5"
             name="password" 
             type="password" 
             placeholder="Enter Password ..." 
             value={password} 
             onChange={(e) => setPassword(e.target.value)}
           />
        </div>
        <div className="flex justify-between mb-5 w-[80%] mx-auto">
          <div>Remember me</div>
          <div>Forget password?</div>
        </div>
        <button onClick={handleSubmit} className="p-3 py-4 rounded-[10px] bg-[#6CA7FF] text-white  w-[80%]">Submit</button>
      </div>
    </div>
  );
}

export default signin;
