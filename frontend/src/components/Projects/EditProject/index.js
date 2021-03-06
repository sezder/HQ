import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateProject, deleteProject } from "../../../store/project";
import "./EditProject.css";

const EditProject = ({ setEditProject, projectId, currProject }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  let creatorId = Number(useSelector((state) => state.session.user?.id));

  const [name, setName] = useState(currProject?.name || "");
  const [description, setDescription] = useState(
    currProject?.description || ""
  );
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const errors = [];
    if (!name?.length) errors.push("Provide a project name.");
    if (name.length > 50)
      errors.push("Project name must not be longer than 50 characters.");
    setErrors(errors);
  }, [name]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const project = {
      name,
      description,
      creatorId,
      projectId,
    };

    dispatch(updateProject(project));
    setEditProject(false);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const deletePayload = { creatorId, projectId };
    const res = dispatch(deleteProject(deletePayload));
    if (res) {
      history.push("/projects");
      setEditProject(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="msg_comment_form"
      id="edit_proj_form"
    >
      <div>
        {errors.length > 0 && (
          <ul>
            {errors.map((error) => {
              return <li key={error}>{error}</li>;
            })}
          </ul>
        )}
      </div>

      <div className="input_div">
        <label htmlFor="new_proj_name" className="hidden">
          Project Name
        </label>
        <input
          id="new_proj_name"
          placeholder="Name"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          spellCheck={true}
        ></input>

        <label htmlFor="new_proj_descrip" className="hidden">
          Description (optional)
        </label>
        <textarea
          id="new_proj_descrip"
          placeholder="Description (optional)"
          type="text"
          name="description"
          value={description}
          spellCheck={true}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
        ></textarea>
      </div>

      <div className="button_div">
        <button type="submit" disabled={errors.length > 0} className="circular_button">
          <i className="fas fa-check"></i>
        </button>

        <button onClick={handleDelete} className="circular_button">
          <i className="far fa-trash-alt"></i>
        </button>
      </div>
    </form>
  );
};

export default EditProject;
