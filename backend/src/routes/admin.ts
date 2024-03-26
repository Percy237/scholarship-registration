import express, {Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import Admin, { AdminType } from '../models/admin';

const router = express.Router();

//Route for user login

router.post('/login', async (req: Request, res: Response)=>{
    const {email, password} = req.body;

    try {
        //check if the user exists
        const admin = await Admin.findOne({email});
        if(!admin){
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if(!isPasswordValid){
             return res.status(401).json({ message: 'Invalid email or password' });
        }

        res.status(200).json({ message: 'Login Successful'});
    }catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
})

// Route for user registration
router.post('/register', async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  try {
    // Check if the user already exists
    const existingUser: AdminType | null = await Admin.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 8);

    // Create the new user
    const newUser = new Admin({ email, password: hashedPassword, name });
    await newUser.save();

    res.status(201).json({message: 'Registration Successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;