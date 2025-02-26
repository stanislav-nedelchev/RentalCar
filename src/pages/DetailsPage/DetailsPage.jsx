import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import css from './DetailsPage.module.css';
import RentForm from '../../components/RentForm/RentForm.jsx';

const DetailsPage = () => {
  const { id } = useParams();

  // ===============================Удалить=====================
  const [car, setCar] = useState(null); // Изначально null, так как мы ожидаем объект, а не массив.

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(
          `https://car-rental-api.goit.global/cars/${id}`,
        );
        console.log(response.data);
        setCar(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCar();
  }, [id]);

  if (!car) {
    return <div>Загрузка...</div>;
  }

  console.log(car);
  // =================================================================

  const regex = /\/(\d+)-ai\.jpg$/;
  const someNmb = car.img.match(regex);
  const carId = someNmb ? someNmb[1] : null;

  return (
    <div className={css.detailsPage}>
      <div>
        <img src={car.img} alt={car.brand} className={css.img} />
        <RentForm />
      </div>
      <div>
        <div className={css.mainInfo}>
          <h2 className={css.title}>
            {car.brand} {car.model}, {car.year}
            <span className={css.titleSpan}>Id: {carId}</span>
          </h2>
          <p className={css.location}>
            <svg width="16" height="16" className={css.icon}>
              <use href="/icons.svg#iconLocation"></use>
            </svg>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
