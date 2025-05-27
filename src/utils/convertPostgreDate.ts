export const convertPostgreDate = (date: Date) => {
  return new Date(new Date(date).setHours(new Date(date).getHours() + 3));
};
