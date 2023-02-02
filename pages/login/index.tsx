import axios from '../../utils/asiox'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import query from '../../utils/graphql/query'
import { useRecoilState } from 'recoil'
import { authAtom } from '../../atom/authAtom'

const index = () => {
    const router = useRouter()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [user, setUser] = useRecoilState(authAtom)

    const onSubmit = (e: React.FormEvent<HTMLFormElement> | any) => {
        e.preventDefault()
        if (e.target.email.value && e.target.password.value) {
            const id = toast.loading('Loading ⏳ ..')
            axios.post('', query.getUserByemailAndPassword(e.target.email.value, e.target.password.value)).then(res => {
                setEmail('')
                setPassword('')
                setUser(res.data.data.user_user[0])
                toast.success('You have successfully login', { id })
                router.push('/')
            }).catch(err => {
                toast.error('Invaild Username Or Password', { id })
                setUser(null)
            })
        } else {
            toast.error('Please provide Username and Password to login')
        }
    }

    return (
        <div className='flex items-center justify-center bg-gray-900 w-screen h-screen'>
            <div className='w-[500px] h-[500px] bg-gray-300 text-black rounded'>
                <h2 className='text-center text-lg font-semibold my-4 tracking-wider'>Login</h2>
                <hr className='border-gray-400' />
                <form className='flex flex-col space-y-4 px-8 mt-6' onSubmit={onSubmit}>
                    <div className='w-full flex justify-center flex-col'>
                        <label htmlFor="email" className='text-base pb-1' >Username</label>
                        <input autoComplete='off' className='h-10 w-full pl-2 outline-none rounded text-center' type="email" id='email' placeholder='Username' name='email' value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className='w-full flex justify-center flex-col'>
                        <label htmlFor="password" className='text-base pb-1'>Password</label>
                        <input autoComplete="off" className='h-10 w-full pl-2 outline-none rounded text-center' type="password" id='password' name='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' />
                    </div>
                    <div className='flex items-center w-full justify-center pt-2'>
                        <button className='w-60 py-2 bg-gray-800 text-white hover:bg-gray-900 rounded'>Login</button>
                    </div>
                    <div className='flex items-center justify-center'>
                        <span className='h-[0.3px] w-[40%] bg-black' />
                        <p className='text-center px-2'>or</p>
                        <span className='h-[0.3px] w-[40%] bg-black' />
                    </div>
                    <div className='flex items-center w-full justify-center'>
                        <button type='button' className='w-60 py-2 bg-[#4285F4]/80 text-white hover:bg-[#4285F4] rounded'>Google</button>
                    </div>
                    <div className='flex items-center w-full justify-center pt-2'>
                        <button type='button' className='w-60 py-2 bg-[#3b5998]/80 text-white hover:bg-[#3b5998] rounded'>Facebook</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default index