import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrands, fetchCars } from '../../redux/operations.js';
import { selectBrands } from '../../redux/cars/selector.js';

const Filters = () => {
  const dispatch = useDispatch();
  const brands = useSelector(selectBrands); // Получаем бренды из Redux Store
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedRentalPrice, setSelectedRentalPrice] = useState(30); // Состояние для выбранной цены аренды
  const [selectedMinMileage, setSelectedMinMileage] = useState(''); // Состояние для минимального пробега
  const [selectedMaxMileage, setSelectedMaxMileage] = useState(''); // Состояние для максимального пробега

  // Загрузка брендов при монтировании компонента
  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  // Функция для создания списка цен от 30 до 200 с шагом 10
  const generatePriceOptions = () => {
    let prices = [];
    for (let price = 30; price <= 100; price += 10) {
      prices.push(price);
    }
    return prices;
  };

  const handleSearch = () => {
    console.log(
      `Ищем автомобили бренда: ${selectedBrand}, с ценой аренды: ${selectedRentalPrice}, с минимальным пробегом: ${selectedMinMileage}, с максимальным пробегом: ${selectedMaxMileage}`,
    );

    // Диспатчим экшн для получения автомобилей с выбранными фильтрами
    dispatch(
      fetchCars({
        page: 1,
        brand: selectedBrand,
        rentalPrice: selectedRentalPrice,
        minMileage: selectedMinMileage,
        maxMileage: selectedMaxMileage,
      }),
    );
  };

  return (
    <div>
      <h3>Фильтры</h3>

      {/* Выпадающий список для выбора бренда */}
      <select
        value={selectedBrand}
        onChange={e => setSelectedBrand(e.target.value)}
      >
        <option value="">Выберите бренд</option>
        {brands &&
          brands.map(brand => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
      </select>

      {/* Выпадающий список для выбора rentalPrice */}
      <select
        value={selectedRentalPrice}
        onChange={e => setSelectedRentalPrice(Number(e.target.value))}
      >
        {generatePriceOptions().map(price => (
          <option key={price} value={price}>
            {price}
          </option>
        ))}
      </select>

      {/* Поле ввода для минимального пробега */}
      <div>
        <label htmlFor="minMileage">Минимальный пробег (км): </label>
        <input
          type="number"
          id="minMileage"
          value={selectedMinMileage}
          onChange={e => setSelectedMinMileage(e.target.value)}
          placeholder="Введите минимальный пробег"
        />
      </div>

      {/* Поле ввода для максимального пробега */}
      <div>
        <label htmlFor="maxMileage">Максимальный пробег (км): </label>
        <input
          type="number"
          id="maxMileage"
          value={selectedMaxMileage}
          onChange={e => setSelectedMaxMileage(e.target.value)}
          placeholder="Введите максимальный пробег"
        />
      </div>

      {/* Кнопка для поиска */}
      <button onClick={handleSearch}>Искать</button>
    </div>
  );
};

export default Filters;
