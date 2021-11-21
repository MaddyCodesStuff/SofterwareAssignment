import React from "react";

import "./article.css";

export const Article = ({ title, children }) => {
  return (
    <div className="article-container">
      <h2>{title}</h2>
      <hr />
      {children}
    </div>
  );
};
