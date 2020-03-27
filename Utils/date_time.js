const getTimeDiff = (time1, time2) => {

  const timeStart = new Date("01/01/2007 " + time1);
  const timeEnd = new Date("01/01/2007 " + time2);

  const difference = timeEnd - timeStart;

  const diffResult = new Date(difference);
  return `${diffResult.getHours()}:${diffResult.getMinutes()}:${diffResult.getSeconds()}`;
}

const getDate = () => {
  let date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  return  `${day}/${month}/${year}`;
}

const getTime = () => {
  let date = new Date();

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  return `${hours}:${minutes}:${seconds}`;
}

export {
  getTimeDiff,
  getTime,
  getDate
}
