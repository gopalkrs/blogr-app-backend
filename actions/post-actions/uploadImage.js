import { v4 as uuidv4 } from 'uuid';
import AWS from 'aws-sdk';

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});
  
  const s3 = new AWS.S3();
const uploadImage = async (req, res) => {
    try{
        const file = req.file;
        const fileName = `${uuidv4()}-${file.originalname}`;

        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileName,
            Body: file.buffer,
            ContentType: file.mimetype,
            //ACL: 'public-read',
        };

        const data = await s3.upload(params).promise();
        res.json({
            message: 'Image uploaded successfully',
            imageUrl: data.Location,
        })
    } catch(err){
        console.error(err);
        res.status(500).json({ message: 'Error uploading image', error: err.message });
    }
}

export default uploadImage;