import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  username: { type: String, },
  email: { type: String, },
  password: { type: String, },
  fullName: { type: String, },
  location: { type: String, },
  role: { type: String, },
  bio: { type: String, },
  githubURL: { type: String,},
  linkedinURL: { type: String,},
  profileImage: { type: String, },
});

const profileModel = mongoose.model("Profile", profileSchema);

export default profileModel;
