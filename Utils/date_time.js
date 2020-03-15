const getTimeDiff = (time1, time2) => {

  const timeStart = new Date("01/01/2007 " + time1);
  const timeEnd = new Date("01/01/2007 " + time2);

  const difference = timeEnd - timeStart;

  const diffResult = new Date(difference);
  return `${diffResult.getHours()}:${diffResult.getMinutes()}:${diffResult.getSeconds()}`;
}

export {
  getTimeDiff
}
