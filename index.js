function createEmployeeRecord([name, familyName, title, pay]) {
  let employee = {};
  (employee.firstName = name),
    (employee.familyName = familyName),
    (employee.title = title),
    (employee.payPerHour = parseInt(pay)),
    (employee.timeInEvents = []),
    (employee.timeOutEvents = []);

  return employee;
}

function createEmployeeRecords(array) {
  let records = array.map((person) => createEmployeeRecord(person));
  return records;
}

function createTimeInEvent(date) {
  let stamp = {
    type: "TimeIn",
    hour: parseInt(date.slice(11)),
    date: date.slice(0, 10),
  };
  this.timeInEvents.push(stamp);
  return this;
}

function createTimeOutEvent(date) {
  let stamp = {
    type: "TimeOut",
    hour: parseInt(date.slice(11)),
    date: date.slice(0, 10),
  };
  this.timeOutEvents.push(stamp);
  return this;
}

function hoursWorkedOnDate(date) {
  let inEvent = this.timeInEvents.find((stamp) => stamp.date === date);
  let out = this.timeOutEvents.find((stamp) => stamp.date === date);
  return (out.hour - inEvent.hour) * 0.01;
}

function wagesEarnedOnDate(date) {
  let hours = hoursWorkedOnDate.call(this, date);
  return hours * this.payPerHour;
}
function findEmployeeByFirstName(srcArray, firstName) {
  let emp = srcArray.find((emp) => emp.firstName === firstName);
  return emp;
}

function calculatePayroll(employeeRecords) {
  let wages = employeeRecords.map((employee) => {
    allWagesFor(employee);
  });
  return wages.reduce(acc, (val) => acc + val);
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  const payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discus1 soon!

  return payable;
};
