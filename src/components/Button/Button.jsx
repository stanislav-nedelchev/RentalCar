import css from './Button.module.css';

const Button = ({ type, onClick, text }) => (
  <button className={css.button} type={type} onClick={onClick}>
    {text}
  </button>
);

export default Button;
