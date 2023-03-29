import axios from "axios";

/** get posts default is 100 posts*/

const multiplePostURL = "https://jsonplaceholder.typicode.com/posts";
export const getPosts = () => axios(multiplePostURL);

/** get single post*/

export const getPost = (postID) =>
  axios(`https://jsonplaceholder.typicode.com/posts/${postID}`);

/** delete single post */
export const deleteSinglePost = (postID) => {
  return axios.delete(`https://jsonplaceholder.typicode.com/posts/${postID}`);
};

/** edit post */

export const editPost = async (id, title, body) => {
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
      console.log(data);
    })
    .catch((error) => console.log(error));
};
