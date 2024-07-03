const hasNum = /\d/;
const hasCapital = /[A-ZА-Я]/;
const hasSubstr_Atsign_Latin_Dot = /@[a-zA-Z]+\./;

const noNums = /^\D*$/;
const noSpaces = /^\S*$/;
const noCyrillic = /^[^\u0400-\u04FF]*$/;
const notOnlyNums = /^(?!\d+$).*$/;

const firstIsCapital = /^[A-ZА-Я]/;
const firstIsPlus = /^\+/;

const length3to20 = /^.{3,20}$/;
const length8to40 = /^.{8,40}$/;
const length10to15 = /^.{10,15}$/;

const numsWith_Plus = /^[0-9+]*$/;
const latinCyrillicWith_Dash = /^[a-zA-Zа-яА-Я-]*$/;
const latinWith_Dash_Lodash = /^[a-zA-Z0-9-_]*$/;
const latinWith_Nums_Dash_Lodash_Atsign_Point = /^[a-zA-Z0-9-_@.]*$/;

function validateName(val) {
    if (!noNums.test(val)) {
        return "цифры недопустимы";
    } else if (!noSpaces.test(val)) {
        return "пробелы недопустимы";
    } else if (!firstIsCapital.test(val)) {
        return "первая буква должна быть заглавной";
    } else if (!latinCyrillicWith_Dash.test(val)) {
        return "из символов можно только '-'";
    } else {
        return "ok";
    }
}

function validateLogin(val) {
    if (!length3to20.test(val)) {
        return "от 3 до 20 символов";
    } else if (!noCyrillic.test(val)) {
        return "только латиница";
    } else if (!notOnlyNums.test(val)) {
        return "не может состоять только из цифр";
    } else if (!noSpaces.test(val)) {
        return "пробелы недопустимы";
    } else if (!latinWith_Dash_Lodash.test(val)) {
        return "из символов можно только '-' или '_'";
    } else {
        return "ok";
    }
}

function validateEmail(val) {
    if (!noCyrillic.test(val)) {
        return "только латиница";
    } else if (!latinWith_Nums_Dash_Lodash_Atsign_Point.test(val)) {
        return "из символов можно только '-', '_', '@', '.'";
    } else if (!hasSubstr_Atsign_Latin_Dot.test(val)) {
        return "должна быть подстрока '@xxx.'";
    } else {
        return "ok";
    }
}

function validatePassword(val) {
    if (!length8to40.test(val)) {
        return "от 8 до 40 символов";
    } else if (!hasCapital.test(val)) {
        return "добавьте заглавную букву";
    } else if (!hasNum.test(val)) {
        return "добавьте цифру";
    } else {
        return "ok";
    }
}

function validatePhone(val) {
    if (!length10to15.test(val)) {
        return "от 10 до 15 символов";
    } else if (!numsWith_Plus.test(val)) {
        return "только цифры или цифры с '+";
    } else if (notOnlyNums.test(val) && !firstIsPlus.test(val)) {
        return "плюс только первый символ";
    } else {
        return "ok";
    }
}

function validateMessage(val) {
    if (val.length === 0) {
        return "Поле не может быть пустым";
    } else {
        return "ok";
    }
}

function validatePasswordRepeat(val) {
    if (val.length === 0) {
        return "Поле не может быть пустым";
    } else {
        return "ok";
    }
}

function validateDisplayName(val) {
    if (val.length === 0) {
        return "Поле не может быть пустым";
    } else {
        return "ok";
    }
}

export default function validate(type, val) {
    if (type === "first_name" || type === "second_name") {
        return validateName(val);
    } else if (type === "display_name") {
        return validateDisplayName(val);
    } else if (type === "login") {
        return validateLogin(val);
    } else if (type === "email") {
        return validateEmail(val);
    } else if (type === "password") {
        return validatePassword(val);
    } else if (type === "password-repeat") {
        return validatePasswordRepeat(val);
    } else if (type === "phone") {
        return validatePhone(val);
    } else if (type === "message") {
        return validateMessage(val);
    } else {
        return "ok";
    }
}
