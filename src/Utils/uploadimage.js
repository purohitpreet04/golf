import fs from 'fs';
import multer from 'multer';
import path from 'path';
// import { uploadImageToS3 } from './s3Config.js';

// Create folders if they don't exist
const createFolderIfNotExists = (folderPath) => {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }
};

// Local storage configuration for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Determine the destination folder based on the file type
        const fileType = file.mimetype.split('/')[1];
        const folderPath = fileType === 'pdf' ? 'uploads/pdf' : 'uploads/image';

        // Ensure the folder exists
        createFolderIfNotExists(folderPath);

        cb(null, folderPath);
    },
    filename: function (req, file, cb) {
        // Save file with a unique name
        cb(null, Date.now() + '-' + file.originalname);
    },
});

// Multer middleware for handling uploads 
export const upload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } }).fields([

    { name: 'image', maxCount: 10 },
    { name: 'logo', maxCount: 10 },
    { name: 'file', maxCount: 10 },
    { name: 'pdf', maxCount: 5 },
]);

export const dynemicUpload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } })

/**
 * Middleware to handle multiple image and PDF uploads to local machine.
 * @returns {Function} - Express middleware function
 */
const uploadAndProcessFiles = (folder) => {
    return async (req, res, next) => {
        upload(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ error: 'Multer error during file upload', err });
            } else if (err) {
                return res.status(500).json({ error: 'Unknown error during file upload', err });
            }

            try {
                const uploadedFiles = [];
                if (req.files?.image) {
                    const imageUploads = req.files.image.map((file) => ({ path: file?.path, name: file?.originalname }));
                    const uploadedImages = await Promise.all(imageUploads);
                    // uploadedImages.forEach((img) => {
                    //     req.body['logo'] = img
                    // })
                    uploadedFiles.push(...uploadedImages);
                }

                if (req.files?.pdf) {
                    const imageUploads = req.files.pdf.map((file) => ({ path: file?.path, name: file?.originalname }));
                    const uploadedImages = await Promise.all(imageUploads);
                    uploadedFiles.push(...uploadedImages);
                }

                if (req.files?.file) {
                    // const imageUploads = req.files.file.map((file) => uploadImageToS3(file, 'file'));
                    const imageUploads = req.files.file.map((file) => ({ path: file?.path, name: file?.originalname }));
                    const uploadedImages = await Promise.all(imageUploads);
                    uploadedFiles.push(...uploadedImages);
                }
                // if (uploadedFiles.length > 0) {
                //     uploadedFiles.forEach((img) => {
                //         req.body[]
                //     })
                // }
                req.uploadedFiles = uploadedFiles;
                next();
            } catch (error) {
                console.log(error)
                return res.status(500).json({ message: 'Error during file processing', error });
            }
        });
    };
};

/**
 * Deletes a file from the uploads folder
 * @param {string} filePath - The path to the file to be deleted
 * @returns {Promise<boolean>} - Returns true if deletion was successful, false otherwise
 */
const deleteFile = (filePath) => {
    return new Promise((resolve) => {
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
                resolve(false);
            }
            resolve(true);
        });
    });
};

/**
 * Middleware to handle file deletion
 * @returns {Function} - Express middleware function
 */
const deleteUploadedFile = () => {
    return async (req, res, next) => {
        try {
            const { filePath } = req.body;

            if (!filePath) {
                return res.status(400).json({ error: 'File path is required' });
            }

            // Ensure the path is within the uploads directory to prevent unauthorized deletions
            const absolutePath = path.resolve(filePath);
            if (!absolutePath.startsWith(path.resolve('uploads'))) {
                return res.status(403).json({ error: 'Invalid file path' });
            }

            const success = await deleteFile(filePath);

            if (!success) {
                return res.status(500).json({ error: 'Failed to delete file' });
            }

            next();
        } catch (error) {
            return res.status(500).json({ error: 'Error during file deletion', details: error.message });
        }
    };
};



export const processUploads = (req, fields) => {
    console.log(fields);
    
    return new Promise((resolve, reject) => {
        dynemicUpload.fields(fields)(req, {}, (err) => {
            
            try {
                if (err) {
                    reject({ error: err.message });
                    return;
                }

                let uploadedPaths = {};

                fields.forEach(({ name }) => {
                    if (req.files && req.files[name]) {
                        uploadedPaths[name] = req.files[name].length === 1
                            ? req.files[name][0].path  // Single file
                            : req.files[name].map(file => file.path);  // Multiple files
                    }
                });

                resolve(uploadedPaths);
            } catch (error) {
                reject(error)
            }

        });
    });
};


export {
    uploadAndProcessFiles,
    deleteUploadedFile,
};
