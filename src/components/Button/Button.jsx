import css from "./Button.module.css";

const Button = ({ type, onClick, text, style }) => {
  const buttonClass = `${css.button} ${css[style]}`;

  return (
    <button className={buttonClass} type={type} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;

// const App = () => {
//   const handleSave = () => {
//     console.log("View Catalog");
//   };

//   const handleDelete = () => {
//     console.log("Read more");
//   };

//   const handleEdit = () => {
//     console.log("Search");
//   };

//   const handleCancel = () => {
//     console.log("Send");
//   };

//   const handleLoad = () => {
//     console.log("Load");
//   };

//   return (
//     <div>
//       <Button
//         type="submit"
//         style="long"
//         text="View Catalog"
//         onClick={handleSave}
//       ></Button>
//       <Button
//         type="button"
//         style="long"
//         text="Read more"
//         onClick={handleDelete}
//       ></Button>
//       <Button type="submit" text="Search" onClick={handleEdit}></Button>
//       <Button type="submit" text="Send" onClick={handleCancel}></Button>
//       <Button
//         type="submit"
//         style="load"
//         text="Load more"
//         onClick={handleLoad}
//       ></Button>
//     </div>
//   );
// };
