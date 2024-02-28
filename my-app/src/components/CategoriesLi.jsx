import React, { useContext } from "react";
import { Context } from "../pages/Home";
function CategoriesLi({ activeIndex, setActiveIndex, elem, index }) {
  const ActiveIndex = () => {
    return activeIndex === index ? "active" : "";
  };
  const funcContext = useContext(Context);
  const onClickContextIndex = (index) => {
    setActiveIndex(index);
    funcContext(index);
  };
  return (
    <li className={ActiveIndex()} onClick={() => onClickContextIndex(index)}>
      {elem}
    </li>
  );
}

export default CategoriesLi;
