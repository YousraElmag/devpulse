import axios from "axios";
export const handleSignupService = async (email: string, password: string,name:string) => {
    const response = await axios.post('/api/register', { email, password,name });
    console.log(response.data)
    return response.data; 
};