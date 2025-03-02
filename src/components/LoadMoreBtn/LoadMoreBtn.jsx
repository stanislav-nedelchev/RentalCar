import { useDispatch, useSelector } from 'react-redux';
import { selectPage, selectTotalPages } from '../../redux/cars/selector.js';
import { fetchCars } from '../../redux/cars/operations.js';
import { selectFilters } from '../../redux/filters/selector.js';
import Button from '../Button/Button.jsx';

const LoadMoreBtn = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
  const filters = useSelector(selectFilters);

  const handleLoadMore = () => {
    const nextPage = Number(currentPage) + 1;
    const scrollPosition = window.scrollY;
    dispatch(
      fetchCars({
        page: nextPage,
        brand: filters.brand,
        rentalPrice: filters.rentalPrice,
        minMileage: filters.minMileage,
        maxMileage: filters.maxMileage,
      }),
    ).finally(() => {
      window.scrollTo({
        top: scrollPosition,
        behavior: 'auto',
      });
    });
  };

  const isLoadMoreVisible = currentPage < totalPages;

  return (
    isLoadMoreVisible && (
      <Button
        type="submit"
        style="load"
        text="Load more"
        onClick={handleLoadMore}
      />
    )
  );
};

export default LoadMoreBtn;
