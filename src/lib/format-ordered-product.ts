export function formatOrderedProduct(product: any) {
  return {
    product_id: product?.productId ? product?.productId : product?.id,
    shop_id: product.shop_id,
    order_quantity: product?.quantity,
    unit_price: product?.price,
    subtotal: product?.itemTotal,
    currency: product.currency
  };
}
