import Vue from 'vue'
import DateUtils from '~/utils/date_utils.js'

export default ({}, inject) => {
    let ensureLeadingTimeDateZeros = (value) => {
        return value < 10 && value >= 0 ? '0' + value : value;
    }
    let formatDate = (date) => {
        return date.getFullYear() + '-' +
            ensureLeadingTimeDateZeros(date.getMonth()) + '-' +
            ensureLeadingTimeDateZeros(date.getDate())
    }
    inject("formatDate", formatDate)
}