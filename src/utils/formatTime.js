import { format, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date) {
  return format(new Date(date), 'dd MMMM yyyy');
}

export function fDateTime(date) {
  return format(new Date(date), 'dd MMM yyyy HH:mm');
}

export function fDateTimeSuffix(date) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p');
}
export function fDateSuffix(date) {
  return format(new Date(date), 'yyyy-MM-dd');
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}
export function fDatetimework(date){
  var dates = new Date(date);
  return format(dates , 'dd MMM yyyy')+" "+dates.getUTCHours()+":"+dates.getUTCMinutes()+":"+dates.getUTCSeconds();
}
