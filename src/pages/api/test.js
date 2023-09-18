import executeQueryFactory from "@/lib/db";
export default async function handler(req, res) {
    let exec = executeQueryFactory()

    exec({ query: 'SELECT * from user_roles', values: [] }).then((data) => { console.log(data); })
    return res.status(200).json({message: "Hey"})
}