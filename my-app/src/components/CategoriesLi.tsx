import React from "react";
import { setCategoryId } from "./redux/slices/filterSlice";
import { RootState, useAppDispatch } from "./redux/store";
import { useSelector } from "react-redux";
type TCategoriesLi = {
  elem: string;
  index: number;
};
type TOnClickContextIndex = (index: number) => void;

const CategoriesLi: React.FC<TCategoriesLi> = ({ elem, index }) => {
  const dispatch = useAppDispatch();
  const { categoryId } = useSelector((state: RootState) => state.filter);

  const ActiveIndex = () => {
    return categoryId === index ? "active" : "";
  };
  const onClickContextIndex: TOnClickContextIndex = (index) => {
    dispatch(setCategoryId(index));
  };
  return (
    <li className={ActiveIndex()} onClick={() => onClickContextIndex(index)}>
      {elem}
    </li>
  );
};

export default CategoriesLi;
