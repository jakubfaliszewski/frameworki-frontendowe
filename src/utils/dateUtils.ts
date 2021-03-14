import moment, { Moment } from 'moment';

function getRandomDate(): Moment {
    return moment(new Date(+(new Date()) - Math.floor(Math.random() * 1000000000)));
}

function formatDate(date: Moment, fromNow: boolean = false): string | undefined {
    if (fromNow) {
       return date.fromNow();
    }

    return date.format('DD MMM YYYY');
}

export {
    getRandomDate,
    formatDate
};