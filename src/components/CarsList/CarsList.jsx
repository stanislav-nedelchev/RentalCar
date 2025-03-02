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
        <p>No car was found for your request. Try changing the filters.</p>
      ) : (
        cars.map(car => <CarCard key={car.id} car={car} />)
      )}
    </ul>
  );
};

export default CarList;
