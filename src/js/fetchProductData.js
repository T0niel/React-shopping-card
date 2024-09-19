let storedCache = null;

export default async (
  from = 0,
  to = 30,
  search = '',
  min = 0,
  max = Infinity,
  categories = [],
  cache = false
) => {
  let data;
  if (cache) {
    if (!storedCache) {
      const res = await fetch(
        `https://dummyjson.com/products?limit=100000000&skip=0`
      );
      data = await res.json();
      storedCache = data;
    } else {
      data = storedCache;
    }
  } else {
    const res = await fetch(
      `https://dummyjson.com/products?limit=100000000&skip=0`
    );
    data = await res.json();
  }

  const copy = {
    ...data,
    products: data.products
      .filter(
        (product) =>
          product.title.toLowerCase().includes(search.toLowerCase()) &&
          product.price >= min &&
          product.price <= max &&
          (categories.some(
            (item) => item.category === product.category && item.selected
          ) ||
            categories.length === 0)
      )
      .slice(from, to),
  };

  return copy;
};
