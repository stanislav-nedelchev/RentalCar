import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useState } from 'react';
import { validationSchemaRentForm } from '../../schemas/validationSchema.jsx';
import Button from '../Button/Button.jsx';
import DatePicker from 'react-datepicker';
import Modal from 'antd/es/modal/Modal.js';
import { toast } from 'react-hot-toast';
import 'react-datepicker/dist/react-datepicker.css';
import './Calendar.css';
import css from './RentForm.module.css';

const RentForm = ({ car }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [resetForm, setResetForm] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    toast.success('Your booking was successfully submitted!');
    if (resetForm) {
      resetForm();
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log('Form data submitted:', values);
    console.log(car);
    setFormValues(values);
    showModal();
    setSubmitting(false);
    setResetForm(() => resetForm);
  };

  const formattedDate = formValues.bookingDate
    ? formValues.bookingDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : '';

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
        validationSchema={validationSchemaRentForm}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isValid, dirty }) => (
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
            <Button
              type="submit"
              text="Send"
              disabled={!isValid || !dirty}
            ></Button>
          </Form>
        )}
      </Formik>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        centered
      >
        {formValues && (
          <div className={css.modalBox}>
            <img src={car.img} alt={car.brand} className={css.modalImg} />
            <div>
              <h3 className={css.modalTitle}>Dear {formValues.name}</h3>
              <p className={css.modalText}>You are going to rent</p>
              <p>
                <span className={css.modalSpan}>
                  {car.brand} {car.model},
                </span>{' '}
                {car.year}
                <br />
                for
                <span className={css.modalSpan}>
                  {' '}
                  {car.rentalPrice}$ per hour
                </span>
                <br />
                {formattedDate && (
                  <>
                    <span className={css.modalSpan}>{formattedDate}</span>
                    <br />
                  </>
                )}
                at the address <br />
                <span className={css.modalSpan}> {car.address}</span>
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default RentForm;
