import joi from "joi";

const schema = {
  firstName: joi
    .string()
    .regex(/^[a-zA-Z]{2,16}$/)
    .required(),
  lastName: joi
    .string()
    .regex(/^[a-zA-Z]{2,16}$/)
    .required(),
  email: joi
    .string()
    .regex(/^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/)
    .required(),
  password: joi
    .string()
    .regex(/^[a-zA-Z0-9]{8,16}$/)
    .required()
};

export default schema;
