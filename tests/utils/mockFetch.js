export default function mockFetch(status, data) {
  return Promise.resolve({
    json: () => Promise.resolve(data),
    status,
  });
}