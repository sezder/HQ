import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getMessages } from "../../store/message";
import { getAllProjects } from "../../store/project";
import "./ShowMessages.css";
import OneMessage from "./OneMessage";

const ShowMessages = () => {
  let { projectId } = useParams();
  projectId = Number(projectId);
  const dispatch = useDispatch();

  const messages = useSelector((state) => state.messages);
  const currProject = useSelector((state) => state.projects[projectId]);

  useEffect(() => {
    dispatch(getMessages(projectId));
    dispatch(getAllProjects());
  }, [dispatch, projectId]);

  return (
    <main id="msgs_main">
      <section id="msgs_section">
        {/* Header with project tile and button for new message */}
        <NavLink to={`/projects/${projectId}`}>
          <h1 className="light_large dynamic_underline">{currProject?.name}</h1>
        </NavLink>
        <NavLink to={`/projects/${projectId}/messages/new`}>
          <button>New Message</button>
        </NavLink>

        {/* Display all of the messages */}
        {Object.values(messages).map((message, idx) => (
          <OneMessage message={message} key={idx} projectId={projectId} />
        ))}
      </section>
    </main>
  );
};

export default ShowMessages;
