export default function({}, inject) {
    let formatPrice = (number) => {
        let formatNumber = (numberString) => {
            if (numberString.length < 4)
                return numberString
            return formatNumber(numberString.substring(0, numberString.length - 3)) + "," + numberString.substring(numberString.length - 3, numberString.length)
        }

        number = Math.floor(number / 100)
        return formatNumber(number.toString())
    }

    inject("formatPrice", formatPrice)
}