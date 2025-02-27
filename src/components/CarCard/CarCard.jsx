import { useDispatch, useSelector } from 'react-redux';
import LinkSite from '../LinkSite/LinkSite.jsx';
import css from './CarCard.module.css';
import { addFavorite, removeFavorite } from '../../redux/favorites/slice.js';
import { selectFavorites } from '../../redux/favorites/selectors.js';

const CarCard = ({ car }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites) || [];

  const isFavorited = favorites.includes(car.id);

  const handleFavoriteCar = () => {
    if (isFavorited) {
      dispatch(removeFavorite(car.id));
    } else {
      dispatch(addFavorite(car.id));
    }
  };

  const SvgNormal = () => (
    <svg width="16" height="16" className={css.svgNormal}>
      <use href="/icons.svg#iconNormal"></use>
    </svg>
  );

  const SvgFavorite = () => (
    <svg width="16" height="16" className={css.svgFavorite}>
      <use href="/icons.svg#iconFavorite"></use>
    </svg>
  );

  const SvgLine = () => (
    <svg width="2" height="16" className={css.svgLine}>
      <use href="/icons.svg#iconLine"></use>
    </svg>
  );

  const address = car.address || '';
  const addressParts = address.split(', ');
  const city = addressParts[1];
  const country = addressParts[2];

  const formattedType =
    car.type.charAt(0).toUpperCase() + car.type.slice(1).toLowerCase();

  const formattedMileage = car.mileage.toLocaleString('uk-UA') + ' km';

  return (
    <div className={css.carCard}>
      <button
        type="button"
        className={css.favoriteBtn}
        onClick={handleFavoriteCar}
      >
        {isFavorited ? <SvgFavorite /> : <SvgNormal />}
      </button>

      <img src={car.img} alt={car.description} className={css.carImg} />
      <div className={css.carName}>
        <h2 className={css.title}>
          {car.brand} <span className={css.carModel}>{car.model}</span>,{' '}
          {car.year}
        </h2>
        <p className={css.price}>${car.rentalPrice}</p>
      </div>
      <div className={css.infoBox}>
        <p className={css.info}>
          {city} <SvgLine />
          {country} <SvgLine /> {car.rentalCompany} <SvgLine />
        </p>
        <p className={css.info}>
          {formattedType} <SvgLine /> {formattedMileage}
        </p>
      </div>
      <LinkSite text="Read more" link={`/catalog/${car.id}`} />
    </div>
  );
};

export default CarCard;
