import { Document, Schema } from 'mongoose';

export interface User extends Document {
    email: string;
    password: string;
    role: string;
}

export interface JobSeeker extends Document {
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      fullName: {
        type: String,
        required: true,
      },
      resume?: String,
      skills: [String],
      education: [
        {
          degree: String,
          institution: String,
          yearOfCompletion: Number,
        },
      ],
      experience: [
        {
          jobTitle: String,
          company: String,
          from: Date,
          to: Date,
          description: String,
        },
      ],
}

export interface Profile extends Document {
    username: string;
    email: string;
    password: string;
    fullName: string;
    location: string;
    role: string;
    bio: string;
    githubURL: string;
    linkedinURL: string;
    profileImage: string;
}
