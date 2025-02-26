import { useState, useEffect } from 'react';
import axios from 'axios';
import CarCard from '../CarCard/CarCard.jsx';
import css from './CarsList.module.css';

const CarList = () => {
  const [cars, setCars] = useState([]); // Изначально пустой массив
  const [loading, setLoading] = useState(true); // Состояние загрузки
  const [error, setError] = useState(null); // Состояние ошибки

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(
          'https://car-rental-api.goit.global/cars',
        );
        console.log(response.data); // Логируем ответ, чтобы убедиться в структуре данных
        // Теперь извлекаем массив машин из response.data.cars
        if (Array.isArray(response.data.cars)) {
          setCars(response.data.cars);
        } else {
          setCars([]); // Если это не массив, устанавливаем пустой массив
        }
        setLoading(false);
      } catch (err) {
        setError(err); // Устанавливаем ошибку, если она произошла
        setLoading(false); // Завершаем загрузку при ошибке
      }
    };

    fetchCars();
  }, []); // Эффект сработает один раз при монтировании компонента

  if (loading) {
    return <div>Loading...</div>; // Можно заменить на спиннер или компонент загрузки
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Выводим сообщение об ошибке
  }

  if (!Array.isArray(cars)) {
    return <div>Полученные данные не являются массивом.</div>; // Обрабатываем случай, когда cars не массив
  }

  return (
    <ul className={css.list}>
      {cars.length === 0 ? (
        <li>No cars available</li> // Если нет машин, выводим соответствующее сообщение
      ) : (
        cars.map(car => <CarCard key={car.id} car={car} />)
      )}
    </ul>
  );
};

export default CarList;
