import Form from "@/utils/forms/Form";

type Field = object
type Custom = any;

export default function FormValidation(fields: Field, customMessage?: Custom) {
    let isValid = true;
    let message = <any>null;
    let validator = Form.validator(fields);

    if (validator !== null) {
        let errors = validator.errors;
        let customMessageKey: any;

        if (customMessage) {
            customMessageKey = Object.keys(customMessage);

            customMessageKey.map((val: any) => {

                errors[val] = customMessage[val];
            })
        }

        isValid = false
        message = errors;
    }

    return { isValid: isValid, message: message };
}