export function formatCurrency(priceCents){
   return (Math.round (priceCents) / 100).toFixed(2);

} /* toFixed has an issue rounding the numbers that is why we should round the priceCents firstly */

export default formatCurrency;