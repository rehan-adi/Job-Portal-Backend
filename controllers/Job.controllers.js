import postJobModel from "../models/PostJob.model.js";
import UserModel from "../models/User.js";

// create jobs
export const createJob = async (req, res) => {
  try {
    const {
      jobTitle,
      companyName,
      minSalary,
      maxSalary,
      salaryType,
      jobLocation,
      postingDate,
      experienceLevel,
      employmentType,
      requiredSkills,
      companyUrl,
      jobDescription,
      email,
    } = req.body;

    const newJob = new postJobModel({
      jobTitle,
      companyName,
      minSalary,
      maxSalary,
      salaryType,
      jobLocation,
      postingDate,
      experienceLevel,
      employmentType,
      requiredSkills,
      companyUrl,
      jobDescription,
      email,
    });

    await newJob.save();

    const users = await UserModel.find();

    res
      .status(201)
      .json({ message: "Job post created successfully", job: newJob });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Failed to create job", error);
  }
};

// Showing all jobs

export const getJobs = async (req, res) => {
  try {
    const jobs = await postJobModel.find();
    return res.status(200).json({ message: "Showing jobs", jobs });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Failed to fetch jobs", error);
  }
};

// get salary of jobs 

export const getSalary = async(req, res) => {
   try {
      const salary = await postJobModel.find();
      return res.status(200).json({ message: "Showing salary", salary });
   } catch (error) {
     console.log('Failed to get salary', error);
   }
}

// Showing single job details
export const getJobDetails = async (req, res) => {
  const id = req.params.id;

  try {
    const job = await postJobModel.findById(id);

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


