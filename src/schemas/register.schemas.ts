import { z } from "zod";

const registerValidationSchema = z.object({
    name: z.string().min(1, "Please enter your name!"),
    email: z.string().email("Please enter a valid email address!"),
    mobileNumber: z.string().min(9, "Please enter your mobileNumber!"),
    password: z.string().min(6, "Must be at least 6 characters."),
});

export default registerValidationSchema;