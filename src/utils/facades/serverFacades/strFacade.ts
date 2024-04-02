 
import crypto from "crypto";

export function generateRandomString(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

export function convertToSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

interface Translation {
  [key: string]: string | Translation;
}
 

export const generateRandomNumber = () => {
  const min = 1000000000;  
  const max = 9999999999;  
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export function calculateMonthsFromDays(days: number) {
  const averageDaysPerMonth = 30.44;

  const months = days / averageDaysPerMonth;

  return months;
}

export const isValidJSON = (str: string) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};


export function formatTimestampToDateString(
  timestep: string | Date | number,
  includeMinutes?: boolean
) {
  try {
    if(timestep instanceof Date) timestep = timestep.getTime();
    const date = new Date(Number(timestep));
    if (!isNaN(date.getTime())) {
      let payload: any = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      };

      if (includeMinutes) {
        payload["hour"] = "2-digit";
        payload["minute"] = "2-digit";
      }

      return date.toLocaleDateString("pt-BR", payload);
    } else {
      return timestep;
    }
  } catch (error) {
    console.error("Error parsing date:", error);
    return "Invalid Date";
  }
}

export function slugify(text: string) {
  return text
    ? text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "") // Eliminar caracteres especiales
        .replace(/\s+/g, "-") // Reemplazar espacios con guiones
        .replace(/--+/g, "-") // Reemplazar múltiples guiones con uno solo
        .trim()
    : ""; // Eliminar espacios en blanco al principio y al final
}

export function getDayName(dayNumber: number) {
  const days = [
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
    "Domingo",
  ];
  return days[dayNumber];
}

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
