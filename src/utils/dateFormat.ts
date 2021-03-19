export function dateFormat(date: string) {
  const year = Number(date[6]+date[7]+date[8]+date[9]);
  const month = Number(date[3]+date[4]) - 1;
  const day = Number(date[0]+date[1]);
  
  return new Date(year, month, day);
}