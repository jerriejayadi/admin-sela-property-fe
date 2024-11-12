import { localStorageMixins } from "@/localStorage.mixins";
import { EStatusProperty } from "@/service/types/property/postProperty";
import { IResult } from "@/service/types/property/propertyList";
import { useState, useRef, useEffect } from "react";

export const currencyFormat = (input: string | number) => {
  let value = input;
  if (typeof value === "number") {
    value = value.toString();
  }
  if (value === "0") {
    return "0";
  } else {
    return value
      .replace(/^0+/, "")
      .replace(/(?!\.)\D/g, "")
      .replace(/(?<=\..*)\./g, "")
      .replace(/(?<=\.\d\d).*/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};

export const numberFormat = (input: string | number) => {
  let value = input;
  if (typeof value === "number") {
    value = value.toString();
  }
  if (value.match(/^[0-9]/)) {
    return value;
  } else {
    return "";
  }
};

export const toTitleCase = (string: string) => {
  let arr = string?.split(/[-_ \s]+/);
  for (let i = 0; i < arr?.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  let newString = arr?.join(" ");
  return newString;
};

export const useDebounce = (value: any, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState<string>("");
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    timerRef.current = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const titleFilter = (title: string) => {
  switch (title) {
    case "":
      return "dashboard";
    default:
      return title;
  }
};

export const statusColorChip = (status: string) => {
  switch (status) {
    case "in_review":
    case "ask_revision":
      return "warning";
    case "approved":
      return "success";
    case "rejected":
      return "error";
    default:
      return "success";
  }
};

export const getInitialFromName = (name: string) => {
  let nameArray = name?.split(" ");
  nameArray = nameArray?.map((rows) => rows.charAt(0).toUpperCase());
  return nameArray?.join("");
};

export const translateStatusProperty = (status: string) => {
  const splittedStatus = status.split("_");

  for (let i = 0; i < splittedStatus.length; i++) {
    splittedStatus[i] =
      splittedStatus[i].charAt(0).toUpperCase() +
      splittedStatus[i].substring(1).toLowerCase();
  }
  return splittedStatus.join(" ");
};

export const statusPropertyColor = (status: EStatusProperty) => {
  switch (status) {
    case EStatusProperty.DRAFT:
      return "warning";
    case EStatusProperty.APPROVED:
      return "success";
    case EStatusProperty.REJECTED:
      return "error";
    default:
      return "success";
  }
};

export const translateRoleUser = (role: string[]) => {
  const splittedStatus = role.map((rows) => {
    let splittedString = rows.split("_");
    for (let i = 0; i < splittedString.length; i++) {
      splittedString[i] =
        splittedString[i].charAt(0).toUpperCase() +
        splittedString[i].substring(1).toLowerCase();
    }
    return splittedString.join(" ");
  });

  return splittedStatus.join(",");
};

export const translateAvailabilityProperty = (data: any) => {
  if (data.availability) {
    return "available";
  } else if (!data.availability && data.sellingType === "SELL") {
    return "sold";
  } else if (!data.availability && data.sellingType === "RENT") {
    return "rented";
  }
};

export const myProfile = () => {
  return JSON.parse(localStorageMixins.get(`profile`)!);
};

export function handleNumberInput(input: string | number) {
  let value = input;

  if (typeof value === "number") {
    value = value.toString();
  }

  // Remove non-digit characters
  value = value.replace(/\D/g, "");

  // Remove leading zeros
  if (value.startsWith("0") && value.length > 1) {
    value = value.replace(/^0+/, "");
  }

  // Update the input field with the sanitized value
  return value;
}
