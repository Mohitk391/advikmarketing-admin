import { https } from 'firebase-functions';
import admin from 'firebase-admin';
const storage = admin.storage();





export const getFileFromStorage = https.onRequest(async (req, res) => {
    const filePath = req.path.replace('/files/', ''); // Extract the file path
    const bucket = storage().bucket();
    
    try {
        const file = bucket.file(filePath);
        const [exists] = await file.exists();
        
        if (!exists) {
            return res.status(404).send('File not found');
        }
        
        const readStream = file.createReadStream();
        res.set('Content-Type', 'application/octet-stream'); // Set appropriate content type
        readStream.pipe(res);
    } catch (error) {
        console.error('Error retrieving file:', error);
        res.status(500).send('Error retrieving file');
    }
});
