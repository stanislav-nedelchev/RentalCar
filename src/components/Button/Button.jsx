import css from './Button.module.css';

const Button = ({ type, onClick, text, style }) => {
  const buttonClass = `${css.button} ${css[style]}`;

  return (
    <button className={buttonClass} type={type} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
