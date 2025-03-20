import { useSelector } from 'react-redux';
import { selectCars, selectLoading } from '../../redux/cars/selector.js';
import CarCard from '../CarCard/CarCard.jsx';
import Loader from '../Loader/Loader.jsx';
import css from './CarsList.module.css';

const CarList = () => {
  const cars = useSelector(selectCars);
  const loading = useSelector(selectLoading);

  if (loading) return <Loader />;

  return (
    <ul className={css.list}>
      {cars.length === 0 ? (
        <li>No car was found for your request. Try changing the filters.</li>
      ) : (
        cars.map(car => (
          <li key={car.id}>
            <CarCard car={car} />
          </li>
        ))
      )}
    </ul>
  );
};

export default CarList;
