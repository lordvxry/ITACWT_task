import moment from 'moment/moment';

export const validateAndFormatDate = (value: string): string | null => {
  if (moment(value, moment.ISO_8601, true).isValid()) {
    return moment(value).format('DD/MM/YYYY, HH:mm');
  }
  return null;
};
