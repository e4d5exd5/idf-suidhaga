import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { v4 as uuidv4 } from 'uuid';
import executeQuery from "@/lib/db";
import { hash, compare } from 'bcryptjs';
import { UserAuth, User } from "@/models/associations";

export default async function handler(req, res) {
    const method = req.method;

    const session = await getServerSession(req, res, authOptions);

    switch (method) {
        case 'GET': // Get user data for session user
            if (session) return res.status(307).redirect(`/api/user/${session.user.userId}`);
            return res.status(308).redirect('/api/auth/signin');

        case 'POST': // Create new user
            if (session) return res.status(307).redirect(`/api/user/${session.user.userId}`);
            const { mobile, password, title, firstName, middleName, lastName, aadharNumber } = req.body;
            const userId = uuidv4();
            const userHash = await hash(password, 10);
            const userRole = 2;
            // const Active = true;
            let newUserAuth 
            try {
            newUserAuth = await UserAuth.create({ id: userId, mobile, hash: userHash, role: userRole  })
            if (!newUserAuth)
                return res.status(409).json({ message: 'User already exists' })
                
            } catch (error) {
                console.log(error);
            }
            let newUser
            try {
            newUser = await User.create({ id: userId, title, firstName, middleName, lastName, aadharNumber })
            } catch (error) {
                console.log(error);
            }

            if (!newUser) {
                newUserAuth.destroy({
                    force: true
                })
                newUser.destroy({
                    force: true
                })
                return res.status(500).json({ message: 'Something went wrong' })
            }
            // var user_auth_data = await executeQuery({
            //     query: "INSERT INTO user_auth(user_id, user_ph, user_hash, user_role_id) VALUES (?,?,?,?)",
            //     values: [userId, ph, userHash, userRole]
            // })
            // if (user_auth_data.error.code == 'ER_DUP_ENTRY') return res.status(409).json({ message: 'User already exists' })

            // var user_acc_data = await executeQuery({
            //     query: "INSERT INTO user(user_id, user_first_name, user_last_name) VALUES (?,?,?);",
            //     values: [userId, firstName, lastName]
            // })
            // if (user_auth_data.affectedRows <= 0 || user_acc_data.affectedRows <= 0) {
            //     var user_auth_data_del = await executeQuery({
            //         query: "DELETE FROM user_auth WHERE user_id = ?",
            //         values: [userId]
            //     })
            //     var user_acc_data_del = await executeQuery({
            //         query: "DELETE FROM user WHERE user_id = ?",
            //         values: [userId]
            //     })
            //     return res.status(500).json({ message: 'Something went wrong' })
            // }
            return res.status(201).json({ message: 'User created successfully', user: { userId, mobile, title, firstName, lastName } });

            case 'PUT':
               if (!session) return res.status(401).json({ message: 'Unauthorized' });
    
                const { title: newTitle, firstName: newFirstName, lastName: newLastName , middleName: newMiddleName ,
                            aadharNumber: newAadharNumber , mobile : newMobile , 
                            rollNumber : newRollNumber , batchMonth : newBatchMonth , batchNo : newBatchNo} = req.body;
        
                try {
                    const [updatedRowsCount] = await User.update({
                        firstName: newFirstName,
                        lastName: newLastName,
                        middleName: newMiddleName,
                        aadharNumber: newAadharNumber,
                        mobile : newMobile,
                        rollNumber : newRollNumber,
                        batchMonth : newBatchMonth,
                        batchNo : newBatchNo,

                    }, {
                        where: { id: session.user.userId },
                    });

    
                     if (updatedRowsCount === 0) {
                         return res.status(404).json({ message: 'User not found' });
                     }
    
                     return res.status(200).json({ message: 'User updated successfully' });
                 } catch (error) {
                     console.error(error);
                     return res.status(500).json({ message: 'Something went wrong' });
               }
            

        case 'PATCH': // Reset password for session user
            if (!session) return res.status(308).redirect('/api/auth/signin');
            const { oldPassword, newPassword } = req.body;
            const user = await UserAuth.findOne({ where: { id: session.user.userId } })
            if (! await compare(oldPassword, user.hash)) return res.status(401).json({ message: 'Unauthorized' })
            const newHash = await hash(newPassword, 10);
            user.hash = newHash
            await user.save()
            return res.status(201).json({ message: 'Password updated successfully' });

        case 'DELETE': // Delete session user
            if (!session) return res.status(401).json({ message: 'Unauthorized' })
            return res.status(307).redirect(`/api/user/${session.user.userId}`)

        default:
            res.status(405).json({ message: 'Method not allowed' });
            break;
    }
}

