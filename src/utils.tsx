export const hexToRgba = (hex: string, alpha: number) => {
  const [r, g, b] = hex
    .replace("#", "")
    .match(/.{2}/g)
    ?.map((x) => parseInt(x, 16)) ?? [0, 0, 0];

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const formatTimestampToText = (timestamp: number) => {
  const date = new Date(timestamp);

  // Day of the week
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayOfWeek = days[date.getDay()];

  // Day of the month with suffix
  const day = date.getDate();
  const suffix = (day: any) => {
    if (day > 3 && day < 21) return "th"; // Exceptions for 11th, 12th, 13th
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  // Hours and minutes in 12-hour format
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert 24-hour format to 12-hour format

  // do the seconds too
  const seconds = date.getSeconds().toString().padStart(2, "0");
  // Format string
  return `${dayOfWeek} ${day}${suffix(
    day
  )}, ${hours}:${minutes}:${seconds} ${ampm}`;
};
