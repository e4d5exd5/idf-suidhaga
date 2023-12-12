import React, { useEffect, useState } from 'react'
import Layout from '@/layouts/main.layout'
import HomeNavbar from '@/components/Navbars/HomeNav.component'
import ProfileComp from '@/components/Profile.component'
import { useSession } from 'next-auth/react'
import { data } from 'autoprefixer'
import {Image} from "next/image"
import { Formik, useFormik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
// import executeQueryFactory from '@/lib/db'



const Profile = () => {
    const[uid,setUid] = useState("");
    const[ userData , setUserData ] = useState([]);
    const { data: session, status } = useSession()
    const[ editProfile , setEditProfile ] = useState(false);
    const route = useRouter();

    // DB
    // let exec = executeQueryFactory()

    // exec({ query: 'SELECT * from user_roles', values: [] }).then(data => {
    //     console.log(data)
    // })
    // return res.status(200).json({ message: 'Hey' })

    const formik = useFormik({
        initialValues: {
            mobile: '',
            f_name: '',
            m_name: '',
            l_name: '',
            aadharNumber: '',
            batchMonth: '',
            batchNumber: '',
            rollNo : '',
          },
          onSubmit: onSubmit
    })
    console.log( session?.user)


    useEffect(()=>{
        if (session) {
            setUid(session.user.userId);
        }
    },[session])
    // console.log(uid);

    useEffect(()=>{
        const getData = async() => {
            fetch(`/api/user/${uid}`)
                .then(response=>{
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                      }
                      return response.json();
                }).then(data => {
                    // console.log('Data received:', data);
                    setUserData( Object.entries(data?.user).map(([key, value]) => ({ [key]: value })));
                    // Handle the data as needed
                  }).catch(error => {
                    console.error('Error fetching data:', error);
                    // Handle errors
                  });
        }
        getData();
    },[uid])

    console.log(userData);

    async function onSubmit (values) {
        const url = `/api/user/`; // Replace with your actual API route
        console.log(url);
        const data = {
            firstName: values.f_name,
            middleName: values.m_name,
            lastName: values.l_name,
            aadharNumber: values.aadharNumber,
            mobile: values.mobile
        };
        console.log(data);
    
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                // Add any other headers you might need, such as authorization headers
            },
            body: JSON.stringify(data),
        });
        
        // console.log(response);
        const result = await response.json();
    
        console.log(result); // This will contain the response from your API
        // setEditProfile(false)
        // route.reload();
    };
    
    const editProfileModal = () => {
        if (editProfile===true) {
            setEditProfile(false);
        } else {
            setEditProfile(true)
        }
    }
    console.log(editProfile);

    return (

        <Layout>
            <HomeNavbar selected='profile' />
            {/* <ProfileComp userData={userData} /> */}
            <div className='border-solid border-x-2 w-[100%]  border-gray-200 h-max bg-white'>
            <div className="flex flex-col justify-center items-center text-center  ">
                <div className="w-[250px] h-[250px] rounded-[100%] overflow-hidden  mb-1 mt-4">
                    <img alt="" src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg" className="w-full h-full "></img>
                </div>
                <div className="mt-3">
                 {userData.map((index)=>(
                    <>
                     <span key={index.firstName} className=" items-center text-xl font-bold text-black font-serif">{index.firstName} {index.lastName}</span>
                    </>
                 ))}
                </div>
                {/* <button onClick={updateUser}>click me</button> */}
            </div>  
            <div id='profileDetails' className={`px-[5%] pb-[10%] mt-[2%]`}>
              <div className={`${session?.user.roleName==="Employee" ? "" : "hidden"}`}>
                <div className='flex justify-end px-[3%] text-sm text-gray-800 font-semibold cursor-pointer' onClick={editProfileModal}>Edit Profile</div>
                <div className='w-[100%] h-[1px] bg-gray-300 '/>
                <div className={`mt-[2%] flex flex-col gap-5  ${editProfile ? "hidden" : ""}`}> 
                    <div id="Name" className='flex flex-wrap justify-between' >
                        <div id='firstName' className='font-semibold text-lg'> First Name : <b/>
                            {userData.map((index)=>(<span className='font-normal' key={index.firstName}>{index?.firstName}</span>))}
                        </div>
                        <div id='middleName' className='font-semibold text-lg'> Middle Name : <b/>
                            {userData.map((index)=>(<span className='font-normal' key={index.middleName}>{index?.middleName}</span>))}
                        </div>
                        <div id='firstName' className='font-semibold text-lg'> Last Name : <b/>
                            {userData.map((index)=>(<span className='font-normal' key={index.lastName}>{index?.lastName}</span>))}
                        </div>
                    </div> 
                    <div id='contact' className='flex flex-wrap justify-between'>
                        <div className='font-semibold text-lg'> Phone : <span className='font-normal'>{session?.user.ph}</span></div>
                        <div className='font-semibold text-lg'>Aadhar Number : <b/>
                            {userData.map((index)=>(<span key={index.aadharNumber} className='font-normal'>{index?.aadharNumber}</span>))}</div>
                    </div>
                    <div id='batch' className='flex flex-wrap justify-between'>
                        <div id='rollNo.' className='font-semibold text-lg'> Roll No. : <b/>
                            {userData.map((index)=>(<span className='font-normal' key={index.rollNumber}>{index?.rollNumber}</span>))}
                        </div>
                        <div id='batchMonth' className='font-semibold text-lg'> Batch Month : <b/>
                            {userData.map((index)=>(<span className='font-normal' key={index.batchMonth}>{index?.batchMonth}</span>))}
                        </div>
                        <div id='batchNo' className='font-semibold text-lg'> Batch No. : <b/>
                            {userData.map((index)=>(<span className='font-normal' key={index.batchNo}>{index?.batchNo}</span>))}
                        </div>
                    </div>
                </div>
              </div>
                <div className={` mt-[5%] ${editProfile ? "" : "hidden"}`}>
                    <form className='flex flex-col gap-3' onSubmit={formik.handleSubmit}>
                        <div className='flex flex-row gap-[3%]'>
                            <div className={` w-[40%] flex border rounded-xl relative`}>
                                <input
                                    type='text'
                                    name='f_name'
                                    placeholder='First Name'
                                    className='w-full py-1 px-[10%] border rounded-lg bg-slate-50 focus:outline-none'
                                    required
                                    {...formik.getFieldProps('f_name')}
                            />
                            </div>
                            <div className={` w-[40%] flex border rounded-xl relative`}>
                                <input
                                    type='text'
                                    name='m_name'
                                    placeholder='Middle Name'
                                    className='w-full py-1 px-[10%] border rounded-lg bg-slate-50 focus:outline-none'
                                    required
                                    {...formik.getFieldProps('m_name')}
                            />
                            </div>
                            <div className={` w-[40%] flex border rounded-xl relative`}>
                                <input
                                    type='text'
                                    name='l_name'
                                    placeholder='Last Name'
                                    className='w-full py-1 px-[10%] border rounded-lg bg-slate-50 focus:outline-none'
                                    required
                                    {...formik.getFieldProps('l_name')}
                            />
                            </div>
                        </div>
                        <div>
                            <div className='flex flex-row gap-[3%]'>
                            <div className={` w-[40%] flex border rounded-xl relative`}>
                                <input
                                    type='tel'
                                    name='mobile'
                                    placeholder='Mobile'
                                    className='w-full py-1 px-[10%] border rounded-lg bg-slate-50 focus:outline-none'
                                    required
                                    {...formik.getFieldProps('mobile')}
                            />
                            </div>
                            <div className={` w-[60%] flex border rounded-xl relative`}>
                                <input
                                    type='tel'
                                    name='aadharNumber'
                                    placeholder='Aadhar Number'
                                    className='w-full py-1 px-[10%] border rounded-lg bg-slate-50 focus:outline-none'
                                    required
                                    maxLength={12}
                                    minLength={12}
                                    {...formik.getFieldProps('aadharNumber')}
                            />
                            </div>
                            </div>
                        </div>
                        
                        
                        <div className='input-button'>
                            <button
                                type='submit'
                                className='w-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-md py-3 text-gray-50 text-lg hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:border-blue-500 hover:text-gray-700 border'
                                >
                                Edit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            </div>
            
        </Layout>
    )
}

export default Profile