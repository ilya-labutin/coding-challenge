import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Paginator from '../Paginator';

const page = 3;
const totalPages = 23;
const visiblePages = 5;
var onPageChange;

beforeEach(() => {
  onPageChange = jest.fn();
  render(
    <Paginator
      page={page}
      totalPages={totalPages}
      visiblePages={visiblePages}
      onPageChange={onPageChange}
    />
  );
});

describe('Paginator', () => {
  test('render', () => {
    const {getByText} = screen;

    expect(getByText('First')).toBeInTheDocument();
    expect(getByText('Previous')).toBeInTheDocument();
    expect(getByText('Next')).toBeInTheDocument();
    expect(getByText('Last')).toBeInTheDocument();

    for (var i = 1; i <= visiblePages - 1; ++i) {
      expect(getByText(`${i}`)).toBeInTheDocument();
    }
  });

  test('click First', async () => {
    const {getByText} = screen;
    await userEvent.click(getByText('First'));
    expect(onPageChange).toHaveBeenCalledTimes(1);
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  test('click Prev', async () => {
    const {getByText} = screen;
    await userEvent.click(getByText('Previous'));
    expect(onPageChange).toHaveBeenCalledTimes(1);
    expect(onPageChange).toHaveBeenCalledWith(page - 1);
  });

  test('click Next', async () => {
    const {getByText} = screen;
    await userEvent.click(getByText('Next'));
    expect(onPageChange).toHaveBeenCalledTimes(1);
    expect(onPageChange).toHaveBeenCalledWith(page + 1);
  });

  test('click Last', async () => {
    const {getByText} = screen;
    await userEvent.click(getByText('Last'));
    expect(onPageChange).toHaveBeenCalledTimes(1);
    expect(onPageChange).toHaveBeenCalledWith(totalPages);
  });
});
