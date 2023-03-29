import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const PostDetail = () => {
  const [postDetail, setPostDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { postID } = useParams();
  console.log(postDetail);

  useEffect(() => {
    document.title = "PostDetail";
    fetchPostDetail();
  }, []);

  const fetchPostDetail = async () => {
    setIsLoading(true);
    await fetch(`https://jsonplaceholder.typicode.com/posts/${postID}`)
      .then((response) => response.json())
      .then((data) => {
        setPostDetail(data);
        console.log(postDetail);
        setIsLoading(false);
      })
      .catch((error) => console.log(error))
      .finally();
  };

  return (
    <>
      <div className="container flex flex-col justify-center items-center w-full h-full">
        {isLoading && <button className="btn loading">loading</button>}
        {postDetail && (
          <div className="card w-10/12 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{postDetail.title}</h2>
              <p>{postDetail.body}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PostDetail;
