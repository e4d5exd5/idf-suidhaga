import { createConnection } from 'mysql2/promise';
import { getServerSession } from 'next-auth/next';
import mysql from 'serverless-mysql';
import { authOptions } from "@/pages/api/auth/[...nextauth]";


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

    const connection = await createConnection({
        host: process.env.MYSQL_HOST,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD
    });

    const [rows] = await connection.execute('SELECT * FROM users');

    connection.end();
    console.log('Data sent to client:', { users: rows });

    return res.status(200).json({ users: rows });
  } catch (error) {
    console.error('Error fetching admin:', error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
