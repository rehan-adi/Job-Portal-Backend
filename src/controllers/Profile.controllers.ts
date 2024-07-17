import { Request, Response } from 'express';
import profileModel from '../models/profile.js';

export const createProfile = async (req: Request, res: Response) => {
  try {
    const newProfile = new profileModel(req.body);
    await newProfile.save();
    console.log('New Profile ID:', newProfile._id);
    return res.status(200).json({
      success: true,
      message: 'Profile saved successfully',
      profileId: newProfile._id
    });
  } catch (error) {
    console.log('Failed to create profile', error);
    res.status(500).json({ error: 'Failed to create profile' });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const userProfile = await profileModel.findById(id);
    if (!userProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    return res.status(200).json({ message: 'Showing profile', userProfile });
  } catch (error) {
    console.log('Failed to fetch profile', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};
