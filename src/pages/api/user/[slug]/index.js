import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import executeQuery from "@/lib/db";
const { UserAuth, User, UserRole } = require('@/models/User')
// import { models } from "@/lib/db"

export async function getUserData(slug) {
    var user = await User.findOne({
        include: [{
            model: UserAuth,
            attributes: ['mobile', 'role'],
            include: {
                model: UserRole,
                attributes: ['name']
            }
        }],
        where: { id: slug }
    })
    return user;
}


export default async function handler(req, res) {
    const method = req.method;
    const slug = req.query.slug;
    const session = await getServerSession(req, res, authOptions);
    switch (method) {
        case 'GET': // Get user data for slug user
            // Optional: Check if session user can access this user data
            // UserAuth.create({
            //         id: 0,
            //         mobile: 8369961686,
            //         hash: 'qweqweqwe',
            //         role: 0
            //     })
            //     User.create({
            //         id: 0,
            //         title: 'Mr',
            //         firstName: 'Aditya',
            //         middleName: 'Rajesh',
            //         lastName: 'Sawant',
            //         aadharNumber: 123412341234
            //     })
            var user = await getUserData(slug);
            if (user != null) return res.status(200).json({ message: 'User found', user: user.toJSON() });
            return res.status(404).json({ message: 'User not found' })


        case 'PATCH': // Update user data for slug user
            if (slug !== session?.user?.userId) return res.status(401).json({ message: 'Unauthorized' })
            
            var user = await User.update(req.body, {where: {id: slug}})
            if (!user) return res.status(500).json({ message: 'Something went wrong' });
            return res.status(201).json({ message: 'User updated successfully', user });
 
        case 'DELETE': // Delete slug user  NOT IMPLEMENTED
            if (slug !== session.user.userId) return res.status(401).json({ message: 'Unauthorized' })
            return res.status(501).json({ message: 'Not implemented' })

        default:
            res.status(405).json({ message: 'Method not allowed' });
            break;
    }
}
