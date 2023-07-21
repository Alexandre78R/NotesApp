import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

function PaginatedItems(props) {
  const { data, setCurrentItems } = props;
  const [pageCount, setPageCOunt] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 8;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCOunt(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  return (
    <ReactPaginate
      marginPagesDisplayed={1}
      onPageChange={handlePageClick}
      pageCount={pageCount}
      pageRangeDisplayed={3}
      renderOnZeroPageCount={null}
      previousLabel="<"
      nextLabel=">"
      breakLabel="..."
      containerClassName="pagination c-blue"
      activeClassName="item active"
      breakClassName="item"
      pageClassName="item"
      previousClassName="item previous"
      nextClassName="item next "
    />
  );
}

export default PaginatedItems;
