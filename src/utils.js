function getFromAndToDates(dateReceived) {
  let dateFrom;
  let dateTo;

  if (dateReceived) {
    dateFrom = new Date(dateReceived);
    let date = dateFrom.getDate();
    const month = dateFrom.getMonth();
    const year = dateFrom.getFullYear();
    dateFrom = dateFrom.getTime() / 1000;
    date += 1;
    dateTo = new Date(`${month + 1}-${date}-${year}`);
    dateTo = dateTo.getTime() / 1000;
  } else {
    const currentDateTime = new Date();
    const month = currentDateTime.getMonth();
    const year = currentDateTime.getFullYear();
    let date = currentDateTime.getDate();
    dateFrom = new Date(`${month + 1}-${date}-${year}`);
    dateFrom = dateFrom.getTime() / 1000;
    date += 1;
    dateTo = new Date(`${month + 1}-${date}-${year}`);
    dateTo = dateTo.getTime() / 1000;
  }
  return { dateFrom, dateTo };
}

exports.getFromAndToDates = getFromAndToDates;
