import {Pagination} from 'react-bootstrap';

export default ({page, totalPages, onPageChange}) => {
  const visiblePages = 5;
  const floor = Math.floor((page - 1) / visiblePages);
  const firstPageIndex = visiblePages * floor + 1;
  const lastPageIndex = Math.min(firstPageIndex + visiblePages - 1, totalPages);
  var items = Array.from(
    {length: lastPageIndex - firstPageIndex + 1},
    (x, i) => i + firstPageIndex
  );
  
  const hasNextPage = totalPages <= 1 || page === totalPages;
  return (
    <Pagination size="sm">
      <Pagination.First disabled={page === 1} onClick={() => onPageChange(1)} />
      <Pagination.Prev
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      />
      {items.map((pageNum) => (
        <Pagination.Item
          key={pageNum}
          active={page === pageNum}
          onClick={() => onPageChange(pageNum)}
        >
          {pageNum}
        </Pagination.Item>
      ))}
      <Pagination.Next
        disabled={hasNextPage}
        onClick={() => onPageChange(page + 1)}
      />
      <Pagination.Last
        disabled={hasNextPage}
        onClick={() => onPageChange(totalPages)}
      />
    </Pagination>
  );
};
