import Head from 'next/head'
import Link from 'next/link'
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { useState } from 'react';
import { signIn, signOut } from "next-auth/react"
import { useFormik } from 'formik';
import { useRouter } from 'next/router';


export default function Login() {

    const [show, setShow] = useState(false)
    const router = useRouter()
    // formik hook
    const formik = useFormik({
        initialValues: {
            ph: '',
            password: ''
        },
        validate: (values) => {
            const errors = {};

            if (!values.ph) {
                errors.ph = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.ph)) {
                errors.ph = 'Invalid ph address';
            }

            // validation for password
            if (!values.password) {
                errors.password = "Required";
            } else if (values.password.length < 8 || values.password.length > 20) {
                errors.password = "Must be greater then 8 and less then 20 characters long";
            } else if (values.password.includes(" ")) {
                errors.password = "Invalid Password";
            }

            return errors;
        },
        onSubmit
    })


    async function onSubmit(values) {
        const status = await signIn('credentials', {
            redirect: false,
            ph: values.ph,
            password: values.password,
            callbackUrl: "/"
        })
        if (status.ok) router.push(status.url)

    }

    return (
        <>  

            <Head>
                <title>Login</title>
            </Head>
            <div className='m-auto rounded-md w-3/5 h-3/4 grid lg:grid-cols-1 text-center'>
                <section className='w-3/4 mx-auto flex flex-col gap-10'>
                    <div className="title">
                        <h1 className='text-gray-800 text-4xl font-bold py-4'>Login</h1>
                        <p className='w-3/4 mx-auto text-gray-400'></p>
                    </div>

                    {/* form */}
                    <form className='flex flex-col gap-3' onSubmit={formik.handleSubmit}>
                        <div className={`flex border rounded-xl relative ${formik.errors.ph && formik.touched.ph ? 'border-rose-600' : ''}`}>
                            <input
                                type="tel"
                                name='ph'
                                placeholder='Mobile Number'
                                className='w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-none border-none;'
                                {...formik.getFieldProps('ph')}
                            />
                            <span className='icon flex items-center px-4'>
                                <HiAtSymbol size={25} />
                            </span>

                        </div>
                        {formik.errors.ph && formik.touched.ph ? <span className='text-rose-500'>{formik.errors.ph}</span> : <></>}

                        <div className={`flex border rounded-xl relative ${formik.errors.password && formik.touched.password ? 'border-rose-600' : ''}`}>
                            <input
                                type={`${show ? "text" : "password"}`}
                                name='password'
                                placeholder='password'
                                className='w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-none border-none;'
                                {...formik.getFieldProps('password')}
                            />
                            <span className='icon flex items-center px-4' onClick={() => setShow(!show)}>
                                <HiFingerPrint size={25} />
                            </span>

                        </div>

                        {formik.errors.password && formik.touched.password ? <span className='text-rose-500'>{formik.errors.password}</span> : <></>}
                        {/* login buttons */}
                        <div className="input-button">
                            <button type='submit' className='w-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-md py-3 text-gray-50 text-lg'>
                                Login
                            </button>
                        </div>
                    </form>

                    {/* bottom */}
                    <p className='text-center text-gray-400 '>Don{"'"}t have an account yet? <Link href={'/auth/register'} className='text-blue-400'>Register</Link>
                    </p>
                </section>
            </div>
        </>
    )
}