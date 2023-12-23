type DateTimeFormatOptions = {
  year: "numeric" | "2-digit";
  month: "numeric" | "2-digit" | "narrow" | "short" | "long";
	day: "numeric" | "2-digit";
	hour: "numeric" | "2-digit";
	minute: "numeric" | "2-digit";
	hour12: boolean;
};


export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  };

  return date.toLocaleDateString("en-GB", options);
};
