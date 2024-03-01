import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { setSort } from "./redux/slices/filterSlice";

function Sort() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const list = ["популярности", "цене", "алфавиту"];
  const sortRef = useRef();
  const dispatch = useDispatch();
  const listFunc = (i) => {
    let resultType = "";
    switch (i) {
      case 0:
        resultType = "rating";
        break;
      case 1:
        resultType = "price";
        break;
      case 2:
        resultType = "title";
        break;
      default:
        return resultType;
    }

    return resultType;
  };

  const onClickListItem = (i) => {
    setSelected(i);
    setOpen((open) => !open);
    dispatch(setSort(listFunc(i)));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };
    document.body.addEventListener("click", handleClickOutside);

    return () => document.body.removeEventListener("click", handleClickOutside);
  }, []);
  console.log(sortRef);
  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen((elem) => !elem)}>{list[selected]}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {list.map((elem, i) => (
              <li
                key={uuidv4()}
                onClick={() => onClickListItem(i)}
                className={selected === i ? "active" : ""}
              >
                {elem}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;
