export const generateOrderJson = (orderItems, generalNote, totalPrice) => {
  return {
    pospointId: 'restaurant1',
    ordernote: generalNote,
    totalPrice: totalPrice,
    products: orderItems.map((item) => ({
      id: item.id,
      price: item.price,
      quantity: item.quantity,
      note: item.productNote || ''
    }))
  };
};
