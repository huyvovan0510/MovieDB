import moment from 'moment';

export const formatDate = (
  dateString: string,
  format = 'DD-MM-YYYY',
): string => {
  if (!dateString) return '';

  const date = moment(dateString, 'YYYY-MM-DD');

  if (!date.isValid()) {
    console.warn(`Invalid date format: ${dateString}`);
    return dateString; // Return original string if invalid
  }

  return date.format(format);
};

export const converBudget = (ms: number) => {
  const totalMinutes = Math.floor(ms / 60000); // 1 min = 60000 ms
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
};
