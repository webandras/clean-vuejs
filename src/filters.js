import moment from "moment";

export default {
    date(value, formatType = 'long') {
        if (formatType === 'short') {
            return moment(value).format('L');
        } else if (formatType === 'long') {
            return moment(value).format('LL');
        } else {
            return 'Bad Date Format';
        }
    },

    excerpt(value, length = 120) {
        const elem = document.createElement('div');
        elem.innerHTML = value;
        let newValue = elem.textContent || elem.innerText;
        newValue = newValue.slice(0, length - 3)
        return newValue + '...';
    }
}
