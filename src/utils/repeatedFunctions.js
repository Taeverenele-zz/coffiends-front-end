import axios from "axios";

const getCoffeesDb = async () => {
  const response = await axios.get("http://localhost:5000/coffees/");
  const coffeesArr = await response.data;
  return coffeesArr;
};

const setTimeString = (future) => {
  let time = new Date().getTime();
  let date
  
  future ? date = new Date(future) : date = new Date(time);

  let hr = String(date.getHours());
  let min = String(date.getMinutes());

  if (hr.length < 2) {
    hr = "0" + hr;
  };
  if (min.length < 2) {
    min = "0" + min;
  };

  return `${hr}:${min}`
};

export { getCoffeesDb, setTimeString };
