import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrands } from '../../redux/operations.js';
import { selectBrands } from '../../redux/cars/selector.js';
// import { fetchBrands } from '../operations'; // Путь к файлу с операциями
// import { selectBrands } from '../selectors'; // Путь к файлу с селекторами

const Filters = () => {
  const dispatch = useDispatch();
  const brands = useSelector(selectBrands); // Получаем бренды из Redux Store
  const [selectedBrand, setSelectedBrand] = useState('');

  // Загрузка брендов при монтировании компонента
  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  const handleSearch = () => {
    console.log(`Ищем автомобили бренда: ${selectedBrand}`);
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

      {/* Кнопка для поиска */}
      <button onClick={handleSearch} disabled={!selectedBrand}>
        Искать
      </button>
    </div>
  );
};

export default Filters;
