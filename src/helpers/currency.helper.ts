export const changeToUSD = (currency: number) =>
  new Intl.NumberFormat("us-US", { style: "currency", currency: "EUR" }).format(
    currency,
  );