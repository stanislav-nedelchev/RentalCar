import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrands, fetchCars } from '../../redux/operations.js';
import { selectBrands } from '../../redux/cars/selector.js';
import { selectFilters } from '../../redux/filters/selector.js';
import { setFilters } from '../../redux/filters/slice.js';
import { clearCars } from '../../redux/cars/slice.js';
import { Field, Form, Formik } from 'formik';
import { validationSchemaFilters } from '../../schemas/validationSchema.jsx';
import css from './Filters.module.css';
import Button from '../Button/Button.jsx';

const Filters = () => {
  const dispatch = useDispatch();
  const brands = useSelector(selectBrands); // Получаем бренды из Redux Store
  const filters = useSelector(selectFilters); // Получаем фильтры из Redux

  // Загрузка брендов при монтировании компонента
  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  // Функция для создания списка цен от 30 до 100 с шагом 10
  const generatePriceOptions = () => {
    let prices = [];
    for (let price = 30; price <= 100; price += 10) {
      prices.push(price);
    }
    return prices;
  };

  const handleSearch = async (values, { resetForm }) => {
    console.log('Поиск с фильтрами:', values);

    // Сначала очищаем список автомобилей
    dispatch(clearCars());

    // Обновляем фильтры в Redux перед отправкой запроса
    dispatch(setFilters(values));

    // Отправляем запрос для получения автомобилей с выбранными фильтрами
    await dispatch(
      fetchCars({
        page: 1,
        brand: values.brand,
        rentalPrice: values.rentalPrice,
        minMileage: values.minMileage,
        maxMileage: values.maxMileage,
      }),
    );

    // После завершения запроса сбрасываем форму (сбрасываем поля в начальные значения)
    resetForm();
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
              {touched.brand && errors.brand && <div>{errors.brand}</div>}
            </div>
            <div>
              <label htmlFor="rentalPrice" className={css.label}>
                Price/ 1 hour
              </label>
              <Field
                as="select"
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
              {touched.rentalPrice && errors.rentalPrice && (
                <div>{errors.rentalPrice}</div>
              )}
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
                {touched.minMileage && errors.minMileage && (
                  <div>{errors.minMileage}</div>
                )}
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
                {touched.maxMileage && errors.maxMileage && (
                  <div>{errors.maxMileage}</div>
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
