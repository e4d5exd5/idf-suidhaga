import React from 'react'
import AdminNav from '@/components/Navbars/AdminNav.component'
import  ExcelReader  from "@/components/Admin/ExcelReader.component";
const bulkAdd = () => {

    return (
        <>
            <AdminNav></AdminNav>
            <div>
                <h1>Excel Reader</h1>
                <ExcelReader />
            </div>

        </>
    )
}

export default bulkAdd