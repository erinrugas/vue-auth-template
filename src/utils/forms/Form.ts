class Form {

    /**
     * Validate Login
     * @param str 
     * @returns boolean
     */
    static validEmail(str: string) {
        let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return regex.test(str);
    }

    /**
     * Minimum length of string
     * @param str 
     * @param length 
     * @returns 
     */
    static minLength(str: string, length: number) {
        let isInvalid = false;

        if (str.length < length) {
            isInvalid = true;
        }

        return isInvalid;
    }

    /**
     * Confirm password
     * @param password1 
     * @param password2 
     * @returns boolean
     */
    static confirmed(password1: string, password2: string) {
        let isEqual = false;
        if (password1 === password2) {
            isEqual = true;
        }

        return isEqual;
    }

    /**
     * Number only
     * @param str 
     * @returns boolean 
     */
    static isNumeric(str: string) {
        let regex = /^\d+$/;
        return regex.test(str);
    }

    /**
     * Form Validator
     * @param  obj 
     * @returns 
     */
    static validator(obj: any) {
        let keys = Object.entries(obj);
        let results: any[] = [];
        let validations = null;

        keys.map((key: any) => {
            if ('isRequired' in key[1] && key[1].isRequired) {
                if (key[1].value.length === 0) {
                    results.push({
                        [key[0]]: [`The ${Form.__fieldName(key[0])} field is required.`]
                    });
                } else {
                    if ('isEmail' in key[1] && key[1].isEmail) {
                        let isValidEmail = Form.validEmail(key[1].value);

                        if (!isValidEmail) {
                            results.push({
                                [key[0]]: [`The ${Form.__fieldName(key[0])} must be valid email.`]
                            });
                        }
                    }

                    if ('minLength' in key[1] && Form.minLength(key[1].value, key[1].minLength)) {
                        results.push({
                            [key[0]]: [`The ${Form.__fieldName(key[0])} field must at least ${key[1].minLength} characters.`]
                        });
                    }

                    if ('confirmed' in key[1]) {
                        let isEqualTo = Form.confirmed(key[1].value, key[1].confirmed.value);

                        if (!isEqualTo) {
                            results.push({
                                [key[0]]: [`The ${Form.__fieldName(key[0])} confirmation does not match.`]
                            });
                        }
                    }

                    if ('isNumeric' in key[1]) {
                        let isNumeric = Form.isNumeric(key[1].value);

                        if (!isNumeric) {
                            results.push({
                                [key[0]]: [`The ${Form.__fieldName(key[0])} field format is invalid.`]
                            });
                        }
                    }

                }
            } else if ('isEmail' in key[1]) {
                let isValidEmail = Form.validEmail(key[1].value);

                if (!isValidEmail) {
                    results.push({
                        [key[0]]: [`The ${Form.__fieldName(key[0])} field must be valid email`]
                    });
                }
            } else if ('minLength' in key[1] && Form.minLength(key[1].value, key[1].minLength)) {

                results.push({
                    [key[0]]: [`The ${Form.__fieldName(key[0])} field must at least ${key[1].minLength} characters.`]
                });
            } else if ('isNumeric' in key[1]) {
                let isNumeric = Form.isNumeric(key[1].value);

                if (!isNumeric) {
                    results.push({
                        [key[0]]: [`The ${Form.__fieldName(key[0])} field format is invalid.`]
                    });
                }
            } else if ('confirmed' in key[1]) {
                let isEqualTo = Form.confirmed(key[1].value, key[1].confirmed.value);

                if (!isEqualTo) {
                    results.push({
                        [key[0]]: [`The ${Form.__fieldName(key[0])} confirmation does not match.`]
                    });
                }
            }
            return results
        })

        results = Object.assign({}, ...results.map((result) => result))

        if (Object.keys(results).length > 0) {
            validations = {
                errors: results
            }
        } else {
            validations = null
        }

        return validations;
    }

    static __fieldName(str: string) {
        return str.replaceAll('_', ' ');
    }
}

export default Form