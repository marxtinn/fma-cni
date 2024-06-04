import React from "react";
import ReactPaginate from "react-paginate";
import { Flex } from "@chakra-ui/react"
import "./pagination.css"
import { ChevronDoubleRightIcon, ChevronDoubleLeftIcon } from "@heroicons/react/24/outline";

export default function Pagination(props) {
  const pageCount = Math.ceil(props.totalData / props.size);

  return (
    <>
      <Flex>
        <ReactPaginate
          breakLabel="..."
          nextLabel={<ChevronDoubleRightIcon width="20px" height="20px" />}
          previousLabel={<ChevronDoubleLeftIcon width="20px" height="20px" />}
          marginPagesDisplayed={1} // number of pages at the start and end of pagination
          pageCount={pageCount} // number of pages to display
          pageRangeDisplayed={3} // number of pages between breaklabel
          onPageChange={props.paginate} // function to call when number button is clicked
          activeClassName={"active"} // style
          className={"react-pagination"}
        />
      </Flex>
    </>
  )
}