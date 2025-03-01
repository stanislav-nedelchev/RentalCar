import { useSelector } from 'react-redux';
import { selectCars } from '../../redux/cars/selector.js';
import CarCard from '../CarCard/CarCard.jsx';
import css from './CarsList.module.css';

const CarList = () => {
  const cars = useSelector(selectCars);

  return (
    <ul className={css.list}>
      {cars.length === 0 ? (
        <p>No car was found for your request. Try changing the filters.</p>
      ) : (
        cars.map(car => <CarCard key={car.id} car={car} />)
      )}
    </ul>
  );
};

export default CarList;
