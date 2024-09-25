export default function mockFetch(status, data) {
  return Promise.resolve({
    json: () => Promise.resolve(data),
    ok: status >= 200 && status < 300, 
    status,
  });
}