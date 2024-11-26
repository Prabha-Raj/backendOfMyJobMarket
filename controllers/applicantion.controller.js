import { Application } from "../models/application,model.js";
import { Job } from "../models/job.model.js";
export const applyJob = async (req, res)=>{
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if(!jobId){
            return res.status(404).json({
                message:"Job not fond (job id is required), something went wrong",
                success:false
            });
        }
        // check if the user already applied for this job 
        const existingApplication = await Application.findOne({job:jobId, applicant:userId});
        if(existingApplication){
            return res.status(400).json({
                message:"You have already applied for this job.",
                success:false
            });
        }

        // check if the job exists
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message:"Job not found",
                success:false
            });
        }

        // create a new application
        const newApplication = await Application.create({
            job:jobId,
            applicant:userId
        });

        job.applications.push(newApplication._id);
        await job.save();
        return res.status(200).json({
            message:"job applied successfully",
            success:true
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message:"Internal Server error",
            success:false
        })
    }
}

export const getAppliedJobs = async (req, res)=>{
    try {
        const userId = req.id;
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:"job",
            options:{sort:{createdAt:-1}},
            populate:{
                path:"company",
                options:{sort:{createdAt:-1}}
            }
        });
        if(!application){
            return res.status(404).json({
                message:"No any application",
                success:false
            });
        }    
        return res.status(200).json({
            message:"these are the applications",
            application,
            success:true
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message:"Internal server error.",
            success:false
        });
    }
}


// for admin to see all aplications
export const getApplicants = async (req, res)=>{
    try {
       const jobId = req.params.id;
       const job = await Job.findById(jobId).populate({
        path:"applications",
        options:{sort:{createdAt:-1}},
        populate:{
            path:"applicant"
        }
       }); 
       if(!job){
        return res.status(404).json({
            message:"job not found",
            success:false
        });
       }
       return res.status(200).json({
        message:"Job found!",
        job,
        success:true
       });
       
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message:"Internal server error.",
            success:false
        });
    }
}

export const updateStatus = async (req, res)=>{
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
                message:"status is required!",
                success:false
            });
        }

        // find the application by aplication id
        const application = await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(404).json({
                message:"Application not found!",
                success:false
            });
        }

        // update the status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message:"status updated successfully!",
            success:true
        });


    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message:"Internal server error.",
            success:false
        });
    }
}

