import * as Yup from 'yup';

const validationSchemaRentForm = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  bookingDate: Yup.date().nullable(),
  comment: Yup.string().max(500, 'Comment should be less than 500 characters'),
});

const validationSchemaFilters = Yup.object({
  brand: Yup.string().nullable(),
  rentalPrice: Yup.string().nullable(),
  minMileage: Yup.number()
    .min(0, 'Minimum mileage cannot be negative')
    .nullable(),
  maxMileage: Yup.number()
    .min(0, 'Maximum mileage cannot be negative')
    .nullable()
    .when(
      'minMileage',
      (minMileage, schema) =>
        minMileage &&
        schema.min(minMileage, 'Max mileage cannot be less than the min'),
    ),
});

export { validationSchemaRentForm, validationSchemaFilters };
