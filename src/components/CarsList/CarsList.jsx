import { useEffect } from 'react';
import CarCard from '../CarCard/CarCard.jsx';
import css from './CarsList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars } from '../../redux/cars/operations.js';
import { selectCars } from '../../redux/cars/selector.js';

const CarList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCars());
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
