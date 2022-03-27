export function getDateLine(date, seperator) {
  const dayLine = date.getDate().toString().padStart(2, "0");
  const monthLine = (date.getMonth() + 1).toString().padStart(2, "0");
  const yearLine = date.getFullYear().toString();
  return [dayLine, monthLine, yearLine].join(seperator);
}
