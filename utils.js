exports.getFromAndToDates = getFromAndToDates;

function getFromAndToDates(dateFrom, dateTo, dateReceived) {
  if (dateReceived) {
    dateFrom = new Date(dateReceived);
    var date = dateFrom.getDate();
    var month = dateFrom.getMonth();
    var year = dateFrom.getFullYear();
    dateFrom = dateFrom.getTime() / 1000;
    date += 1;
    dateTo = new Date((month + 1) + "-" + date + "-" + year);
    dateTo = dateTo.getTime() / 1000;
  }
  else {
    var currentDateTime = new Date();
    var date = currentDateTime.getDate();
    var month = currentDateTime.getMonth();
    var year = currentDateTime.getFullYear();
    dateFrom = new Date((month + 1) + "-" + date + "-" + year);
    dateFrom = dateFrom.getTime() / 1000;
    date += 1;
    dateTo = new Date((month + 1) + "-" + date + "-" + year);
    dateTo = dateTo.getTime() / 1000;
  }
  return { dateFrom, dateTo };
}
