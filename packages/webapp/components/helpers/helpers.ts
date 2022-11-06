const sameDay = (d1: Date, d2: Date) =>
  d1 &&
  d2 &&
  d1.getFullYear() === d2.getFullYear() &&
  d1.getMonth() === d2.getMonth() &&
  d1.getDate() === d2.getDate();

const formatDateDayMonth = (d: Date) => {
  var options = { month: "numeric" as "numeric", day: "numeric" as "numeric" };
  return d.toLocaleDateString("fr-FR", options);
};

export { sameDay, formatDateDayMonth };
