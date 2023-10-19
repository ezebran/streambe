'use client'
import { useRouter } from 'next/navigation'
import { loginDataTypes } from '@/types/loginTypes';
import axios from 'axios';

import Image from 'next/image';
import React, { ChangeEvent } from 'react';
import LoadingSpinner from '@/components/Spinner';
import { setCookie } from "cookies-next";

export default function Login() {
  const [loginValues, setLoginValues] = React.useState<loginDataTypes>({email:'',password:''});
  const [errorMessage, setErrorMessage] = React.useState<string>('');
  const [emailValidate, setEmailValidate] = React.useState<string>('');
  const [token, setToken] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter()

  React.useEffect(()=>{
    axios.get("https://www.mockachino.com/06c67c77-18c4-45/login")
      .then((response)=>{
        setEmailValidate(response.data.username)
        setToken(response.data.access_token)

      })
  },[])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLoginValues({
      ...loginValues,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
        if(emailValidate === loginValues.email){
          setIsLoading(true)
          setErrorMessage('')
          setCookie("token",token)
          router.push('/dashboard');
          
        }else{
          setErrorMessage('The email is incorrect.')
        }
  }
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
        <div className="flex justify-center mb-8">
          <Image
            src="/streambe_logo.svg" 
            alt="Descripción de la imagen"
            width={300} 
            height={200} 
          />
        </div>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            <h5 className="text-red-500">{errorMessage}</h5>
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-2">
            <button className="w-full px-4 py-2 mt-2 tracking-wide text-white transition-colors duration-200 transform bg-primary rounded-md hover:bg-hover focus:outline-none focus:bg-hover">
              {!isLoading ? 'Sign In' : <LoadingSpinner />}
              
              
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
