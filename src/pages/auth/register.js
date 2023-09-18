import React from 'react';
import Head from 'next/head'
import Link from 'next/link'
import { HiAtSymbol, HiFingerPrint, HiOutlinePhone, HiOutlineUser, HiOutlineKey, HiOutlineDocumentText, HiOutlineAnnotation } from "react-icons/hi";
import { useState } from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';

const Register = () => {


  const [show, setShow] = useState(false)
  const [cshow, setCShow] = useState(false)
  const [next, setNext] = useState(true)
  const [errorReq, setError] = useState('')
  const router = useRouter()
  // formik hook
  const formik = useFormik({
    initialValues: {
      ph: '',
      password: '',
      cpassword: '',
      designation: '',
      title: '',
      f_name: '',
      m_name: '',
      l_name: '',
      mob: '',
      qualification: ''
    },
    validate: (values) => {
      const errors = {};

      if (!values.ph) {
        errors.ph = 'Required';
      } else if (!/^\+?[0-9]\d{10}$/i.test(values.ph)) {
        errors.ph = 'Invalid Mobile Number';
      }

      // validate confirm password
      if (!values.cpassword) {
        errors.cpassword = "Required";
      } else if (values.password !== values.cpassword) {
        errors.cpassword = "Password Not Match...!"
      } else if (values.cpassword.includes(" ")) {
        errors.cpassword = "Invalid Confirm Password"
      }

      // validation for password
      if (!values.password) {
        errors.password = "Required";
      } else if (values.password.length < 8 || values.password.length > 20) {
        errors.password = "Must be greater then 8 and less then 20 characters long";
      } else if (values.password.includes(" ")) {
        errors.password = "Invalid Password";
      }

      // validation for designation
      if (values.designation.includes(" ")) {
        errors.designation = "Invalid Designation";
      }
      // validation for title
      if (!values.title) {
        errors.title = "Required";
      } else if (values.title.includes(" ")) {
        errors.title = "Invalid Title";
      }
      // validation for f_name
      if (!values.f_name) {
        errors.f_name = "Required";
      } else if (values.f_name.includes(" ")) {
        errors.f_name = "Invalid First Name";
      }
      // validation for m_name
      if (values.m_name.includes(" ")) {
        errors.m_name = "Invalid Middle Name";
      }
      // validation for l_name
      if (values.l_name.includes(" ")) {
        errors.l_name = "Invalid First Name";
      }

      // validation for mob
      if (!/^[0-9]*$/i.test(values.mob)) {
        errors.mob = "Mobile Number should only contains numbers";
      } else if (values.mob.length != 10) {
        errors.mob = "Mobile Number should be 10 digits";
      }

      return errors;
    },
    onSubmit: onSubmit
  })

  async function onSubmit(values) {

    const status = await fetch('/api/user/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ph: values.ph,
        password: values.password,
        designation: values.designation,
        title: values.title,
        f_name: values.f_name,
        m_name: values.m_name,
        l_name: values.l_name,
        mob: values.mob,
        qualification: values.qualification,
      })
    }).then(res => res.json())
      .then(data => {
        if (data.error != null)
          setError(res.error);
        else
          router.push('/auth/login');
      })
  }

  return (
    <>

      <Head>
        <title>Register</title>
      </Head>
      <div className='m-auto rounded-md w-3/5 h-3/4 grid lg:grid-cols-1 text-center'>
        <section className='w-3/4 mx-auto flex flex-col gap-10'>
          <div className="title">
            <h1 className='text-gray-800 text-4xl font-bold py-4'>Register</h1>
            <p className='w-3/4 mx-auto text-gray-400'></p>
          </div>

          {/* form */}
          <form className='flex flex-col gap-3' onSubmit={formik.handleSubmit}>

            {/* first page */}
            {/* {next ? <FirstPage /> : <SecondPage />} */}

            {(() => {
              if (next) {
                return (
                  <>
                    <div className={`flex border rounded-xl relative ${formik.errors.ph && formik.touched.ph ? 'border-rose-600' : ''}`}>
                      <input
                        type="tel"
                        name='ph'
                        placeholder='Mobile Number'
                                className='w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-none border-none '
                        {...formik.getFieldProps('ph')}
                      />
                            <span className='icon flex items-center px-4 text-lightWhite focus:text-violet'>
                                <HiAtSymbol size={25} className='' />
                      </span>

                    </div>
                    {formik.errors.ph && formik.touched.ph ? <span className='text-rose-500'>{formik.errors.ph}</span> : <></>}

                    <div className={`flex border rounded-xl relative ${formik.errors.password && formik.touched.password ? 'border-rose-600' : ''}`}>
                      <input
                        type={`${show ? "text" : "password"}`}
                        name='password'
                        placeholder='Password'
                        className='w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-none border-none '
                        {...formik.getFieldProps('password')}
                      />
                      <span className='icon flex items-center px-4' onClick={() => setShow(!show)}>
                        <HiFingerPrint size={25} />
                      </span>

                    </div>

                    {formik.errors.password && formik.touched.password ? <span className='text-rose-500'>{formik.errors.password}</span> : <></>}

                    <div className={`flex border rounded-xl relative ${formik.errors.cpassword && formik.touched.cpassword ? 'border-rose-600' : ''}`}>
                      <input
                        type={`${cshow ? "text" : "password"}`}
                        name='cpassword'
                        placeholder='Confirm Password'
                        className='w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-none border-none '
                        {...formik.getFieldProps('cpassword')}
                      />
                      <span className='icon flex items-center px-4' onClick={() => setCShow(!cshow)}>
                        <HiFingerPrint size={25} />
                      </span>

                    </div>
                    {formik.errors.cpassword && formik.touched.cpassword ? <span className='text-rose-500'>{formik.errors.cpassword}</span> : <></>}
                  </>
                )
              }
              else {
                return (<>
                  {/* Designation */}
                  <div className={`flex border rounded-xl relative ${formik.errors.designation && formik.touched.designation ? 'border-rose-600' : ''}`}>
                    <input
                      type="text"
                      name='designation'
                      placeholder='Designation'
                      className='w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-none border-none '
                      {...formik.getFieldProps('designation')}
                    />
                    <span className='icon flex items-center px-4'>
                      <HiOutlineKey size={25} />
                    </span>

                  </div>
                  {formik.errors.designation && formik.touched.designation ? <span className='text-rose-500'>{formik.errors.designation}</span> : <></>}

                  {/* Title */}
                  <div className={`flex border rounded-xl relative ${formik.errors.title && formik.touched.title ? 'border-rose-600' : ''}`}>
                    <select
                      name='title'
                      placeholder='Title'
                      default=''
                      className='w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-none border-none'
                      {...formik.getFieldProps('title')}
                    >
                    <option value="" className='w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-none border-none'>Title</option>
                    <option value="Mr" className='w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-none border-none'>Mr</option>
                    <option value="Miss" className='w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-none border-none'>Miss</option>
                    <option value="Mrs" className='w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-none border-none'>Mrs</option>
                    <option value="Dr" className='w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-none border-none'>Dr</option>
                    <option value="Fr" className='w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-none border-none'>Fr</option>
                    <option value="Sr" className='w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-none border-none'>Sr</option>
                    </select>
                    <span className='icon flex items-center px-4'>
                      <HiOutlineAnnotation size={25} />
                    </span>

                  </div>
                  {formik.errors.title && formik.touched.title ? <span className='text-rose-500'>{formik.errors.title}</span> : <></>}

                  {/* First Name */}
                  <div className={`flex border rounded-xl relative ${formik.errors.f_name && formik.touched.f_name ? 'border-rose-600' : ''}`}>
                    <input
                      type="text"
                      name='f_name'
                      placeholder='First Name'
                      className='w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-none border-none'
                      {...formik.getFieldProps('f_name')}
                    />
                    <span className='icon flex items-center px-4'>
                      <HiOutlineUser size={25} />
                    </span>

                  </div>
                  {formik.errors.f_name && formik.touched.f_name ? <span className='text-rose-500'>{formik.errors.f_name}</span> : <></>}

                  {/* Middle Name */}
                  <div className={`flex border rounded-xl relative ${formik.errors.m_name && formik.touched.m_name ? 'border-rose-600' : ''}`}>
                    <input
                      type="text"
                      name='m_name'
                      placeholder='Middle Name'
                      className='w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-none border-none'
                      {...formik.getFieldProps('m_name')}
                    />
                    <span className='icon flex items-center px-4'>
                      <HiOutlineUser size={25} />
                    </span>

                  </div>
                  {formik.errors.m_name && formik.touched.m_name ? <span className='text-rose-500'>{formik.errors.m_name}</span> : <></>}

                  {/* Last Name */}
                  <div className={`flex border rounded-xl relative ${formik.errors.l_name && formik.touched.l_name ? 'border-rose-600' : ''}`}>
                    <input
                      type="text"
                      name='l_name'
                      placeholder='Last Name'
                      className='w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-none border-none'
                      {...formik.getFieldProps('l_name')}
                    />
                    <span className='icon flex items-center px-4'>
                      <HiOutlineUser size={25} />
                    </span>

                  </div>
                  {formik.errors.l_name && formik.touched.l_name ? <span className='text-rose-500'>{formik.errors.l_name}</span> : <></>}

                  {/* Qualification */}
                  <div className={`flex border rounded-xl relative ${formik.errors.qualification && formik.touched.qualification ? 'border-rose-600' : ''}`}>
                    <input
                      type="text"
                      name='qualification'
                      placeholder='Qualification'
                      className='w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-none border-none'
                      {...formik.getFieldProps('qualification')}
                    />
                    <span className='icon flex items-center px-4'>
                      <HiOutlineDocumentText size={25} />
                    </span>

                  </div>
                  {formik.errors.qualification && formik.touched.qualification ? <span className='text-rose-500'>{formik.errors.qualification}</span> : <></>}

                  {/* Mobile Number */}
                  <div className={`flex border rounded-xl relative ${formik.errors.mob && formik.touched.mob ? 'border-rose-600' : ''}`}>
                    <input
                      type="text"
                      name='mob'
                      placeholder='Mobile Number'
                      className='w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-none border-none'
                      {...formik.getFieldProps('mob')}
                    />
                    <span className='icon flex items-center px-4'>
                      <HiOutlinePhone size={25} />
                    </span>

                  </div>
                  {formik.errors.mob && formik.touched.mob ? <span className='text-rose-500'>{formik.errors.mob}</span> : <></>}


                </>)
              }

            })()}

            {/* login buttons */}
            {next ?
              <>
                <div className="input-button">
                  <button type="button" className='w-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-md py-3 text-gray-50 text-lg hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:border-blue-500 hover:text-gray-700 border' onClick={() => setNext(!next)}>
                    Next
                  </button>
                </div></>
              :
              <>
                <div className="input-button">
                  <button type="button" className='w-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-md py-3 text-gray-50 text-lg hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:border-blue-500 hover:text-gray-700 border' onClick={() => setNext(!next)}>
                    Back
                  </button>
                </div>
                <div className="input-button">
                  <button type='submit' className='w-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-md py-3 text-gray-50 text-lg hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:border-blue-500 hover:text-gray-700 border'>
                    Register
                  </button>
                </div>
                {errorReq != '' ? <span className='text-rose-500'>{errorReq}</span> : <></>}
              </>}
          </form>

          {/* bottom */}
          <p className='text-center text-gray-400 '>Have an account? <Link href={'/auth/login'} className='text-blue-400'>Login</Link>
          </p>
        </section>
      </div>
    </>
  );
}

export default Register;
