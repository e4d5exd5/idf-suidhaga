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
                    setBugs(data);
                    console.log(data);
                } else {
                    console.error('Error fetching users:', data.message);
                }
            } catch (error) {
                console.error('Error fetching users:', error.message);
            }
        };

        fetchBugs();
    }, []);


    return(<>
        <AdminLayout>

        </AdminLayout>
    </>)
}

export default BugsAdmin;