import LinkSite from '../LinkSite/LinkSite.jsx';
import css from './Hero.module.css';

const Hero = () => {
  return (
    <section className={css.hero}>
      <div className={css.box}>
        <h1 className={css.title}>Find your perfect rental car</h1>
        <p className={css.text}>
          Reliable and budget-friendly rentals for any journey
        </p>
        <LinkSite text="View Catalog" link="/catalog" />
      </div>
    </section>
  );
};

export default Hero;
