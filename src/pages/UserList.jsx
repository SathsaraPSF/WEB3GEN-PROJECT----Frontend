import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuthToken from '../components/useAuthToken';

function UserList() {
    const { token } = useAuthToken(); // Get the token from the custom hook

    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch users from the API
        fetchUsers();
    }, [token]); // Include token in the dependency array to refetch users when token changes

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/users', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUsers(response.data);
        } catch (error) {
            console.error('Error retrieving users:', error);
            // Handle error
        }
    };

    return (
        <table className="w-full">
            <thead className="bg-[#F1F5FF] shadow-inner">
                <tr>
                    <th className="p-3 tracking-wide font-semibold">First Name</th>
                    <th className="p-3 tracking-wide font-semibold">Last Name</th>
                    <th className="p-3 tracking-wide font-semibold">Date Of Birth</th>
                    <th className="p-3 tracking-wide font-semibold">Gender</th>
                    <th className="p-3 tracking-wide font-semibold">Contact Number</th>
                    <th className="p-3 tracking-wide font-semibold">Email</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user._id} className="border-b-2">
                        <td className="p-3 text-center">{user.basic_info.first_name}</td>
                        <td className="p-3 text-center">{user.basic_info.last_name}</td>
                        <td className="p-3 text-center">{user.basic_info.dob}</td>
                        <td className="p-3 text-center">{user.basic_info.gender}</td>
                        <td className="p-3 text-center">{user.contact_info.mobile_number}</td>
                        <td className="p-3 text-center">{user.contact_info.email}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default UserList;
