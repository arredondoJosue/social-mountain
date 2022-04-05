import React, { useState } from "react";
import ProfileIcon from "react-icons/lib/md/person-outline";
import ReplyIcon from "react-icons/lib/md/chat-bubble-outline";
import FavoriteIcon from "react-icons/lib/md/favorite-outline";
import MessageIcon from "react-icons/lib/md/mail-outline";
import MasterControlIcon from "react-icons/lib/md/more-vert";

import "./Post.css";

import Edit from "./Edit/Editfn";

export default function Post(props) {
  const [postState, setPostState] = useState({
    editing: false,
    showMasterMenu: false,
  });

  function showEdit() {
    setPostState((prev) => ({ ...prev, editing: true }));
  }

  // console.log("after ", postState.editing);

  function hideEdit() {
    setPostState((prev) => ({ ...prev, editing: false }));
  }

  function toggleMasterMenu() {
    setPostState((prev) => ({
      ...prev,
      showMasterMenu: !prev.showMasterMenu,
    }));
  }

  function hideMasterMenu() {
    if (postState.showMasterMenu === true) {
      setPostState((prev) => ({ ...prev, showMasterMenu: false }));
    }
  }

  function deletePost() {
    const { id, deletePostFn } = props;
    console.log(id);

    deletePostFn(id);
  }

  return (
    // Main body of post
    <section className="Post__parent" onClick={hideMasterMenu}>
      {/* Three dots in top right corner */}
      <div className="Post__master-controls">
        <MasterControlIcon onClick={toggleMasterMenu} />

        {/* Drop-down menu. Remember that the "showMasterMenu" variable has been destructured off of this.state */}
        <div
          className="Post__master-menu"
          style={{ display: postState.showMasterMenu ? "flex" : "none" }}
        >
          <span onClick={showEdit}>Edit</span>
          <span onClick={deletePost}>Delete</span>
        </div>
      </div>

      {/* This is where all the meta data of the post will go (who, when, where) */}
      <div className="Post__meta-data">
        <div className="Post__profile-picture">
          <ProfileIcon />
        </div>

        <span className="Post__name">DevMountain</span>
        <span className="Post__handle">@DevMountain</span>

        <span className="Post__date">- {props.date}</span>
      </div>

      {/* This is where the text goes. Notice the turnary statement. The turnary statement decides to display either the text OR the editor view
        You can also think of it as being written as so:
          if( this.state.editing === true ) {
            <Edit ... />
          } else {
            <span ... ></span>
          }
    */}
      <div className="Post__content">
        {
          // This has been pulled off of this.state via destructuring
          postState.editing ? (
            <Edit
              text={props.text}
              id={props.id}
              hideEdit={hideEdit}
              updatePostFn={props.updatePostFn}
            />
          ) : (
            <span className="Post__text">{props.text}</span>
          )
        }
      </div>

      {/* These are all of the cute little icons in the bottom left corner */}
      <div className="Post__user-controls">
        <ReplyIcon className="Post__control-icon" />
        <FavoriteIcon className="Post__control-icon" />
        <MessageIcon className="Post__control-icon" />
      </div>
    </section>
  );
}
