import React, { useState, useEffect } from "react";
import Posts from "./components/Posts";
import Pagination from "./components/Pagination";
import axios from "axios";
import "./App.css";

const App = () => {
  // Initialize states
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    // Get posts from jsonplaceholder Fake Online REST API
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setPosts(res.data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage; // Get last post index
  const indexOfFirstPost = indexOfLastPost - postsPerPage; // Get first post index
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost); // Get current posts

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-3">My App</h1>
      <Posts posts={currentPosts} loading={loading} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
  );
};

export default App;
