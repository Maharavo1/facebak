import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './mainfeeds.css'

function MainFeed({ user }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8080/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des publications :', error);
      }
      
    };

    fetchPosts();
  }, []);

  const handleLikeClick = async (postId) => {
    try {
      await axios.get(`http://127.0.0.1:8080/posts/${postId}/reactions`);
      await axios.post(`http://127.0.0.1:8080/posts/${postId}/reactions`, { type: "LIKE" });
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId
            ? { ...post, _count: { ...post._count, reactions: post._count.reactions + 1 } }
            : post
        )
      );
    } catch (error) {
      console.error('Erreur lors de la réaction "J\'aime" :', error);
    }
  };

  const handleHeartClick = async (postId) => {
    try {
      await axios.post(`http://127.0.0.1:8080/posts/${postId}/reactions`, { type: "HEART" });
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId
            ? { ...post, _count: { ...post._count, hearts: post._count.hearts + 1 } }
            : post
        )
      );
    } catch (error) {
      console.error('Erreur lors de la réaction "Cœur" :', error);
    }
  };

  const handleRemoveReaction = async (postId, reactionId) => {
    try {
      await axios.delete(`http://127.0.0.1:8080/posts/${postId}/reactions/${reactionId}`);
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId
            ? { ...post, reactions: post.reactions.filter(reaction => reaction.id !== reactionId) }
            : post
        )
      );
    } catch (error) {
      console.error('Erreur lors de la suppression de la réaction :', error);
    }
  };

  return (
    <div className="container mt-5 ">
      {posts.map(post => (
        <div key={post.id} className="card mb-3">
          <div className="card-body">
            <h2 className="card-title">{post.title}</h2>
            <p className="card-text">{post.content}</p>
            <p className="card-text">Auteur: {post.user.username}</p>
            <p className="card-text">Date de création: {new Date(post.createdAt).toLocaleDateString()}</p>

            <div className="d-flex justify-content-between align-items-center">
              <div className="reactions">
                <button className="btn " onClick={() => handleLikeClick(post.id)}>
                  <img src="./assets/like.png" alt="" /> {post._count.reactions} Likes
                </button>
                <button className="btn mx-2" onClick={() => handleHeartClick(post.id)}>
                  <img  src="./assets/heart.png" alt="" /> {post._count.hearts} Hearts
                </button>
              </div>
              {post.reactions && post.reactions.map(reaction => (
                <div key={reaction.id} className="user-reaction">
                  <span>{reaction.type === "LIKE" ? "J'aime" : "Cœur"}</span>
                  <button className="btn btn-link" onClick={() => handleRemoveReaction(post.id, reaction.id)}>Supprimer</button>
                </div>
              ))}
              <div className="share-buttons">
                <button className="btn btn-primary p-3">Commenter</button>
                <button className="btn btn-secondary mx-2 p-3">Partager</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MainFeed;
