import {Company} from "../models/company.model.js"
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
export const registerCompany = async (req, res)=>{
    try {
        const {companyName} = req.body;
        if(!companyName){
            return res.status(400).json({
                message:"Company Name is Required.",
                success:false
            });
        }
        let company = await Company.findOne({name:companyName});
        if(company){
            return res.status(400).json({
                message:"This Company name allready registered on this site.",
                success:false
            });
        }
        company = await Company.create({
            name:companyName,
            userId:req.id
        });

        return res.status(201).json({
            message:"Company registered successfully.",
            company,
            success:true
        });
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message:"Error at Company register time",
            success:false
        });
    }
}

export const getCompany= async (req, res)=>{
    try {
        const userId = req.id;
        const companies = await Company.find({userId});
        if(!companies){
            return res.status(404).json({
                message:"Company not found.",
                success:false
            });
        }
        return res.status(200).json({
            message:"these are your registred companies",
            companies,
            success:true
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message:"Error at Company searching.",
            success:false
        });
    }
}

// getting company by id
export const getCompanyById = async (req, res)=>{
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if(!company){
            return res.status(404).json({
                message:"Company not found.",
                success:false
            });
        }
        return res.status(200).json({
            message:"Company found",
            company,
            success:true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message:"Error at Company searching.",
            success:false
        });
    }
}

export const updateCompany = async (req, res)=>{
    try {
        const {name, description, website, location} = req.body;
        const file = req.file;
        //  idhar cloudinary ayega;
        const fileUri = getDataUri(file);
        const cloudResponce = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponce.secure_url;
        const companyId = req.params.id;
        const updateData = {name, description, website, location, logo};

        const company = await Company.findByIdAndUpdate(companyId, updateData, {new:true,runValidators:true});
        if(!company){
            return res.status(404).json({
                message:"company not found.",
                success:false
            });
        }
        return res.status(200).json({
            message:"Company information is Updated.",
            newData:company,
            success:true
        });
    } catch (error) {
        console.error(error)
        return res.status(404).json({
            message:"error in updating",
            success:false
        });
    }

}