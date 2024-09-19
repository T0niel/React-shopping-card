export default async (
  from = 0,
  to = 30,
  search = '',
  min = 0,
  max = Infinity,
  categories = []
) => {
  const res = await fetch(
    `https://dummyjson.com/products?limit=100000000&skip=0`
  );
  let data = await res.json();
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
