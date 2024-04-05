export function formatDate(dateString) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date(dateString);
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${months[monthIndex]} ${day}, ${year}`;
}

export function formatHour(hourString) {
  if (!hourString) return "";
  const hour = parseInt(hourString.split(":")[0]);
  const formattedHour = hour < 10 ? hourString[1] : hourString.split(":")[0];
  const formattedTime = formattedHour + " hrs.";
  return formattedTime;
}
