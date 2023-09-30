import Navbar, {NavLink} from '@/components/Navbars/Navbar.component'

import React from 'react'

const AdminNav = () => {
  return (
      <Navbar>
          <NavLink href={'/admin/users/employees/bulkAdd'}>Bulk Add</NavLink>
      </Navbar>
  )
}

export default AdminNav