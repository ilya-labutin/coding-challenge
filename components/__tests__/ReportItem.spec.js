/* eslint-disable no-restricted-syntax */
import React from 'react';
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReportItem from '../ReportItem';

const id = '0595df57-e5e2-4acd-8fd7-a234fa70ab14';
const created = '2017-10-02T16:09:04.258Z';
const payload = {
  reportType: 'SPAM',
};
let onUpdateState;

function renderItem(id, state, created, payload) {
  onUpdateState = jest.fn();
  return render(
    <ReportItem
      id={id}
      state={state}
      created={created}
      payload={payload}
      onUpdateState={onUpdateState}
    />
  );
}

describe('ReportItem', () => {
  test('render OPEN', () => {
    const state = 'OPEN';
    const {getByText} = renderItem(id, state, created, payload);

    expect(getByText(state)).toBeInTheDocument();
    expect(getByText(payload.reportType)).toBeInTheDocument();
    expect(getByText('Resolve')).toBeInTheDocument();
    expect(getByText('Block')).toBeInTheDocument();
  });

  test('render RESOLVED', () => {
    const state = 'RESOLVED';
    const {getByText} = renderItem(id, state, created, payload);

    expect(getByText(state)).toBeInTheDocument();
    expect(getByText(payload.reportType)).toBeInTheDocument();
    expect(getByText('Resolve')).toBeInTheDocument();
    expect(getByText('Block')).toBeInTheDocument();
  });

  test('click Block', async () => {
    const state = 'OPEN';
    const {getByTestId} = renderItem(id, state, created, payload);

    await userEvent.click(getByTestId(`ReportItem-Block-${id}`));
    expect(onUpdateState).toHaveBeenCalledTimes(1);
    expect(onUpdateState).toHaveBeenCalledWith('BLOCKED');
  });

  test('click Resolve', async () => {
    const state = 'OPEN';
    const {getByTestId} = renderItem(id, state, created, payload);

    await userEvent.click(getByTestId(`ReportItem-Resolve-${id}`));
    expect(onUpdateState).toHaveBeenCalledTimes(1);
    expect(onUpdateState).toHaveBeenCalledWith('CLOSED');
  });
});
