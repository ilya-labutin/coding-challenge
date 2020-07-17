const reportsPath = '/api/reports';

export function getReportsReadPath(pageSize, pageNumber) {
  return `${reportsPath}?pageSize=${pageSize}&pageNumber=${pageNumber}`;
}

export function getReportsUpdatePath(id) {
  return `${reportsPath}/${id}`;
}
