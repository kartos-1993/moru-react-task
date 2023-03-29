import React, { useState } from "react";
import { FiDelete, FiEdit } from "react-icons/fi";

import { useNavigate } from "react-router-dom";

export const Post = ({ title, body, id, onEdit, onDelete, loading, edit }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [postDetail, setPostDetail] = useState({ title, body });
  const [isUpdateLoading, setIsUpdateLoading] = useState(false)
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)
  const navigate = useNavigate();

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleDelete = async () => {
    setIsDeleteLoading(true)
    await onDelete(id);
    setIsDeleteLoading(false)

  };

  const handleOnEdit = async () => {
    setIsUpdateLoading(true)
    await onEdit(id, postDetail.title, postDetail.body);
    setIsUpdateLoading(false);
    setIsEdit(!isEdit);
    // setPostDetail({ title : title, body: body});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostDetail({ ...postDetail, [name]: value });
    console.log("postdetail", postDetail);
  };

  return (
    <>
      {isEdit ? (
        <tr>
          <td>{id}</td>
          <td className="">
            <input
              name="title"
              value={postDetail?.title}
              className="input input-bordered input-primary w-full"
              onChange={handleChange}
            />
          </td>
          <td className="">
            <textarea
              name="body"
              value={postDetail.body}
              className="textarea textarea-bordered textarea-primary w-full"
              onChange={handleChange}
            />
          </td>

          <td>
            <button className="btn btn-square px-8" onClick={handleEdit}>
              Cancel
            </button>
          </td>
          <td>
            {isUpdateLoading ? (
              <button className="btn btn-square loading"></button>
            ) : (
              <button className="btn btn-square px-8" onClick={handleOnEdit}>
                UPDATE
              </button>
            )}
          </td>
        </tr>
      ) : (
        <tr className="hover">
          <td>{id}</td>
          <td
            className="min-w-[2rem] max-w-[9rem] overflow-hidden cursor-pointer"
            onClick={() => navigate(`/post/${id}`)}
          >
            {title}
          </td>
          <td
            className="min-w-[2rem] max-w-[9rem] text-ellipsis overflow-hidden cursor-pointer"
            onClick={() => navigate(`/post/${id}`)}
          >
            {body}
          </td>
          <td>
            {isDeleteLoading ? (
              <button className="btn btn-square loading"></button>
            ) : (
              <button className="btn btn-square " onClick={handleDelete}>
                {" "}
                <FiDelete />
              </button>
            )}
          </td>
          <td>
            <button className="btn btn-square" onClick={handleEdit}>
              <FiEdit />
            </button>
          </td>
        </tr>
      )}
    </>
  );
};
