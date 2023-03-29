import React from "react";
import { useQuery } from "@tanstack/react-query";

import { useParams } from "react-router-dom";
import { getPost } from "../api/post";

const PostDetail = () => {
  const { postID } = useParams();
  console.log(postID);
  const { isLoading, data, isSuccess } = useQuery({
    queryKey: ["post", postID],
    queryFn: () => getPost(postID),
  });

  console.log(data);
  return (
    <>
      <div className="container flex justify-center w-full h-full">
        {isLoading && <p>...loading</p>}
        {data && (
          <div className="card w-10/12 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{data.data.title}</h2>
              <p>{data.data.body}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PostDetail;
