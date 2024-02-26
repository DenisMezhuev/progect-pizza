import React from "react";

function CategoriesLi({ activeIndex, setActiveIndex, elem, index }) {
  const ActiveIndex = () => {
    return activeIndex === index ? "active" : "";
  };
  return (
    <li className={ActiveIndex()} onClick={() => setActiveIndex(index)}>
      {elem}
    </li>
  );
}

export default CategoriesLi;
