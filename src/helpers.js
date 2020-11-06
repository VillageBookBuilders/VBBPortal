/* 
Input: An integer (positive or negative) that represents how many days away a specific day is from today (ex: yesterday = -1)
Output: A "YYYY-MM-DD" date string (ex: "2020-01-01")
*/
export function getDateStr(daysAway) {
  const newDate = new Date();

  newDate.setDate(newDate.getDate() + daysAway);

  const newDateStr =
    newDate.getFullYear() +
    "-" +
    ("0" + (newDate.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + newDate.getDate()).slice(-2);
  return newDateStr;
}
