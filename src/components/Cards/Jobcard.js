/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { useSession } from 'next-auth/react'
import { Button } from 'antd'

const Card = ({ job }) => {
    const { data: session } = useSession()
    console.log(session?.user);
    const isOwner = job.ownerId === session?.user?.userId
    const isApplicant = job.applications?.some(application => application.userId === session?.user?.userId)
    const isApplied = job.applications?.some(application => application.userId === session?.user?.userId && application.status === 'pending')
    const isAccepted = job.applications?.some(application => application.userId === session?.user?.userId && application.status === 'accepted')
    const isRejected = job.applications?.some(application => application.userId === session?.user?.userId && application.status === 'rejected')
    const canApply = session?.user?.roleId === 3 && !isOwner && !isApplicant
    
    function apply() {
        fetch(`/api/job/${job.id}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                jobId: job.id,
                userId: session?.user?.userId,
            })
        }).then(res => res.json())
            .then(data => {
                alert(data.message)
            })
    }
    
    return (
        <section
            style={{ backgroundColor: 'white' }}
            className='text-red-400 bg-gray-900 body-font shadow-gray-500 shadow-xl rounded-xl overflow-hidden mb-4'
        >
            <div className='container px-5 py-24 mx-auto'>
                <div className='lg:w-4/5 mx-auto flex flex-col'>
                    <img
                        alt='ecommerce'
                        className='lg:w-1/2 w-1/2 lg:h-auto h-64 p-2 mx-2 my-2 object-cover object-center rounded-xl'
                        src='https://images.unsplash.com/photo-1617694820985-a5476fe22722?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2VhdmluZ3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80'
                    />
                    <div className='lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0 p-4'>
                        <h2 className='text-xl title-font text-black font-bold tracking-widest'>
                            {job.title}
                        </h2>
                        <div className='flex mb-4'>
                            <a className='flex-grow text-black border-b-2 border-blue-400 py-2 text-lg px-1'>
                                {job.description}
                            </a>
                        </div>
                        <div className='flex border-gray-600 py-2'>
                            <span className='text-black'>Posted by {' '}
                                <span className='text-black text-bold'>  {job.owner.title} {job.owner.firstName} {job.owner.middleName} {job.owner.lastName}</span>
                            </span>
                        </div>
                        <div className='flex border-t border-gray-600 py-2'>
                            <span className='text-black'>Materials will {job.material ? "" : "not"} be provied </span>
                        </div>

                        <div className='flex flex-col'>
                            <span className='title-font font-medium text-2xl text-black'>
                                ₹{job.cost}
                            </span>
                            <span className='title-font font-medium text-2xl text-black'>

                                {job.noOfApplicants > 0 ? `No of Applications :${job.noOfApplicants}` : ""}
                            </span>
                        </div>
                        
                        <div className='flex flex-col'>
                            {canApply?  <Button onClick={apply} >Apply</Button> : <></>}
                            {isApplicant ?
                                isApplied ? <span className='title-font font-medium text-2xl text-black'> You have applied for this job. </span> : 
                                isAccepted ? <span className='title-font font-medium text-2xl text-black'> You have been accepted for this job. </span> : 
                                isApplied ? <span className='title-font font-medium text-2xl text-black'> Sorry, you have been rejected for this job. </span> : <></>
                              :<></>}

                        </div>
                        
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Card
