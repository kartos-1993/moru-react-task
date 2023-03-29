import React, { useEffect, useState } from "react";

import { AddPost } from "../component/AddPost";
import { Post } from "../component/Post";

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  // console.log(posts);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.log(error));
  };

  const onAdd = async (title, body) => {
    setLoading(true);
    await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        body,
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.status !== 201) {
          return;
        } else {
          return response.json();
        }
      })
      .then((data) => {        
        setPosts([data, ...posts])

        console.log("posts", posts);
      })
      .catch((error) => {
        setLoading(false);
      })
      .finally(setLoading(false));
  };

  const onEdit = async (id, title, body) => {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        body,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          return;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        console.log("data", data);
        const updatedPost = posts.map((post) => {
          if (post.id === id) {
            post.title = title;
            post.body = body;
          }

          return post;
        });

        setPosts(updatedPost);
        console.log("updatedPost", updatedPost);
      })
      .catch((error) => console.log(error));
  };

  const onDelete = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status !== 200) {
          return;
        } else {
          setPosts(
            posts.filter((post) => {
              return post.id !== id;
            })
          );
        }
      })
      .catch((error) => console.log(error))
      .finally();
  };

  return (
    <div className="flex flex-col w-9/12 container mx-auto">
      <AddPost onAdd={onAdd} loading={loading} setLoading={setLoading} />
      <table className="table table-compact">
        <thead>
          <tr>
            <th>S.N</th>
            <th>Title</th>
            <th>Post</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <Post
              id={post.id}
              key={post.id}
              title={post.title}
              body={post.body}
              onEdit={onEdit}
              onDelete={onDelete}
              userId={post.userId}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
