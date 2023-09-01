
  import "./profile.css";
  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import { useAuth } from '../../components/Status/AuthContext';
  import Topbar from "../../components/topbar/Topbar";
  
  const url = "http://127.0.0.1:8080";
  
  export default function Profile() {
    const [user, setUser] = useState({});
    const { userId } = useAuth(); 
  
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${url}/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
  
    useEffect(() => {
      fetchUserProfile();
    }, [userId]);
  
    const [editedUsername, setEditedUsername] = useState("");
    const [editedBio, setEditedBio] = useState("");
    const [editedPassword, setEditedPassword] = useState("");
  
    const handleEditProfile = async () => {
      try {
        const response = await axios.put(`${url}/users`, {
          ...user,
          username: editedUsername,
          bio: editedBio,
          password: editedPassword
        });
        alert('Profile updated successfully:', response.data);
        fetchUserProfile(); // Actualiser les données utilisateur après la mise à jour
        console.log('Profile updated successfully:', response.data);
      } catch (error) {
        console.error('Profile update error:', error);
      }
    };
  
    return (
      <div>
        <Topbar />
        <div className="profile-form">
          <h2>Edit Profile</h2>
          <input
            type="text"
            placeholder="Username"
            value={user.username}
            onChange={e => setEditedUsername(e.target.value)}
          />
          <textarea
            placeholder="Bio"
            value={user.bio}
            onChange={e => setEditedBio(e.target.value)}
          />
          <input
            type="password"
            placeholder="Current Password"
            value={editedPassword}
            onChange={e => setEditedPassword(e.target.value)}
          />
          <button onClick={handleEditProfile}>Save</button>
        </div>
      </div>
    );
  }
  