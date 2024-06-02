const mongoose=require('mongoose')

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    phone: { type: String, required: true },
    dob: { type: Date, required: true },
    resume: { type: String, required: true },
    selfIntroVideo: { type: String, required: true },
    profileImage: { type: String, required: true },
    degree: { type: String, required: true },
    cgpa: { type: String, required: true },
    hsc: { type: String, required: true },
    hscPercentage: { type: String, required: true },
    sslc: { type: String, required: true },
    sslcPercentage: { type: String, required: true },
    addressOne: { type: String, required: true },
    addressTwo: { type: String, required: true },
    experience: { type: String, required: true },
    yearsOfExperience: { type: String }
  });

  const userModel = mongoose.model('User', UserSchema);

  module.exports=userModel;