import { useState } from "react";
import { handleLoginService } from "../services/authService";

export const Login=()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState('')
    const [success,setSuccess]=useState('')
    const [error,setError]=useState('');

    const handleSubmit=async(e:React.FormEvent)=>{
        e.preventDefault();
        setError('');
        setSuccess("");
        try{
            const data=await handleLoginService(email,password);
            if(data && data.message==='login successful'){
                console.log('yes')
                setSuccess('login successful');
                localStorage.setItem('token',data.token)

            }else{
                setError('login faild')
            }
        }catch(err:any){
            setError('an error occurred')
        }
    };
    return(
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:<input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required /></label>
                </div>
                <div>
                    <label>
                        Password:
                        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    </label>
                </div>
                  <button type="submit">login</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    )

}