export const getBadgeClass = (status: string) => {
  switch (status) {
    case "ACTIVE":
      return "badge-green";
    case "INACTIVE":
      return "badge-red";
    case "PENDING":
      return "badge-orange";
    case "IN_REVIEW":
      return "badge-yellow";
    case "IN_PROGRESS":
      return "badge-yellow";
    case "SENT":
      return "badge-orange";
    case "PAID":
      return "badge-green";
    case "COMPLETED":
      return "badge-sky";
    default:
      return "badge-gray";
  }
};

export const getStatusName = (status: string) => {
  switch (status) {
    case "ACTIVE":
      return "Activo";
    case "INACTIVE":
      return "Inactivo";
    case "PENDING":
      return "Pendiente";
    case "IN_REVIEW":
      return "En revisión";
    case "IN_PROGRESS":
      return "En proceso";
    case "SENT":
      return "Enviado";
    case "PAID":
      return "Pagado";
    case "COMPLETED":
      return "Completado";
    default:
      return "Sin definir";
  }
};
