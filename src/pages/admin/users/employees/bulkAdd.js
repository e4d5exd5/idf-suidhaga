import React from 'react'
import AdminNav from '@/components/Navbars/AdminNav.component'
import ExcelReader from "@/components/Admin/ExcelReader.component";
import Layout from '@/layouts/main.layout';
const bulkAdd = () => {

    return (

        <AdminNav>
            <h1 className="text-center text-2xl text-blue-500">Bulk Upload Users</h1>

            <ExcelReader />
        </AdminNav>


    )
}

export default bulkAdd