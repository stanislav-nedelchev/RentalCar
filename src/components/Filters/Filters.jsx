import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrands, fetchCars } from '../../redux/operations.js';
import { selectBrands } from '../../redux/cars/selector.js';
import { selectFilters } from '../../redux/filters/selector.js';
import { setFilters } from '../../redux/filters/slice.js';
import { clearCars } from '../../redux/cars/slice.js';
import { Field, Form, Formik } from 'formik';
import validationSchemaFilters from '../../schemas/validationSchema.jsx';

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
          <h3>Фильтры</h3>

          {/* Выпадающий список для выбора бренда */}
          <div>
            <label htmlFor="brand">Бренд:</label>
            <Field
              as="select"
              name="brand"
              value={values.brand}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">Выберите бренд</option>
              {brands && brands.length > 0 ? (
                brands.map(brand => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))
              ) : (
                <option disabled>Нет доступных брендов</option>
              )}
            </Field>
            {touched.brand && errors.brand && <div>{errors.brand}</div>}
          </div>

          {/* Выпадающий список для выбора rentalPrice */}
          <div>
            <label htmlFor="rentalPrice">Цена аренды:</label>
            <Field
              as="select"
              name="rentalPrice"
              value={values.rentalPrice}
              onChange={handleChange}
              onBlur={handleBlur}
            >
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

          {/* Поле ввода для минимального пробега */}
          <div>
            <label htmlFor="minMileage">Минимальный пробег (км): </label>
            <Field
              type="number"
              id="minMileage"
              name="minMileage"
              value={values.minMileage}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Введите минимальный пробег"
              min="0"
            />
            {touched.minMileage && errors.minMileage && (
              <div>{errors.minMileage}</div>
            )}
          </div>

          {/* Поле ввода для максимального пробега */}
          <div>
            <label htmlFor="maxMileage">Максимальный пробег (км): </label>
            <Field
              type="number"
              id="maxMileage"
              name="maxMileage"
              value={values.maxMileage}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Введите максимальный пробег"
              min="0"
            />
            {touched.maxMileage && errors.maxMileage && (
              <div>{errors.maxMileage}</div>
            )}
          </div>

          {/* Кнопка для поиска */}
          <button type="submit">Искать</button>
        </Form>
      )}
    </Formik>
  );
};

export default Filters;
