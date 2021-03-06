import differenceInMinutes from 'date-fns/differenceInMinutes';
import parseISO from 'date-fns/parseISO';
import { ValidatorForm } from 'react-form-validator-core';

const lettersRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])');
const numberRegex = new RegExp('^(?=.*[0-9])');
const nonAlphanumericRegex = new RegExp('^(?=.*[^da-zA-Z0-9])');
const imageRegex = new RegExp('.(jpe?g|png)');
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!_%*.?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,}$/;

export function isNotAllBlanks(value: string, minlength: number): boolean {
    return value.replace(/\s/g, '').length >= minlength;
}

export function maxNaturalNumber(value: string, maxInt: any): boolean {
    const valueReal = +Number(value);
    const maxInteger = +Number(maxInt);

    return valueReal >= 0 && valueReal <= maxInteger;
}

ValidatorForm.addValidationRule('isNotAllBlanks', isNotAllBlanks);

ValidatorForm.addValidationRule('maxNaturalNumber', maxNaturalNumber);

function validateEndDate(endValue: string, startValue: string): boolean {
    const startDate = parseISO(startValue);
    const endDate = parseISO(endValue);
    return differenceInMinutes(endDate, startDate) > 0;
}

ValidatorForm.addValidationRule('validateEndDate', validateEndDate);

function startDateGreaterThanEndDate(startValue: string, endValue: string): boolean {
    return endValue !== null ? validateEndDate(endValue, startValue) : true;
}

ValidatorForm.addValidationRule('startDateGreaterThanEndDate', startDateGreaterThanEndDate);

ValidatorForm.addValidationRule('isImage', (value: string, extensionFile: string) =>
    imageRegex.test(extensionFile.toLowerCase()),
);

ValidatorForm.addValidationRule('atLeastOneLowerAndUpperCase', (value: string) => lettersRegex.test(value));

ValidatorForm.addValidationRule('atLeastOneNumber', (value: string) => numberRegex.test(value));

ValidatorForm.addValidationRule('atLeastOneSpecialCharacter', (value: string) => nonAlphanumericRegex.test(value));

ValidatorForm.addValidationRule(
    'isPasswordMatch',
    (value: string, comparedValue: string): boolean => value === comparedValue,
);

ValidatorForm.addValidationRule('password', (value: string): boolean => !!value.match(passwordRegex));

export { startDateGreaterThanEndDate, ValidatorForm, validateEndDate };
