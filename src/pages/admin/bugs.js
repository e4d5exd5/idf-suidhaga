import AdminLayout from "@/layouts/admin.layout";
import { useState , useEffect } from "react";
import { useSession } from 'next-auth/react'


const BugsAdmin = () =>{

    const [ bugs , setBugs ] = useState("");
    const { data: session, status } = useSession();
    console.log(status, session);

    useEffect(() => {
        const fetchBugs = async () => {
            try {
                const response = await fetch('/api/bugs/');
                const data = await response.json();
                console.log(response);
                if (response.ok) {
                    setBugs(data.bugs);
                    console.log(data.bugs);
                } else {
                    console.error('Error fetching users:', data.message);
                }
            } catch (error) {
                console.error('Error fetching users:', error.message);
            }
        };

        fetchBugs();
    }, []);

    console.log(Array.isArray(bugs));
    return(<>
        <AdminLayout>
        <div className='p-3'>
                <h1 className="font-semibold p-2 flex justify-center text-base">Bugs List</h1>
                <ul>
                    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                        <thead>
                            <tr className='bg-[#f2f2f2]'>
                                <th className='border border-solid border-black p-1 text-left'>Owner Id</th>
                                <th className='border border-solid border-black p-1 text-left'>Title</th>
                                <th className='border border-solid border-black p-1 text-left'>Description</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {bugs && bugs.map((bug) => (
                                <tr key={bug.id} className=' border border-solid border-black'>
                                    <td className='border border-solid border-black p-1 text-left'>{bug.ownerId}</td>
                                    <td className='border border-solid border-black p-1 text-left'>{bug.title}</td>
                                    <td className='border border-solid border-black p-1 text-left'>{bug.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </ul>
            </div>
        </AdminLayout>
    </>)
}

export default BugsAdmin;