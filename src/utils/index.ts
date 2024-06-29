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
  console.log(nameArray);
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
