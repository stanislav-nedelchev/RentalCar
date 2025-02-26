import CarList from '../components/CarsList/CarsList.jsx';

const CatalogPage = () => {
  return (
    <>
      <p style={{ margin: '56px 0', textAlign: 'center' }}>FILTERS</p>
      <CarList />
      <p style={{ margin: '56px 0', textAlign: 'center' }}>Button</p>
    </>
  );
};

export default CatalogPage;
