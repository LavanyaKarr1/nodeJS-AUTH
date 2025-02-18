const cloudinary=require('../config/cloudinary');

const uploadToCloudinary = async(filePath)=>{
    try{

        const result = await cloudinary.uploader.upload(filePath);
        return {
            url:result.secure_url,
            publicId:result.public_id
        };
        

    }catch(e){
        console.error('Error while Uploading to Cloudinary',e);
        throw new Error('Error while Uploading to Cloudinary');
        
    }

}

module.exports={
    uploadToCloudinary
};