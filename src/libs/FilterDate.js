import moment from 'moment';

export const FilterDate = {
  setTodayDate: function () {
    const startDateUTC = moment(new Date()).utc().local().format();
    const endDateUTC = moment(new Date()).utc().local().format();
    const start = moment(new Date()).format('DD MMM YYYY');
    const end = moment(new Date()).format('DD MMM YYYY');
    const objData = {
      startDateUTC: startDateUTC,
      endDateUTC: endDateUTC,
      startDate: start,
      endDate: end,
    };
    return objData;
  },
  setYesterdayDate: function () {
    const startDateUTC = moment(new Date())
      .add(-1, 'days')
      .utc()
      .local()
      .format();
    const endDateUTC = moment(new Date())
      .add(-1, 'days')
      .utc()
      .local()
      .format();
    const start = moment(new Date()).add(-1, 'days').format('DD MMM YYYY');
    const end = moment(new Date()).add(-1, 'days').format('DD MMM YYYY');
    const objData = {
      startDateUTC: startDateUTC,
      endDateUTC: endDateUTC,
      startDate: start,
      endDate: end,
    };
    return objData;
  },
  setLastSevenDate: function () {
    const start = moment(new Date()).add(-7, 'days').format('DD MMM YYYY');
    const end = moment(new Date()).format('DD MMM YYYY');
    const objData = {
      startDate: start,
      endDate: end,
    };
    return objData;
  },
  setLast30Day: function () {
    const start = moment(new Date()).add(-30, 'days');
    const end = moment(new Date());
    const objData = {
      startDate: start,
      endDate: end,
    };
    return objData;
  },
  setLastThirdThreeDate: function () {
    const startDateUTC = moment(new Date())
      .add(-30, 'days')
      .utc()
      .local()
      .format();
    const endDateUTC = moment(new Date()).utc().local().format();
    const start = moment(new Date()).add(-30, 'days').format('DD MMM YYYY');
    const end = moment(new Date()).format('DD MMM YYYY');
    const objData = {
      startDateUTC: startDateUTC,
      endDateUTC: endDateUTC,
      startDate: start,
      endDate: end,
    };
    return objData;
  },
  setThisMonthDate: function () {
    const start = moment().startOf('month');
    const end = moment().endOf('month');
    const objData = {
      startDate: start,
      endDate: end,
    };
    return objData;
  },
  setLastMonthDate: function () {
    const last = moment().subtract(1, 'months').startOf('month');
    const lastEnd = moment(last).endOf('month');

    const startDateUTC = last.utc().local().format();
    const endDateUTC = lastEnd.utc().local().format();

    const start = last.format('DD MMM YYYY');
    const end = lastEnd.format('DD MMM YYYY');

    const objData = {
      startDateUTC: startDateUTC,
      endDateUTC: endDateUTC,
      startDate: start,
      endDate: end,
    };
    return objData;
  },
  setCustomRangeDate: function (pstart, pend) {
    const startDateUTC = moment(pstart).utc().local().format();
    const endDateUTC = moment(pend).utc().local().format();

    const start = moment(pstart).format('DD MMM YYYY');
    const end = moment(pend).format('DD MMM YYYY');
    const objData = {
      startDateUTC: startDateUTC,
      endDateUTC: endDateUTC,
      startDate: start,
      endDate: end,
    };
    return objData;
  },
};
