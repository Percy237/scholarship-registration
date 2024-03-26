import { LoginFormData } from "./pages/AdminLoginPage";
import { RegistrationFormData } from "./pages/Register";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const register = async (formData: RegistrationFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/students/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    const responseBody = await response.json();

    if (!response.ok){
        throw new Error(responseBody.message)
    }
}

export const adminLogin = async (formData: LoginFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    const responseBody = await response.json();

    if (!response.ok){
        throw new Error(responseBody.message)
    }
}

// Getting all students
export const getAllStudents = async () => {
    const response = await fetch(`${API_BASE_URL}/api/students/all`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const students = await response.json();

    if (!response.ok){
        throw new Error("Failed to fetch students");
    }

    return students;
}

// Get total number of students
export const getTotalNumberOfStudents = async () => {
    const response = await fetch(`${API_BASE_URL}/api/students/total`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const totalStudents = await response.json();

    if (!response.ok){
        throw new Error("Failed to fetch total number of students");
    }

    return totalStudents;
}

