import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Bugs } from "@/models/Bugs";
import { UserAuth, User } from "@/models/User";
import { v4 as uuidv4 } from 'uuid';


export default async function Handler(req, res){
    const method = req.method;

    const session = await getServerSession(req, res, authOptions);

    switch(method){
        case 'GET' : //Get bugs data 
        console.log(session)
        if(session){
            try {
                // Fetch bug data from the database, e.g., using Sequelize
                const bugs = await Bugs.findAll();
                console.log(bugs);
    
                // Return the fetched bug data in the response
                return res.status(200).json({ bugs });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ message: 'Internal Server Error' });
            } 
        }
           

        case'POST' : //Post the bugs
        const userId = session?.user.userId;
        console.log(userId);
        if (!userId) return res.status(401).json({ message: 'Unauthorized' });

            // if(session) return res.status(307)
            console.log(session);
            const{ title , description } = req.body;
            const ownerId = userId;
            let id = uuidv4();
            console.log(req.body);
            try {
                const bug = await Bugs.create({ id , ownerId , title , description});

                if (!bug) return res.status(500).json({ message: 'Something went wrong' });
                return res.status(200).json({ message: 'bug posted successfully', bug });
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: 'Something went wrong' });
            }

           

        default : 
            res.status(405).json({ message: 'Method not allowed' });
            break;
    }
}