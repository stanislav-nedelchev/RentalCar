import { useEffect } from 'react';
import CarCard from '../CarCard/CarCard.jsx';
import css from './CarsList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectCars } from '../../redux/cars/selector.js';
import { fetchCars } from '../../redux/operations.js';
import { clearCars } from '../../redux/cars/slice.js';

const CarList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Очистим старые данные, когда компонент загружается
    dispatch(clearCars());
    // Добавляем фильтры по умолчанию
    dispatch(
      fetchCars({
        page: 1,
        brand: '',
        rentalPrice: '',
        minMileage: '',
        maxMileage: '',
      }),
    );
  }, [dispatch]);

  const cars = useSelector(selectCars);

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
