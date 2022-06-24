const start = new Date().getFullYear();
export const yearOption = [...Array(30)].map((a, i) => {
  const val = start - i;
  const option = { value: val.toString(), title: val.toString() };
  return option;
});
