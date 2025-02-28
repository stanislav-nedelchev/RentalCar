import CarList from '../../components/CarsList/CarsList.jsx';
import Filters from '../../components/Filters/Filters.jsx';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn.jsx';
import css from './CatalogPage.module.css';

const CatalogPage = () => {
  return (
    <div className={css.catalogPage}>
      <Filters />
      <CarList />
      <LoadMoreBtn />
    </div>
  );
};

export default CatalogPage;
