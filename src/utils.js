export const generateOrderJson = (orderItems, generalNote) => {
  return {
    pospointId: 'restaurant1',
    ordernote: generalNote,
    products: orderItems.map((item) => ({
      id: item.id,
      price: item.price,
      quantity: item.quantity,
      note: item.productNote || ''
    }))
  };
};
