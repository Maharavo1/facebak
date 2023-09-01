import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom'; 
import TopBar from '../../components/topbar/Topbar';
import LeftBar from '../../components/leftbar/Leftbar';
import MainFeed from '../../components/MainFeeds/MainFeeds'; 
import 'bootstrap/dist/css/bootstrap.min.css';

function HomePage() {
  const [user, setUser] = useState(null);
  const location = useLocation(); // Utilisez useLocation pour obtenir l'objet location
  const userId = location.state && location.state.userId;

  useEffect(() => {
    // Assurez-vous d'adapter l'URL pour récupérer les informations de l'utilisateur connecté
    if (userId) {
      axios.get(`http://127.0.0.1:8080/users/${userId}`)
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des informations de l\'utilisateur :', error);
        });
    }
  }, [userId]);

  return (
    <div className="container-fluid">
      <TopBar />
      <div className="row">
        <div className="col-md-2">
          <LeftBar user={user} />
        </div>
        <div className="col-md-10">
          <MainFeed user={user} /> 
        </div>
      </div>
    </div>
  );
}

export default HomePage;
