import React, { useContext, useEffect, useState } from 'react';
import './UserPage.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const UserPage = () => {

    const { token, url } = useContext(StoreContext);
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        birthday: '',
        gender: '',
        phone: ''
    });
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        const fetchUserInfo = async () => {
        try {
            const res = await axios.get(`${url}/api/user/info`, {
                headers: { token }
            });
            if (res.data.success) {
                setUserData(res.data.user);
            }
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
        };

        fetchUserInfo();
    }, [token, url]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
        ...prev,
        [name]: value
        }));
    };

    const handleSave = async () => {
        const payload = { ...userData };
        if (!payload.password) {
            delete payload.password; // Ko update password if left empty
        }
        try {
            const res = await axios.put(`${url}/api/user/update`, payload, {
                headers: { token }
            });
            if (res.data.success) {
                alert('User info updated!');
                setEditing(false);
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            console.error(error);
            alert('Failed to update user info');
        }
    };

    // const formatDate = (isoDate) => {
    //     return isoDate ? new Date(isoDate).toISOString().split('T')[0] : '';
    // };

    // if (res.data.success) {
    //     const user = res.data.user;
    //     user.birthday = formatDate(user.birthday);
    //     setUserData(user);
    // }

    if (loading) return <div>Loading...</div>;

    return (
        <div className="user-page">
        <h2>Your Profile</h2>
        <div className="user-form">
            <label>Name:</label>
            <input name="name" value={userData.name} onChange={handleChange} disabled={!editing} />

            <label>Email:</label>
            <input name="email" value={userData.email} onChange={handleChange} disabled />

            <label>Password:</label>
            <input name="password" type="password" value={userData.password} onChange={handleChange} disabled={!editing} />

            <label>Birthday:</label>
            <input name="birthday" type="date" value={userData.birthday} onChange={handleChange} disabled={!editing} />

            <label>Gender:</label>
            <select name="gender" value={userData.gender} onChange={handleChange} disabled={!editing}>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>

            <label>Phone:</label>
            <input name="phone" value={userData.phone} onChange={handleChange} disabled={!editing} />

            <div className="user-form-buttons">
            {!editing ? (
                <button onClick={() => setEditing(true)}>Edit</button>
            ) : (
                <>
                <button onClick={handleSave}>Save</button>
                <button onClick={() => setEditing(false)}>Cancel</button>
                </>
            )}
            </div>
        </div>
        </div>
    );
};

export default UserPage;
