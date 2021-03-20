import moment, { Moment } from 'moment';

function getRandomDate(): Moment {
    return moment(new Date(+(new Date()) - Math.floor(Math.random() * 1000000000)));
}

function newMomentDate(date: Date | string): Moment {
    return moment(date);
}

function formatDate(date: Moment = moment(new Date()), fromNow: boolean = false): string {
    if (fromNow) {
       return date.fromNow();
    }

    return date.format('DD MMM YYYY') || '';
}

function inputDate(date: Moment = moment(new Date())): string {

    return date.format('YYYY-MM-DD') || '';
}

export {
    getRandomDate,
    newMomentDate,
    inputDate,
    formatDate
};