import React from "react";
import { setCategoryId } from "./redux/slices/filterSlice";
import { useDispatch } from "react-redux";

function CategoriesLi({ activeIndex, setActiveIndex, elem, index }) {
  const dispatch = useDispatch();

  const ActiveIndex = () => {
    return activeIndex === index ? "active" : "";
  };
  const onClickContextIndex = (index) => {
    setActiveIndex(index);
    dispatch(setCategoryId(index));
  };
  return (
    <li className={ActiveIndex()} onClick={() => onClickContextIndex(index)}>
      {elem}
    </li>
  );
}

export default CategoriesLi;
