
import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/applicantion.controller.js";
const applicationRoutes = express.Router();

// route/paths
applicationRoutes.route("/apply/:id").get(isAuthenticated,applyJob);
applicationRoutes.route("/getapplications").get(isAuthenticated,getAppliedJobs);
applicationRoutes.route("/:id/applicants").get(isAuthenticated,getApplicants);
applicationRoutes.route("/status/:id/update").post(isAuthenticated,updateStatus);

export default applicationRoutes