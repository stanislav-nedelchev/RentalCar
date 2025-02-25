import { Link } from 'react-router-dom';
import css from './LinkSite.module.css';

const LinkSite = ({ text, link }) => {
  return (
    <Link className={css.link} to={link}>
      {text}
    </Link>
  );
};

export default LinkSite;
