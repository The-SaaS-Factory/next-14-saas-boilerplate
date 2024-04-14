export const parsePriceInLocalCurrency = (
  price: number,
  currencyCode: string
) => {
  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  let Euro = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  });

  let BRL = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  let CUP = new Intl.NumberFormat("es-CU", {
    style: "currency",
    currency: "CUP",
  });

  switch (currencyCode) {
    case "usd":
      return `  ${USDollar.format(price)}`;
    case "eur":
      return `  ${Euro.format(price)}`;
    case "brl":
      return `  ${BRL.format(price)}`;
    case "cup":
      return `  ${CUP.format(price)}`;

    default:
      return `  ${USDollar.format(price)}`;
  }
};

export const parseNameFrequency = (frequency: string) => {
  switch (frequency) {
    case "MONTHLY":
      return "Mensual";
    case "quarterly":
      return "Trimestral";
    case "SEMIANNUAL":
      return "Semi-anualmente";
    case "YEARLY":
      return "Anualmente";
    default:
      return frequency;
  }
};

export const traslateData = (string: string | object | null, locale: string) => {
  let traduction: string | object | null = string;

  if (typeof string === "string") {
    try {
      traduction = JSON.parse(string);
      return (traduction as Record<string, string>)[locale];
    } catch (error) {
      return  string;
    }
  }
};
