/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useCities } from "../../contexts/CitiesContext";
import { useEffect } from "react";
import Spinner from "./Spinner";
import BackButton from "./BackButton";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  //useParams() take the id from the URI then it is used in
  //useEffect in order to call the getCity() function from
  //citiesContext.jsx
  const { id } = useParams();
  //const [searchParams, setSearchParams] = useSearchParams();
  //Here the City receives the value updated. It will be then distractured.
  const { getCity, currentCity, isLoading } = useCities();

  /*We use useEffect in order to call getCity function with
  the corresponding id obtained from the URI. The useEffect calls
  the function each time a new id is mounted.*/
  useEffect(
    function () {
      getCity(id);
    },
    [id, getCity]
  );

  //Here we distructare the currentCity and then it will be
  //displayed in the UI
  const { cityName, emoji, date, notes } = currentCity;

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
