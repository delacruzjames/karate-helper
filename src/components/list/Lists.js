import React from "react";

function Lists({ lists }) {
  return (
    <div>
      <ul>
        {lists.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Lists;
