import React from "react";
import { setCategoryId } from "./redux/slices/filterSlice";
import { useAppDispatch } from "./redux/store";
type TCategoriesLi = {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  elem: string;
  index: number;
};
type TOnClickContextIndex = (index: number) => void;
const CategoriesLi: React.FC<TCategoriesLi> = ({
  activeIndex,
  setActiveIndex,
  elem,
  index,
}) => {
  const dispatch = useAppDispatch();

  const ActiveIndex = () => {
    return activeIndex === index ? "active" : "";
  };
  const onClickContextIndex: TOnClickContextIndex = (index) => {
    setActiveIndex(index);
    dispatch(setCategoryId(index));
  };
  return (
    <li className={ActiveIndex()} onClick={() => onClickContextIndex(index)}>
      {elem}
    </li>
  );
};

export default CategoriesLi;
