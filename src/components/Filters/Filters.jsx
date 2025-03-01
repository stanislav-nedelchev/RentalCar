import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrands, fetchCars } from '../../redux/operations.js';
import { selectBrands } from '../../redux/cars/selector.js';
import { selectFilters } from '../../redux/filters/selector.js';
import { setFilters } from '../../redux/filters/slice.js';
import { Field, Form, Formik } from 'formik';
import { validationSchemaFilters } from '../../schemas/validationSchema.jsx';
import { clearCars } from '../../redux/cars/slice.js';
import Button from '../Button/Button.jsx';
import css from './Filters.module.css';

const Filters = () => {
  const dispatch = useDispatch();
  const brands = useSelector(selectBrands);
  const filters = useSelector(selectFilters);

  useEffect(() => {
    dispatch(clearCars());
    dispatch(fetchBrands());
    dispatch(
      fetchCars({
        page: 1,
        brand: filters.brand || '',
        rentalPrice: filters.rentalPrice || '',
        minMileage: filters.minMileage || '',
        maxMileage: filters.maxMileage || '',
      }),
    );
  }, []);

  const handleSearch = values => {
    dispatch(clearCars());
    dispatch(setFilters(values));

    dispatch(
      fetchCars({
        page: 1,
        brand: values.brand,
        rentalPrice: values.rentalPrice,
        minMileage: values.minMileage,
        maxMileage: values.maxMileage,
      }),
    );
  };

  const generatePriceOptions = () => {
    let prices = [];
    for (let price = 30; price <= 100; price += 10) {
      prices.push(price);
    }
    return prices;
  };

  return (
    <Formik
      initialValues={{
        brand: filters.brand || '',
        rentalPrice: filters.rentalPrice || '',
        minMileage: filters.minMileage || '',
        maxMileage: filters.maxMileage || '',
      }}
      validationSchema={validationSchemaFilters}
      onSubmit={handleSearch}
    >
      {({ values, handleChange, handleBlur, errors, touched }) => (
        <Form>
          <div className={css.formBox}>
            <div>
              <label htmlFor="brand" className={css.label}>
                Car brand
              </label>
              <Field
                as="select"
                id="brand"
                name="brand"
                value={values.brand}
                onChange={handleChange}
                onBlur={handleBlur}
                className={css.fieldBand}
              >
                <option value="">Choose a brand</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </Field>
            </div>
            <div>
              <label htmlFor="rentalPrice" className={css.label}>
                Price/ 1 hour
              </label>
              <Field
                as="select"
                id="rentalPrice"
                name="rentalPrice"
                value={values.rentalPrice}
                onChange={handleChange}
                onBlur={handleBlur}
                className={css.fieldPrice}
              >
                <option value="">Choose a price</option>
                {generatePriceOptions().map(price => (
                  <option key={price} value={price}>
                    {price}
                  </option>
                ))}
              </Field>
            </div>
            <div className={css.mileageBox}>
              <div>
                <label htmlFor="minMileage" className={css.label}>
                  Сar mileage / km
                </label>
                <Field
                  type="number"
                  id="minMileage"
                  name="minMileage"
                  value={values.minMileage}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="From"
                  className={css.fieldMin}
                />
              </div>
              <div>
                <Field
                  type="number"
                  id="maxMileage"
                  name="maxMileage"
                  value={values.maxMileage}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="To"
                  className={css.fieldMax}
                />
              </div>
              {/* Відображення помилок під формою */}
              <div className={css.errors}>
                {Object.keys(errors).length > 0 && (
                  <div className={css.errorMessages}>
                    {Object.keys(errors).map(field => {
                      if (touched[field] && errors[field]) {
                        return (
                          <div key={field} className={css.errorMessage}>
                            {errors[field]}
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                )}
              </div>
            </div>
            <Button type="submit" text="Search" />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Filters;
