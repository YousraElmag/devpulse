import { useState } from "react";
import { handleSignupService } from "../services/authService"; 
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name,setName]=useState('')
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
     const navigate=useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const data = await handleSignupService(email, password,name);
            
            if (data&& data.message === 'user registed') {
                setSuccess('Signup successful! 🎉');
                   localStorage.setItem('token',data.token)
                  navigate("/login");
            } else {
                setError('Signup failed');
            }
        } catch (err: any) {
            setError('An error occurred');
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                </div>
                 <div>
                    <label>
                       name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <button type="submit">Signup</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default Signup;