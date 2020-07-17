import fetch from 'isomorphic-unfetch';

export default async (...args) => {
  const res = await fetch(...args);
  if (res.ok) {
    return res.json();
  }

  const error = new Error(`Fetch request error: ${res.status}`);
  try {
    error.data = await res.json();
  } finally {
    // eslint-disable-next-line no-unsafe-finally
    return Promise.reject(error);
  }
};
