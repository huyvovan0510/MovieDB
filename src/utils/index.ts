import moment from 'moment';

export const formatDate = (dateString: string): string => {
  if (!dateString) return '';

  const date = moment(dateString, 'YYYY-MM-DD');

  if (!date.isValid()) {
    console.warn(`Invalid date format: ${dateString}`);
    return dateString; // Return original string if invalid
  }

  return date.format('DD MMMM YYYY');
};
