import { useDispatch, useSelector } from 'react-redux';
import { selectPage } from '../../redux/cars/selector.js';
import { setPage } from '../../redux/cars/slice.js';
import { fetchCars } from '../../redux/operations.js';
import Button from '../Button/Button.jsx';

const LoadMoreBtn = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectPage);

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    dispatch(setPage(nextPage)); // Обновляем состояние страницы в сторе
    dispatch(
      fetchCars({
        page: nextPage,
        brand: '',
        rentalPrice: '',
        minMileage: '',
        maxMileage: '',
      }),
    ); // Запрашиваем машины для следующей страницы
  };

  return (
    <Button
      type="submit"
      style="load"
      text="Load more"
      onClick={handleLoadMore}
    />
  );
};

export default LoadMoreBtn;
