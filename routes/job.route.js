import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";

const JobRoute = express.Router();

// route/paths
JobRoute.route("/postjob").post(isAuthenticated,postJob);
JobRoute.route("/getalljobs").get(isAuthenticated,getAllJobs);
JobRoute.route("/getadminjobs").get(isAuthenticated,getAdminJobs);
JobRoute.route("/getjobbyid/:id").get(isAuthenticated,getJobById);
export default JobRoute