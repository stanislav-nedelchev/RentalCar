import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectCarById } from '../../redux/cars/selector.js';
import { fetchCarById } from '../../redux/cars/operations.js';
import Loader from '../../components/Loader/Loader.jsx';
import CarInfoList from '../../components/CarInfoList/CarInfoList.jsx';
import RentForm from '../../components/RentForm/RentForm.jsx';
import css from './DetailsPage.module.css';

const DetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const car = useSelector(selectCarById);

  useEffect(() => {
    dispatch(fetchCarById(id));
  }, [dispatch, id]);

  if (!car) {
    return <Loader />;
  }

  const regex = /\/(\d+)-ai\.jpg$/; //  Тут мав бути id.Діставати із картинки невірно, але краще так ніж нічого
  const someNmb = car.img.match(regex);
  const carId = someNmb ? someNmb[1] : null;

  const address = car.address || '';
  const addressParts = address.split(', ');
  const city = addressParts[1];
  const country = addressParts[2];

  const formattedMileage = car.mileage.toLocaleString('uk-UA') + ' km';
  const formattedType =
    car.type.charAt(0).toUpperCase() + car.type.slice(1).toLowerCase();

  return (
    <div className={css.detailsPage}>
      <div>
        <img src={car.img} alt={car.brand} className={css.img} />
        <div className={css.formForDesktop}>
          <RentForm car={car} />
        </div>
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
            {city},{country}
            <span className={css.locationSpan}>
              Mileage: {formattedMileage}
            </span>
          </p>
          <p className={css.price}>${car.rentalPrice}</p>
          <p className={css.description}>{car.description}</p>
        </div>
        <div className={css.info}>
          <div>
            <h3 className={css.infoTitle}>Rental Conditions:</h3>
            <CarInfoList list={car.rentalConditions} />
          </div>
          <div>
            <h3 className={css.infoTitle}>Car Specifications:</h3>
            <ul className={css.specificationsList}>
              <li className={css.specificationsItem}>
                <svg width="16" height="16" className={css.specificationsIcon}>
                  <use href="/icons.svg#iconCalendar"></use>
                </svg>
                Year: {car.year}
              </li>
              <li className={css.specificationsItem}>
                <svg width="16" height="16" className={css.specificationsIcon}>
                  <use href="/icons.svg#iconCar"></use>
                </svg>
                Type: {formattedType}
              </li>
              <li className={css.specificationsItem}>
                <svg width="16" height="16" className={css.specificationsIcon}>
                  <use href="/icons.svg#iconFuelPump"></use>
                </svg>
                Fuel Consumption: {car.fuelConsumption}
              </li>
              <li className={css.specificationsItem}>
                <svg width="16" height="16" className={css.specificationsIcon}>
                  <use href="/icons.svg#iconGear"></use>
                </svg>
                Engine Size: {car.engineSize}
              </li>
            </ul>
          </div>
          <div>
            <h3 className={css.infoTitle}>Accessories and functionalities:</h3>
            <CarInfoList list={car.accessories} list2={car.functionalities} />
          </div>
        </div>
      </div>
      {/* <div className={css.formForMobile}>
        <RentForm car={car} />
      </div> */}
    </div>
  );
};

export default DetailsPage;
