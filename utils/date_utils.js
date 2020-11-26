export default class DateUtils {
    constructor() {}
    static formatDateTime(date) {
        return date.getFullYear() + '-' +
            this.ensureLeadingTimeDateZeros(date.getMonth()) + '-' +
            this.ensureLeadingTimeDateZeros(date.getDate()) + ' ' +
            this.ensureLeadingTimeDateZeros(date.getHours()) + ':' +
            this.ensureLeadingTimeDateZeros(date.getMinutes())
    }

    static ensureLeadingTimeDateZeros(value) {
        return value < 10 && value >= 0 ? '0' + value : value;
    }
}