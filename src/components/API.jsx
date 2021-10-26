import React, { useEffect, useState } from "react";
import Charts from "./Charts";

export default function API() {
  const [api, setAPI] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(
      "https://0bc0de53be44.ngrok.io/dashboard?app=designrivet&env=prod&dur=P30D"
    )
      .then((response) => response.json())
      .then((json) => {
        setAPI(json);
        setLoaded(true);
      });
  }, []);
  if (loaded === true) console.log(api.response[0].graph1.data);
  return (
    <div>{loaded === false ? <h1>Loading</h1> : <Charts api={api} />}</div>
  );
}
