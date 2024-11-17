// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { getPosts, savePosts, getUsers, saveUsers } from '../storage.js';

function Dashboard({ user }) {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [likedPosts, setLikedPosts] = useState([]);

  useEffect(() => {
    setPosts(getPosts());
    const users = getUsers();
    const currentUser = users.find((u) => u.username === user);
    setLikedPosts(currentUser?.likedPosts || []);
  }, [user]);

  const handleAddPost = () => {
    const updatedPosts = [...posts, { content: newPost, likes: 0, id: Date.now() }];
    setPosts(updatedPosts);
    savePosts(updatedPosts);
    setNewPost('');
  };

  const handleLikePost = (postId) => {
    if (likedPosts.includes(postId)) {
      alert('You have already liked this post.');
      return;
    }

    // Update the post with a new like
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    );
    setPosts(updatedPosts);
    savePosts(updatedPosts);

    // Update the liked posts for the current user
    const updatedLikedPosts = [...likedPosts, postId];
    setLikedPosts(updatedLikedPosts);

    // Update user data in Local Storage
    const users = getUsers();
    const updatedUsers = users.map((u) =>
      u.username === user ? { ...u, likedPosts: updatedLikedPosts } : u
    );
    saveUsers(updatedUsers);
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <input
        type="text"
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        placeholder="New post"
      />
      <button onClick={handleAddPost}>Add Post</button>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {post.content} - {post.likes} Likes
            <button onClick={() => handleLikePost(post.id)}>Like</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
