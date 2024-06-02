const userModel = require("../models/userModel");
const multer = require('multer');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/files');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'video/mp4'];
    if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error('Invalid file type. Supported types: PDF, PNG, JPEG, MP4'), false);
    }
    cb(null, true);
};

// Create the multer instance with the storage and file filter
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
}).fields([
    { name: 'resume', maxCount: 1 },
    { name: 'selfIntroVideo', maxCount: 1 },
    { name: 'profileImage', maxCount: 1 }
]);

const userController = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            gender,
            phone,
            dob,
            degree,
            cgpa,
            hsc,
            hscPercentage,
            sslc,
            sslcPercentage,
            addressOne,
            addressTwo,
            experience,
            yearsOfExperience
        } = req.body;

        // Check if files are present
        if (!req.files || !req.files.resume || !req.files.selfIntroVideo || !req.files.profileImage) {
            return res.status(400).json({ success: false, message: 'Resume, self introduction video, and profile image are required.' });
        }

        // Extract file paths from req.files
        const resumePath = req.files.resume[0].path;
        const selfIntroVideoPath = req.files.selfIntroVideo[0].path;
        const profileImagePath = req.files.profileImage[0].path;

          // Check if the user already exists
          const existingUser = await userModel.findOne({ email });
          if (existingUser) {
              return res.status(400).json({ success: false, message: 'User already exists with this email address.' });
          }
        // Create a new user instance
        const newUser = new userModel({
            name,
            email,
            password,
            gender,
            phone,
            dob,
            degree,
            cgpa,
            hsc,
            hscPercentage,
            sslc,
            sslcPercentage,
            addressOne,
            addressTwo,
            experience,
            yearsOfExperience,
            resume: resumePath,
            selfIntroVideo: selfIntroVideoPath,
            profileImage: profileImagePath
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ success: false, message: 'Server error during user registration' });
    }
};

module.exports = {
    userController,
    upload
};

