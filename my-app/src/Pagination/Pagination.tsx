import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

type TPagination = {
  onChangePage: (e: number) => void;
};

const Pagination: React.FC<TPagination> = ({ onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
