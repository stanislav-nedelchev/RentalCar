import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrands, fetchCars } from '../../redux/operations.js';
import { selectBrands } from '../../redux/cars/selector.js';
import { selectFilters } from '../../redux/filters/selector.js';
import { setFilters } from '../../redux/filters/slice.js';
import { clearCars } from '../../redux/cars/slice.js';

const Filters = () => {
  const dispatch = useDispatch();
  const brands = useSelector(selectBrands); // Получаем бренды из Redux Store

  const filters = useSelector(selectFilters); // Получаем фильтры из Redux
  const [localFilters, setLocalFilters] = useState(filters); // Локальные фильтры для управления изменениями

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

  const handleFilterChange = e => {
    const { name, value } = e.target;
    // Обновляем локальные фильтры
    setLocalFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSearch = e => {
    e.preventDefault(); // Останавливаем стандартное поведение формы (перезагрузку страницы)
    console.log(
      `Ищем автомобили бренда: ${localFilters.brand}, с ценой аренды: ${localFilters.rentalPrice}, с минимальным пробегом: ${localFilters.minMileage}, с максимальным пробегом: ${localFilters.maxMileage}`,
    );

    // Сначала очищаем список автомобилей
    dispatch(clearCars());

    // Обновляем фильтры в Redux перед отправкой запроса
    dispatch(setFilters(localFilters));

    // Отправляем запрос для получения автомобилей с выбранными фильтрами
    dispatch(
      fetchCars({
        page: 1,
        brand: localFilters.brand,
        rentalPrice: localFilters.rentalPrice,
        minMileage: localFilters.minMileage,
        maxMileage: localFilters.maxMileage,
      }),
    );
  };

  return (
    <form onSubmit={handleSearch}>
      <h3>Фильтры</h3>

      {/* Выпадающий список для выбора бренда */}
      <div>
        <label htmlFor="brand">Бренд:</label>
        <select
          name="brand"
          value={localFilters.brand}
          onChange={handleFilterChange}
        >
          <option value="">Выберите бренд</option>
          {brands &&
            brands.map(brand => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
        </select>
      </div>

      {/* Выпадающий список для выбора rentalPrice */}
      <div>
        <label htmlFor="rentalPrice">Цена аренды:</label>
        <select
          name="rentalPrice"
          value={localFilters.rentalPrice}
          onChange={handleFilterChange}
        >
          {generatePriceOptions().map(price => (
            <option key={price} value={price}>
              {price}
            </option>
          ))}
        </select>
      </div>

      {/* Поле ввода для минимального пробега */}
      <div>
        <label htmlFor="minMileage">Минимальный пробег (км): </label>
        <input
          type="number"
          id="minMileage"
          name="minMileage"
          value={localFilters.minMileage}
          onChange={handleFilterChange}
          placeholder="Введите минимальный пробег"
        />
      </div>

      {/* Поле ввода для максимального пробега */}
      <div>
        <label htmlFor="maxMileage">Максимальный пробег (км): </label>
        <input
          type="number"
          id="maxMileage"
          name="maxMileage"
          value={localFilters.maxMileage}
          onChange={handleFilterChange}
          placeholder="Введите максимальный пробег"
        />
      </div>

      {/* Кнопка для поиска */}
      <button type="submit">Искать</button>
    </form>
  );
};

export default Filters;
