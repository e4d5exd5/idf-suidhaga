import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { v4 as uuidv4 } from 'uuid';
import { Job, JobApplications, UserAuth } from "@/models/associations";
import { getUserData } from "@/pages/api/user/[slug]";

export default async function handler(req, res) {
    const { slug } = req.query;
    const method = req.method;
    const session = await getServerSession(req, res, authOptions);
    let userId = session ? session.user.userId : null;
    if (!slug) return res.status(400).json({ message: 'Bad request' })
    if (!userId) return res.status(401).json({ message: 'Unauthorized' })

    let job = await Job.findOne({ where: { id: slug, active: true } });
    if (!job) return res.status(404).json({ message: 'Job not found' })
    const isUserOwner = job.ownerId == userId


    switch (method) {
        case "GET":
            try {
                job = job.toJSON();
                job.attachments = JSON.parse(job.attachments);
                const owner = await getUserData(job.ownerId);
                job.owner = owner.toJSON();
                console.log(job.owner);

                if (job.ownerId == userId) {
                    job.isOwner = true;

                    const applications = await JobApplications.findAll({ where: { jobId: job.id } });
                    applications.map((application) => { application = application.toJSON() })
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

                return res.status(200).json({ job: job });
            }
            catch {
                console.error("Error fetching jobs:", error);
                return res.status(500).json({ error: "Internal Server Error" });
            };

            break;
        case "POST":
            // This POST is not for creating a new job, but for applying to a job
            const { userId, jobId } = req.body;
            if (!userId || !jobId) return res.status(400).json({ error: "Bad request" });
            // check user
            const user = await getUserData(userId);
            if (!user) return res.status(404).json({ error: "User not found" });

            if (user.UserAuth.role == 2) return res.status(403).json({ error: "Only workers can apply to jobs" });

            const timestamp = new Date().toISOString();
            var status = "pending";
            var active = true;
            let id = uuidv4();

            await Job.findOne({ where: { id: jobId } }).then(async (job) => {

                if (!job) return res.status(404).json({ error: "Job not found" });

                if (!job.active) return res.status(403).json({ error: "Job is not active" });

                if (job.ownerId == userId) return res.status(403).json({ error: "You cannot apply to your own job" });

                JobApplications.findOne({ where: { jobId: jobId, userId: userId } }).then((application) => {
                    if (application) return res.status(403).json({ error: "You have already applied to this job" });
                })
                JobApplications.count({ where: { jobId: jobId } }).then((count) => {
                    if (count >= job.noOfApplicants) return res.status(403).json({ error: "Job application limit reached" });
                })
                
                const applicant = await UserAuth.findOne({ where: { id: userId } });
                let jobApplication =  await applicant.addJob(job, { through: { id, timestamp, status, active } })
                // var jobApplication = await JobApplications.create({ id, JobId: jobId, userAuthId: userId, timestamp, status, active });
                if (jobApplication) {
                    return res.status(200).json({ message: "Job application successful" });
                } else {
                    return res.status(500).json({ error: "Internal Server Error" });
                }
            })
            break;


        case "PUT":
            // This PUT is not for updating a job, but for accepting or rejecting a job application
            if (!isUserOwner) return res.status(403).json({ message: 'Forbidden' })
            var { applicationId, status, active } = req.body;
            var jobApplication = await JobApplications.findOne({ where: { id: applicationId } });
            jobApplication.status = status;
            jobApplication.active = active;
            await jobApplication.save();
            return res.status(200).json({ message: "Job application status updated" });


        case "PATCH":
            if (user.userAuth.role == 3) return res.status(403).json({ message: 'Forbidden' })
            let { title, description, cost, material, noOfApplicants, attachments } = req.body;
            let job = await Job.findOne({ where: { id: slug } });
            job.title = title;
            job.description = description;
            job.cost = cost;
            job.material = material;
            job.noOfApplicants = noOfApplicants;
            job.attachments = attachments;
            await job.save();

        default:
            return res.status(405).json({ message: 'Method not allowed' })
    }

}