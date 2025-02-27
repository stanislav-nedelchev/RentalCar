import CarList from '../../components/CarsList/CarsList.jsx';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn.jsx';

const CatalogPage = () => {
  return (
    <>
      <p style={{ margin: '56px 0', textAlign: 'center' }}>FILTERS</p>
      <CarList />
      <LoadMoreBtn />
    </>
  );
};

export default CatalogPage;
