import { Request, Response, NextFunction } from "express"


export const jobSeekerProfileCreate = (req: Request, res: Response, next: NextFunction) => {
   try {
       
   } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Failed to create Profile',
        error: error instanceof Error ? error.message : 'Unknown error'
    });
   }
}