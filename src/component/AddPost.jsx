import React, { useState } from "react";

export const AddPost = ({ onAdd }) => {
  const [postDetail, setPostDetail] = useState({ title: "", body: "" });
  const [loading, setLoading] = useState(false);

  const handleOnSubmit = async (e) => {
    setLoading(true);
    await onAdd(postDetail.title, postDetail.body);
    setPostDetail({ title: "", body: "" });
    setLoading(false);
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setPostDetail((prev) => ({ ...prev, [name]: value }));
    console.log(postDetail);
  }

  return (
    <div className="flex flex-col w-9/12 container mx-auto mb-4">
      <div className="flex flex-col container mx-auto gap-2">
        <article className="prose lg:prose-xl">
          <h2>Add Post</h2>
        </article>
        <input
          value={postDetail.title}
          name="title"
          type="text"
          placeholder="Title"
          className="input input-bordered input-primary w-full"
          onChange={handleChange}
        />

        <textarea
          value={postDetail.body}
          name="body"
          className="textarea textarea-primary w-full"
          placeholder="post"
          onChange={handleChange}
        />
        {loading ? (
          <button className="btn btn-primary btn-xs sm:btn-sm md:btn-md loading">
            loading
          </button>
        ) : (
          <button
            className="btn btn-primary btn-xs sm:btn-sm md:btn-md "
            disabled={postDetail.title === "" || postDetail.body === ""}
            onClick={handleOnSubmit}
          >
            Add
          </button>
        )}
      </div>
    </div>
  );
};
