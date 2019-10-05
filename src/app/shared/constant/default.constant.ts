
export const  errorMessage = {
    FIELD_REQUIRED : 'This field is required.',
    EMAIL_INCORRECT_FORMAT : 'Email is not in correct format (abc@xyz.com)',
    ONLY_ALPHA_NUMERIC : 'only alphanumeric characters are allowed ',
    MIN_LENGTH:(minLength) => `This field should have minimum ${minLength} characters`,
    MAX_LENGTH:(maxLength) => `This field can't exceed ${maxLength} characters`,
    ONLY_NUMERIC: "Only numeric numbers are allowed.",
};


export const  notificationMessage = {
    CREATE_SUCCESS: (module) => `${module} has been created successfully.`,
    UPDATED_SUCCESS: (module) => `${module} has been updated Successfully`,
};
