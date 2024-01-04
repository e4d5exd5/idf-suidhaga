import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { v4 as uuidv4 } from 'uuid';
import { Job, JobApplications, UserAuth } from "@/models/associations";
import { getUserData } from "../user/[slug]";

export default async function handler(req, res) {
    const method = req.method;
    const session = await getServerSession(req, res, authOptions);
    let userId = session ? session.user.userId : null;

    switch (method) {
        case "GET":
            await Job.findAll({ where: { active: true } })
                .then(async (jobs) => {
                    // Use map to create an array of Promises for fetching additional data
                    const jobPromises = jobs.map(async (job) => {
                        job = job.toJSON();
                        job.attachments = JSON.parse(job.attachments);
                        const owner = await getUserData(job.ownerId);
                        job.owner = owner.toJSON();
                        console.log(job.owner);

                        if (job.ownerId == userId) {
                            job.isOwner = true;

                            const applications = await JobApplications.findAll({ where: { jobId: job.id } });
                            applications.map((application) => {application = application.toJSON()})
                            job.applications = applications;

                            // Use Promise.all to wait for all user data to be fetched
                            await Promise.all(job.applications.map(async (application) => {
                                application.user = await getUserData(application.userId);
                            }));
                        } else {
                            job.isOwner = false;
                        }

                        const count = await JobApplications.count({ where: { jobId: job.id } });
                        job.noOfApplicants = count;

                        return job;
                    });

                    // Wait for all promises to resolve using Promise.all
                    const jobsWithDetails = await Promise.all(jobPromises);
                    // console.log(jobsWithDetails);
                    return res.status(200).json({ jobs: jobsWithDetails });
                })
                .catch((error) => {
                    console.error("Error fetching jobs:", error);
                    return res.status(500).json({ error: "Internal Server Error" });
                });

            break;
        case "POST":
            // userId = req.body.userId;
            if (!userId) return res.status(401).json({ message: 'Unauthorized' })
            let { title, description, cost, material, noOfApplicants, attachments } = req.body;
            const active = true;
            const ownerId = userId;
            let id = uuidv4();
            let job = await Job.create({ id, ownerId, title, description, cost, material, active, noOfApplicants, attachments });

            if (!job) return res.status(500).json({ message: 'Something went wrong' })
            return res.status(200).json({ message: 'Job created successfully', job: job.toJSON() })

        default:
            res.status(405).json({ message: 'Method not allowed' });
            break;
    }

}
