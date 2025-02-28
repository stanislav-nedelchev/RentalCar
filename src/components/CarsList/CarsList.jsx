import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars } from '../../redux/operations.js';
import { selectCars } from '../../redux/cars/selector.js';
import { selectFilters } from '../../redux/filters/selector.js';
import CarCard from '../CarCard/CarCard.jsx';
import css from './CarsList.module.css';

const CarList = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);
  const filters = useSelector(selectFilters);

  useEffect(() => {
    // При изменении фильтров отправляем запрос с новыми параметрами
    dispatch(fetchCars({ ...filters, page: 1 }));
  }, [dispatch, filters]);

  return (
    <ul className={css.list}>
      {cars.length === 0 ? (
        <li>No cars available</li>
      ) : (
        cars.map(car => <CarCard key={car.id} car={car} />)
      )}
    </ul>
  );
};

export default CarList;
