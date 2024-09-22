export default function mockProduct(
  title,
  price,
  category,
  stock = 1,
  dimensions = {width: 0, height: 0, depth: 0},
  warrantyInformation = 'No warranty',
  shippingInformation = 'Ships tomorrow',
  returnPolicy = '30 days return policy'
) {
  return {
    title,
    price,
    category,
    stock,
    warrantyInformation,
    shippingInformation,
    returnPolicy,
    dimensions,
    images: []
  };
}
