import css from './CarInfoList.module.css';

const CarInfoList = ({ list, list2 }) => {
  const combinedList = [...(list || []), ...(list2 || [])];
  return (
    <div>
      <ul className={css.list}>
        {combinedList.map((item, id) => (
          <li key={id} className={css.item}>
            <svg width="16" height="16" className={css.icon}>
              <use href="/icons.svg#iconCheckCircle"></use>
            </svg>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarInfoList;
