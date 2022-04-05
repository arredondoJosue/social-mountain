import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post/Postfn";

import "./App.css";

import Header from "./Header/Headerfn";
import Compose from "./Compose/Composefn";

export default function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("https://practiceapi.devmountain.com/api/posts")
      .then((results) => {
        console.log("before API ", posts);
        setPosts(results.data);
      });
  }, []);

  console.log("after API ", posts);

  function updatePost(id, text) {
    console.log("id ", id);
    console.log("text ", text);

    axios
      .put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, { text })
      .then((results) => {
        // console.log(posts);
        // setPosts((prev) => ({ ...prev, posts: results.data }));
        setPosts(results.data);
      });
  }

  function deletePost(id) {
    console.log("hit deletePost", id);

    axios
      .delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
      .then((results) => {
        setPosts(results.data);
      });
  }

  function createPost(text) {
    console.log("hit CreatePost", text);
    axios
      .post("https://practiceapi.devmountain.com/api/posts", { text })
      .then((results) => {
        setPosts(results.data);
      });
  }

  function searchPost(text) {
    console.log("hit searchPost", text);
    let encoded = encodeURIComponent(text);
    console.log("hit searchPost", encoded);

    axios
      .get(
        encoded === ""
          ? "https://practiceapi.devmountain.com/api/posts"
          : `https://practiceapi.devmountain.com/api/posts/filter?text=${encoded}`
      )
      .then((results) => {
        setPosts(results.data);
      });
  }

  const fromPost = posts.map((post) => (
    <Post
      key={post.id}
      text={post.text}
      date={post.date}
      id={post.id}
      updatePostFn={updatePost}
      deletePostFn={deletePost}
    />
  ));

  return (
    <div className="App__parent">
      <Header searchPostFn={searchPost} />

      <section className="App__content">
        <Compose createPostFn={createPost} />
        {fromPost}
      </section>
    </div>
  );
}
