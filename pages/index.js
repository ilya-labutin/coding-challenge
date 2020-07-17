import {useState} from 'react';
import produce from 'immer';
import fetch from 'libs/fetch';
import useSWR from 'swr';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {Container, Alert} from 'react-bootstrap';
import ReportItem from 'components/ReportItem';
import Paginator from 'components/Paginator';
import {getReportsReadPath, getReportsUpdatePath} from 'utils/path';

const defaultPageSize = 5;

export default () => {
  const router = useRouter();
  const [totalPages, setTotalPages] = useState(1);
  const {pathname, query} = router;

  const handlePageChange = (newPage) =>
    router.push({pathname, query: {page: newPage}});

  let page = parseInt(query.page) || 1;
  if (page < 1) {
    page = 1;
    handlePageChange(page);
  }

  const {data: reports = [], error, mutate} = useSWR(
    getReportsReadPath(defaultPageSize, page),
    async (uri) => {
      const responseData = await fetch(uri);
      const newTotalPages =
        Math.ceil(responseData.reportsCount / defaultPageSize) || 1;
      if (page > newTotalPages) {
        handlePageChange(newTotalPages);
      }
      setTotalPages(newTotalPages);
      return responseData.reports;
    }
  );

  const handleUpdateState = async (index, id, state) => {
    await mutate(
      produce((draft) => {
        draft[index].isUpdating = true;
      }),
      false
    );

    return mutate(
      produce(async (draft) => {
        const {report} = await fetch(getReportsUpdatePath(id), {
          method: 'PUT',
          body: JSON.stringify({ticketState: state}),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        draft[index] = report;
      }),
      true
    );
  };

  return (
    <div className="root">
      <Head>
        <title>coding-challenge</title>
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>

      <Container className="container">
        <h4>Reports</h4>
        <Paginator
          page={page}
          totalPages={totalPages}
          visiblePages={defaultPageSize}
          onPageChange={handlePageChange}
        />

        {reports.map((report, index) => (
          <ReportItem
            key={report._id}
            onUpdateState={(state) => handleUpdateState(index, report._id, state)}
            {...report}
          />
        ))}

        {error && (
          <Alert variant="danger">
            <Alert.Heading>{error.message}</Alert.Heading>
            <p>{JSON.stringify(error.data)}</p>
          </Alert>
        )}
      </Container>
    </div>
  );
};
