import express, { Request, Response, Router } from "express";
import { check, validationResult } from "express-validator";
import Student from "../models/student";

const router = express.Router();

router.post(
    "/register",
    [
        check("fullName", "Full name is required").isString(),
        check("email", "Valid email is required").isEmail(),
        check("phoneNumber", "Phone number is required").isString(),
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            let student = await Student.findOne({ 
                email: req.body.email 
            });

            if (student) {
                return res.status(400).json({ message: "Student already exists" });
            }   

            student = new Student(req.body);
            await student.save();

            return res.status(200).send({ message: "Registration successful" });
        } catch (error) {
            console.error("Error:", error);
            return res.status(500).send({ message: "Something went wrong" });
        }
    }
);

// Route to get all students
router.get("/all", async (req: Request, res: Response) => {
    try {
        const students = await Student.find();
        return res.status(200).json(students);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ message: "Something went wrong" });
    }
});

// Route to get total number of students registered
router.get("/total", async (req: Request, res: Response) => {
    try {
        const totalStudents = await Student.countDocuments();
        res.status(200).json({ total: totalStudents });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
});


export default router;
