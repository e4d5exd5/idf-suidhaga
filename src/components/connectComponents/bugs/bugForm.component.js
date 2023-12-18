import { useState , useEffect } from "react"
import { useSession } from 'next-auth/react'
import { Formik, useFormik } from 'formik'




const BugForm = () =>{
    
    const[ formData , setFormData ] = useState([]);
    const { data: session, status } = useSession();
    const[uid,setUid] = useState("");



    const formik = useFormik({
        initialValues: {
            title: '',
            description:''
          },
          onSubmit: onSubmit
    });

    useEffect(()=>{
        if (session) {
            setUid(session.user.userId);
        }
    },[session]);

    async function onSubmit(values){
        const url = "/api/bugs/"
        const data = {
            title: values.title,
            description: values.description
        };
        console.log(data);

        try {
            console.log("hi");
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    // Add any other headers you might need, such as authorization headers
                },
                body: JSON.stringify(data),
            });
            console.log("post")
            
            // console.log(response);
            const result = await response.json();
        
            console.log(result);
        } catch (error) {
            console.log(error);
        }
         // This will contain the response from your API
  
    }

    return(
        <>
        <div className="absolute ">
            <form className='flex flex-col gap-3' onSubmit={formik.handleSubmit}>
            <div className={` w-[40%] flex border rounded-xl relative`}>
                                <input
                                    type='text'
                                    name='title'
                                    placeholder='Title'
                                    className='w-full py-1 px-[10%] border rounded-lg bg-slate-50 focus:outline-none'
                                    // required
                                    {...formik.getFieldProps('title')}
                            />
                            </div>
                            <div className={` w-[40%] flex border rounded-xl relative`}>
                                <input
                                    type='text'
                                    name='description'
                                    placeholder='description'
                                    className='w-full py-1 px-[10%] border rounded-lg bg-slate-50 focus:outline-none'
                                    required
                                    {...formik.getFieldProps('description')}
                            />
                            </div>

                <button 
                    type="submit" 
                    className='w-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-md py-3 text-gray-50 text-lg hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:border-blue-500 hover:text-gray-700 border'>
                        Submit
                </button>
            </form>
        </div>
        </>
    )
}

export default BugForm;

