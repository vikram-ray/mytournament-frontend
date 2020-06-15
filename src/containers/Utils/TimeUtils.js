import moment from 'moment';

export const  getLocalTime = (time) => moment(time).local().format('Do MMM h:mm a');
export const  getLocalTimeInput = (time) => moment(time).local().format('YYYY-MM-DDThh:mm');
export const  isBefore = (time) => moment(time).local().isBefore();
export const  getLocalTimeForInput = (time) => moment(time).local().format('YYYY-MM-DDTHH:mm');
