import { Pagination, PaginationItem } from "@mui/material";

import React from "react";

import {  useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Paginate = ({ page }) => {
  const { totalPage } = useSelector((state) => state);
  
 
  return (
    <Pagination 
      count={totalPage}
      page={Number(page)}
      color="success"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/posts?page=${item.page}`}
        />
      )}
    />
  );
};

export default Paginate;
