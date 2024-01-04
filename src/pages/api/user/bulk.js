import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { v4 as uuidv4 } from 'uuid';
import executeQuery from "@/lib/db";
import { hash, compare } from 'bcryptjs';
import { UserAuth, User } from "@/models/associations";

export default async function handler(req, res) {
    const method = req.method;

    const session = await getServerSession(req, res, authOptions);
    if (!session || session.user.role <= 1) return res.status(403).json({ message: 'Unauthorized' });

    switch (method) {
        case 'POST':
            const { formattedData } = req.body;
            
            let userAuthData = []
            let userData = []
            await Promise.all(formattedData.map(async (row) => {
                const id = uuidv4();
                const role = 2;
                const pass_hash = await hash(process.env.DEFAULT_PASSWORD, 10);

                userAuthData.push({ id, mobile: row.mobile, hash: pass_hash, role });
                userData.push({
                    id: id,
                    title: row.title,
                    firstName: row.firstName,
                    middleName: row.middleName,
                    lastName: row.lastName,
                    aadharNumber: row.aadharNumber,
                    rollNumber: '' + row.rollNumber,
                    batchMonth: '' + row.batchMonth,
                    batchNo: '' + row.batchNo
                });
            }));
            UserAuth.bulkCreate(userAuthData, { individualHooks: true })
            .then(async (userAuths) => {
                let newUserAuths = userAuths
                User.bulkCreate(userData, { individualHooks: true })
                .then(async (users) => {
                    return res.status(200).json({ message: 'Users added successfully' });
                })
                .catch((err) => {
                    console.log(err);
                    return res.status(500).json({ message: 'Something went wrong with User Data creation' });
                })
                
            }).catch((err) => {
                console.log(err);
                return res.status(500).json({ message: 'Something went wrong  with User Auth creation' })
            })
           
            break;
        default:
            res.status(405).json({ message: 'Method not allowed' });
            break;

    }
}