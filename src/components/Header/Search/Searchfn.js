import React, { useState } from "react";

import "./Search.css";

import SearchIcon from "react-icons/lib/md/search";

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default function Search(props) {
  const [text, setText] = useState("");

  function updateText(e) {
    setText(() => e);

    const { searchPostFn } = props;
    searchPostFn(e);
  }

  return (
    <section className="Search__parent">
      <div className="Search__content">
        <input
          placeholder="Search Your Feed"
          value={text}
          onChange={(e) => updateText(e.target.value)}
        />

        <SearchIcon id="Search__icon" />
      </div>
    </section>
  );
}
