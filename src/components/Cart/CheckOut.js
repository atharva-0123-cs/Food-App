import { useRef, useState } from "react";
import classes from "./CheckOut.module.css";

const isEnpty = (value) => value.trim() === "";
const isFiveChar = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    portal: true,
    city: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const portalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const entredName = nameInputRef.current.value;
    const entredSrteet = streetInputRef.current.value;
    const entredPortal = portalInputRef.current.value;
    const entredCity = cityInputRef.current.value;

    const entredNameIsValid = !isEnpty(entredName);
    const entredSrteetIsValid = !isEnpty(entredSrteet);
    const entredPortalIsValid = isFiveChar(entredPortal);
    const entredCityIsValid = !isEnpty(entredCity);

    setFormInputValidity({
      name: entredNameIsValid,
      street: entredSrteetIsValid,
      portal: entredPortalIsValid,
      city: entredCityIsValid,
    });

    const formIsValid =
      entredNameIsValid &&
      entredSrteetIsValid &&
      entredPortalIsValid &&
      entredCityIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: entredName,
      street: entredSrteet,
      portal: entredPortal,
      city: entredCity,
    });

    // submit data
  };

  const nameControlClasses = `${classes.control} ${
    formInputValidity.name ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formInputValidity.street ? "" : classes.invalid
  }`;
  const portalControlClasses = `${classes.control} ${
    formInputValidity.portal ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputValidity.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name && <p>Plx Entred a Valid Name</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputValidity.street && <p>Plx Entred a Valid street</p>}
      </div>
      <div className={portalControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={portalInputRef} />
        {!formInputValidity.portal && <p>Plx Entred a Valid portal</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValidity.city && <p>Plx Entred a Valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
