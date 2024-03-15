export const formatPrice = (price: number | string) => {
  return new Intl.NumberFormat('es-CO', {
    maximumFractionDigits: 2,
  }).format(Math.trunc(Number(price)))
}
