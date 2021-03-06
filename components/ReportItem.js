import {Row, Card, Button, Col, Badge} from 'react-bootstrap';
import Link from 'next/link';
import PropTypes from 'prop-types';

const ReportItem = ({id, state, created, payload, isUpdating, onUpdateState}) => {
  const isSpam = payload.reportType === 'SPAM';
  const isOpen = state === 'OPEN';
  return (
    <Card border={isUpdating ? 'secondary' : 'dark'} className="mb-2">
      <Card.Body className="p-2" data-testid={`ReportItem-${id}`}>
        <Col>
          <Row>
            <Col md={10}>
              <Row className="mb-2">
                <Link href="#">
                  <a>{id}</a>
                </Link>
              </Row>
              <Row className="mb-2">
                <Badge variant={isOpen ? 'primary' : 'secondary'} className="mr-1">
                  {state}
                </Badge>
                <Badge variant={isSpam ? 'danger' : 'dark'}>
                  {payload.reportType}
                </Badge>
              </Row>
              <Row className="mb-2">
                <span className="text-ellipsis">
                  {payload.message || '[Empty message]'}
                </span>
              </Row>
              <Row>
                <span className="report-date">{created}</span>
              </Row>
            </Col>
            <Col className="actions-column ml-2 d-flex flex-column justify-content-center">
              <Row>
                <Button
                  className="w-100 mb-2"
                  variant="outline-danger"
                  disabled={isUpdating || !isOpen}
                  onClick={() => onUpdateState('BLOCKED')}
                  data-testid={`ReportItem-Block-${id}`}
                >
                  Block
                </Button>
              </Row>
              <Row>
                <Button
                  className="w-100"
                  variant="outline-success"
                  disabled={isUpdating}
                  onClick={() => onUpdateState('CLOSED')}
                  data-testid={`ReportItem-Resolve-${id}`}
                >
                  Resolve
                </Button>
              </Row>
            </Col>
          </Row>
        </Col>
      </Card.Body>
    </Card>
  );
};

ReportItem.defaultProps = {
  isUpdating: false,
};

ReportItem.propTypes = {
  id: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  payload: PropTypes.object.isRequired,
  isUpdating: PropTypes.bool,
  onUpdateState: PropTypes.func.isRequired,
};

export default ReportItem;
