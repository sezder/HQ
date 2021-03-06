import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";

import { getComments } from "../../../store/comment";
import { getMessages } from "../../../store/message";
import { getAllProjects } from "../../../store/project";
import { getAllUsers } from "../../../store/user";
import EditMessage from "../EditMessage";
import EditComment from "../../Comments/EditComment";
import NewComment from "../../Comments/NewComment";
import NavBar from "../../Layout/NavBar";
import "./IndivMessage.css";

const IndivMessage = () => {
  let { projectId, messageId } = useParams();
  projectId = Number(projectId);
  messageId = Number(messageId);

  const dispatch = useDispatch();

  const currMessage = useSelector((state) => state.messages?.[messageId]);
  const creatorId = currMessage?.creator_id;
  const users = useSelector((state) => state.users);
  const msgUser = useSelector((state) => state.users[creatorId]);
  const comments = useSelector((state) => state.comments);
  const currProject = useSelector((state) => state.projects[projectId]);
  const currUserId = useSelector((state) => state.session.user.id);

  const [editMessage, setEditMessage] = useState(false);
  const [editComment, setEditComment] = useState(null);

  useEffect(() => {
    dispatch(getMessages(projectId));
    dispatch(getComments(messageId));
    dispatch(getAllProjects());
    dispatch(getAllUsers());
  }, [dispatch, messageId, projectId]);

  const navLinks = (
    <ul className="nav">
      <li>
        <NavLink to="/projects">
          <i className="fas fa-home fa-lg"></i>
        </NavLink>
      </li>
      <i className="fas fa-angle-right"></i>
      <li>
        <NavLink
          to={`/projects/${currProject?.id}`}
          className="light_large dynamic_underline"
        >
          {currProject?.name}
        </NavLink>
      </li>
      <i className="fas fa-angle-right"></i>
      <li>
        <NavLink
          to={`/projects/${currProject?.id}/messages`}
          className="dynamic_underline light_large"
        >
          Messages
        </NavLink>
      </li>
      <i className="fas fa-angle-right"></i>
      <li className="curr_on light_large">
        {currMessage?.subject_line.length > 15
          ? `${currMessage?.subject_line.slice(0, 15)}...`
          : currMessage?.subject_line}
      </li>
      <li>
        {currUserId === currMessage?.creator_id && editMessage ? (
          <button
            onClick={() => setEditMessage(false)}
            className="circular_button"
          >
            <i className="fas fa-times"></i>
          </button>
        ) : (
          <button
            title="Toggle edit message form"
            onClick={() => setEditMessage(!editMessage)}
            className={editMessage ? "hidden" : "circular_button"}
          >
            <i className="fas fa-ellipsis-h fa-lg"></i>
          </button>
        )}
      </li>
    </ul>
  );

  return (
    <>
      <NavBar navLinks={navLinks} />
      <main id="indiv_msg_main">
        {/* Message content or form to edit message */}
        <section>
          {editMessage ? (
            <EditMessage
              editMessage={editMessage}
              setEditMessage={setEditMessage}
              currMessage={currMessage}
              creatorId={creatorId}
            />
          ) : (
            <div>
              <h1 className="dark_large">{currMessage?.subject_line}</h1>
              <div className="mgs_user_info">
                {msgUser?.icon_url ? (
                  <img
                    className="user_circle"
                    src={msgUser?.icon_url}
                    alt="User profile icon"
                  />
                ) : (
                  <div className="user_circle initials_circle">
                    {`${msgUser?.first_name[0]} 
                        ${msgUser?.last_name[0]}`}
                  </div>
                )}
                <p id="msg_preview_name">{`${msgUser?.first_name} ${msgUser?.last_name}`}</p>
              </div>
              <p>{currMessage?.content}</p>
            </div>
          )}
        </section>

        {/* Comments */}
        {Object.values(comments).map((comment, idx) => {
          const commUser = users[comment?.creator_id];
          return (
            <section className="comment_section" key={idx}>
              <div className="comment_user_header">
                {/* Name and icon  */}
                <div>
                  {commUser?.icon_url ? (
                    <img
                      className="user_circle"
                      src={commUser?.icon_url}
                      alt="User profile icon"
                    />
                  ) : (
                    <div className="user_circle initials_circle">
                      {`${commUser?.first_name[0]} 
                        ${commUser?.last_name[0]}`}
                    </div>
                  )}

                  <p id="msg_preview_name">{`${commUser?.first_name} ${commUser?.last_name}`}</p>
                </div>

                {currUserId === comment?.creator_id ? (
                  <button
                    onClick={() => setEditComment(comment?.id)}
                    className={
                      editComment === comment?.id ? "hidden" : "only_icon_btn"
                    }
                  >
                    <i className="fas fa-ellipsis-h fa-lg"></i>
                  </button>
                ) : (
                  <div></div>
                )}
              </div>

              {/* If editComment's value matches the id of the current comment */}
              {editComment === comment?.id ? (
                <EditComment
                  editComment={editComment}
                  setEditComment={setEditComment}
                  currComment={comment}
                  creatorId={creatorId}
                  messageId={messageId}
                  projectId={projectId}
                />
              ) : (
                <div>{comment?.content}</div>
              )}
            </section>
          );
        })}

        <section className="comment_section">
          <NewComment messageId={messageId} creatorId={creatorId} />
        </section>
      </main>
    </>
  );
};

export default IndivMessage;
