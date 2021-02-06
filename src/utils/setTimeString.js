const setTimeString = (future, noColon) => {
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

  return noColon ? `${hr}${min}` : `${hr}:${min}`
};

export default setTimeString;
