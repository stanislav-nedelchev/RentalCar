import CarList from '../../components/CarsList/CarsList.jsx';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn.jsx';
import css from './CatalogPage.module.css';

const CatalogPage = () => {
  return (
    <div className={css.catalogPage}>
      <p style={{ margin: '56px 0', textAlign: 'center' }}>FILTERS</p>
      <CarList />
      <LoadMoreBtn />
    </div>
  );
};

export default CatalogPage;
