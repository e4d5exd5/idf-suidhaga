import { createConnection } from 'mysql2/promise';
import { getServerSession } from 'next-auth/next';
import mysql from 'serverless-mysql';
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { User, UserAuth, UserRole } from "@/models/associations";

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const session = await getServerSession(req, res, authOptions);
        // console.log(session);

        if (!session) {
            return res.status(401).json({ message: 'Unauthorized' });
        }


        const rows = await User.findAll({
            include: [{
                model: UserAuth,
                attributes: ['mobile', 'role'],
                include: {
                    model: UserRole,
                    attributes: ['name']
                }
            }],
        });

        return res.status(200).json({ users: rows });
    } catch (error) {
        console.error('Error fetching admin:', error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
