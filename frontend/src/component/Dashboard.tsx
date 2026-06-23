import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar'; 
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export const Dashboard: React.FC = () => {
    const [stats, setStats] = useState<any>(null);
    const [languagesData, setLanguagesData] = useState<any>(null);
    const [githubUsername, setGithubUsername] = useState<string>('');
    const [isLinked, setIsLinked] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    const GITHUB_CLIENT_ID = "Ov23liTtXUftttMYERJq"; 

    useEffect(() => {
const fetchGithubData = async () => {
    const token = localStorage.getItem('token'); 

    if (!token) {
        navigate('/login'); 
        return;
    }

    try {
        const response = await axios.get('/api/github-stats', {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });

        if (response.data.success) {
            setStats(response.data.stats);
            setLanguagesData(response.data.languagesData);
            setGithubUsername(response.data.githubUsername);
            setIsLinked(true);
        }
    } catch (error: any) {
        if (error.response?.status === 401) {
            localStorage.clear();
            navigate('/');
        }
        setIsLinked(false);
    } finally {
        setLoading(false);
    }
};
        fetchGithubData();
    }, []);

    if (loading) return <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center text-indigo-500">Loading...</div>;

    if (!isLinked) {
        const userId = localStorage.getItem('userId') || '';
        return (
            <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center">
                <div className="bg-[#111827] p-8 rounded-3xl border border-slate-800 text-center max-w-sm w-full">
                    <h3 className="text-xl font-bold text-white mb-4">Connect DevPulse</h3>
                    <a href={`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=repo,user&state=${userId}&prompt=consent&login=force`}
                       className="bg-indigo-600 text-white px-6 py-3 rounded-xl block">Link GitHub Account</a>
                </div>
            </div>
        );
    }

    const chartData = languagesData ? Object.entries(languagesData).map(([name, value]) => ({ name, value })) : [];
    const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

    return (
        <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex font-sans">
            <aside className="w-64 border-r border-slate-800 p-6 flex flex-col bg-[#0b0f19]">
                <div className="flex items-center space-x-2 mb-10 text-yellow-400 font-bold text-xl">⚡ DevPulse</div>
                <nav className="space-y-6 flex-1">
                    <button className="flex items-center space-x-3 text-indigo-400 font-medium"><span>📊</span> <span>Dashboard</span></button>
                    <button className="flex items-center space-x-3 text-gray-500"><span>📁</span> <span>Projects</span></button>
                    <button className="flex items-center space-x-3 text-gray-500"><span>🌐</span> <span>Repository</span></button>
                </nav>
                <button onClick={() => { localStorage.clear(); navigate('/'); }} className="text-red-400 text-sm">🚪 Logout</button>
            </aside>

            <main className="flex-1 p-8 bg-[#0b0f19]">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold">Dashboard</h2>
                        <p className="text-gray-400 text-sm">Live overview of your development pulse.</p>
                    </div>
                    <div className="flex items-center space-x-3 bg-[#111827] px-4 py-2 rounded-xl border border-slate-800">
                        <span className="text-sm">{githubUsername || 'User'}</span>
                        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-xs">
                            {githubUsername?.charAt(0).toUpperCase() || 'Y'}
                        </div>
                    </div>
                </header>
                
                <div className="grid grid-cols-4 gap-6 mb-8">
                    {[
                        { label: 'Active Projects', val: stats?.activeProjects },
                        { label: 'Total Stars', val: stats?.totalStars },
                        { label: 'Followers', val: stats?.followers },
                        { label: 'Following', val: stats?.following }
                    ].map((item, i) => (
                        <div key={i} className="bg-[#111827] p-6 rounded-2xl border border-slate-800 shadow-xl">
                            <p className="text-gray-400 text-xs mb-2">{item.label}</p>
                            <p className="text-3xl font-bold">{item.val || 0}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-2 bg-[#111827] p-6 rounded-2xl border border-slate-800">
                        <h3 className="mb-4 text-sm font-semibold">🐙 GitHub Activity Heatmap</h3>
                        <GitHubCalendar username={githubUsername} colorScheme="dark" />
                    </div>
                    
                    <div className="bg-[#111827] p-6 rounded-2xl border border-slate-800 flex flex-col items-center">
                        <h3 className="mb-4 text-sm font-semibold w-full">Codebase Insights</h3>
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie data={chartData} innerRadius={50} outerRadius={70} dataKey="value" paddingAngle={5}>
                                    {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="grid grid-cols-2 gap-2 text-[10px] mt-4 w-full">
                            {chartData.map((d, i) => (
                                <div key={i} className="flex items-center space-x-1">
                                    <div className="w-2 h-2 rounded-full" style={{backgroundColor: COLORS[i % COLORS.length]}}></div>
                                    <span>{d.name} ({d.value})</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};