import React, { useState } from "react";
import ProfileIcon from "react-icons/lib/md/person-outline";

import "./Compose.css";

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *APP* COMPONENT

export default function Compose(props) {
  const [text, setText] = useState("");

  //Made this a controlled component
  function updateText(e) {
    setText((prevText) => (prevText = e));
  }

  function createPost() {
    const { createPostFn } = props;

    createPostFn(text);
    setText("");
  }

  return (
    <section className="Compose__parent">
      <div className="Compose__top">
        <div className="Compose__profile-picture">
          <ProfileIcon />
        </div>

        {/* This is where you type the message for your new post */}
        <input
          className="Compose__input"
          placeholder="What's on your mind?"
          value={text}
          onChange={(e) => updateText(e.target.value)}
        />
      </div>

      <div className="Compose__bottom">
        <button onClick={createPost}>Compose</button>
      </div>
    </section>
  );
}
