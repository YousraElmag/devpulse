import axios from "axios";
export const handleSignupService = async (email: string, password: string,name:string) => {
    const response = await axios.post('/api/register', { email, password,name });
    return response.data; 
};
export const handleLoginService=async(email:string,password:string)=>{
    const response=await axios.post('/api/login',{email,password});
return response.data;
}