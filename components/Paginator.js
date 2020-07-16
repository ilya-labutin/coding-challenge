import {Pagination} from 'react-bootstrap';
import PropTypes from 'prop-types';

const Paginator = ({page, totalPages, visiblePages, onPageChange}) => {
  const floor = Math.floor((page - 1) / visiblePages);
  const firstPageIndex = visiblePages * floor + 1;
  const lastPageIndex = Math.min(firstPageIndex + visiblePages - 1, totalPages);
  const items = Array.from(
    {length: lastPageIndex - firstPageIndex + 1},
    (x, i) => i + firstPageIndex
  );

  const hasNextPage = totalPages <= 1 || page === totalPages;
  return (
    <Pagination size="sm">
      <Pagination.First
        disabled={page === 1}
        onClick={() => onPageChange(1)}
        data-testid="Paginator-Link-First"
      />
      <Pagination.Prev
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        data-testid="Paginator-Link-Prev"
      />
      {items.map((pageNum) => (
        <Pagination.Item
          key={pageNum}
          active={page === pageNum}
          onClick={() => onPageChange(pageNum)}
          data-testid={`Paginator-Link-Page-${pageNum}`}
        >
          {pageNum}
        </Pagination.Item>
      ))}
      <Pagination.Next
        disabled={hasNextPage}
        onClick={() => onPageChange(page + 1)}
        data-testid="Paginator-Link-Next"
      />
      <Pagination.Last
        disabled={hasNextPage}
        onClick={() => onPageChange(totalPages)}
        data-testid="Paginator-Link-Last"
      />
    </Pagination>
  );
};

Paginator.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  visiblePages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Paginator;
