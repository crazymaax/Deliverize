export const formatPrice = (price) => { 
    return new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
}