import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { User, UserAuth, UserRole } from '@/models/User'

export default async function handler(req, res) {
    const method = req.method;
    const slug = req.query.slug;
    const session = await getServerSession(req, res, authOptions);
    console.log(session);

    switch (method) {
        case 'GET': // Get user data for slug user

            // Optional: Check if session user can access this user data
            return User.findOne({ where: { id: slug } }).then((user) => {
                return user.getUserAuth()
            }).then((userAuth) => {
                return userAuth.getUserRole()
            }).then((userRole) => {
                return res.status(200).json({ role: userRole.name })
            }).catch((err) => {
                res.status(500).json({ message: 'Somthing went wrong' })
            })

        case 'PATCH': // Update user data for slug user

            const { roleId, uId } = req.body;
            if(session?.user?.userId === uId) return res.status(400).json({message: 'Cannot change your Role. Please contact Admin.'})
            if(session?.user?.roleId < roleId) return res.status(426).json({message: 'Cannot change to a role higher than yours.'})
            if (session?.user?.roleId < 1) return res.status(403).json({ message: 'You cannot change any roles.' })
            
            return  UserAuth.update({role: roleId}, {where: {id: uId}}).then((user)=>{
                return res.status(200).json({ message: 'User updated successfully' });
            }).catch((err)=>{
                return res.status(500).json({ message: 'Something went wrong' });
            })
            
        default:
            res.status(405).json({ message: 'Method not allowed' });
            break;
    }
}
