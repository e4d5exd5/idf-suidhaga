import React, { useEffect, useState } from 'react'
import Layout from '@/layouts/main.layout'
import HomeNavbar from '@/components/Navbars/HomeNav.component'
import ProfileComp from '@/components/Profile.component'
import { useSession } from 'next-auth/react'
import { data } from 'autoprefixer'
import {Image} from "next/image"


const Profile = () => {
    const[uid,setUid] = useState("");
    const[ userData , setUserData ] = useState([]);

    const { data: session, status } = useSession()
    // console.log( session?.user)
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
    

    return (

        <Layout>
            <HomeNavbar selected='profile' />
            {/* <ProfileComp userData={userData} /> */}
            <div className="flex flex-col justify-center items-center text-center border-solid border-x-2 w-[100%]  border-gray-200 h-2/4">
                <div className="rounded-full w-32 h-32 overflow-hidden  mb-1 mt-4">
                    <img alt="" src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg" className="w-full h-full "></img>
                </div>
                <div className="mt-3">
                 {userData.map((index)=>(
                    <>
                     <span key={index.firstName} className=" items-center text-xl font-bold text-black font-serif">{index.firstName} {index.lastName}</span>
                    </>
                 ))}
                </div>
            </div>  
        </Layout>
    )
}

export default Profile