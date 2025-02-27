import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import Button from '../Button/Button.jsx';
import 'react-datepicker/dist/react-datepicker.css';
import './Calendar.css';
import css from './RentForm.module.css';

// Создаем схему валидации с использованием Yup
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  bookingDate: Yup.date().nullable(),
  comment: Yup.string().max(500, 'Comment should be less than 500 characters'),
});

const RentForm = () => {
  const handleSubmit = values => {
    console.log('Form data submitted:', values);
  };

  return (
    <div className={css.rentForm}>
      <h3 className={css.formTitle}>Book your car now</h3>
      <p className={css.formText}>
        Stay connected! We are always ready to help you.
      </p>
      <Formik
        initialValues={{
          name: '',
          email: '',
          bookingDate: null,
          comment: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form>
            <div>
              <Field
                type="text"
                id="name"
                name="name"
                placeholder="Name*"
                className={css.input}
              />
              <ErrorMessage
                name="name"
                component="div"
                className={css.errorMessage}
              />
            </div>

            <div>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Email*"
                className={css.input}
              />
              <ErrorMessage
                name="email"
                component="div"
                className={css.errorMessage}
              />
            </div>

            <div>
              <Field name="bookingDate">
                {({ field }) => (
                  <DatePicker
                    {...field}
                    selected={field.value}
                    onChange={date => setFieldValue('bookingDate', date)}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Booking date"
                    isClearable
                    className={css.input}
                  />
                )}
              </Field>
              <ErrorMessage
                name="bookingDate"
                component="div"
                className={css.errorMessage}
              />
            </div>

            <div>
              <Field
                as="textarea"
                id="comment"
                name="comment"
                placeholder="Comment"
                className={css.inputComment}
              />
              <ErrorMessage
                name="comment"
                component="div"
                className={css.errorMessage}
              />
            </div>

            <Button type="submit" text="Send"></Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RentForm;
