import React, { useEffect, useState } from 'react';
import './App.css';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Label } from './components/ui/label';
import { Input } from './components/ui/input';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

function App() {

  const [showPassword, setShowPassword] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [displayData, setDisplayData] = useState([]);

  const createUser = async (e) => {
    e.preventDefault();
    setIsSigning(true);
    try {
      await axios.post('http://localhost:5001/api', data);
      setDisplayData({ name: data.name, email: data.email });
      toast.success('Account Created Successfully !');
      setData({ name: '', email: '', password: '' });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsSigning(false);
    }
  };

  useEffect(() => {
    if (displayData.name && displayData.email) {
      const timer = setTimeout(() => {
        setDisplayData([]);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [displayData]);


  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <ToastContainer position='top-center' />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create a new account</CardTitle>
          <CardDescription>
            Enter your details below to create your account
          </CardDescription>

        </CardHeader>
        <CardContent>
          <form onSubmit={createUser}>
            <div className="flex flex-col gap-6">

              <div className="grid gap-2">
                <Label>Name</Label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                />
              </div>

              <div className="grid gap-2">
                <Label>Email</Label>
                <Input
                  type="text"
                  placeholder="m@example.com"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </div>

              <div className="grid gap-2">
                <Label>Password</Label>
                <div className='w-full flex justify-center items-center gap-2'>
                  <Input
                    type={`${showPassword ? 'text' : 'password'}`}
                    placeholder="m@example.com"
                    value={data.password}
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                  />
                  {showPassword ? <IoEyeOff size={25} onClick={() => setShowPassword(!showPassword)} /> : <IoEye size={25} onClick={() => setShowPassword(!showPassword)} />}
                </div>
              </div>

              {isSigning ? <Button>Signing....</Button> : <Button type='submit'>Sign Up</Button>}

            </div>
          </form>
        </CardContent>
      </Card>

      {displayData.name && displayData.email ?
        <div className='mt-10'>
          <p>The Data will disappear in 10 seconds</p>
          <h2>Welcome, {displayData.name}</h2>
          <h5>Signed in as: {displayData.email}</h5>
        </div>
        : null}
    </div>
  )
}

export default App