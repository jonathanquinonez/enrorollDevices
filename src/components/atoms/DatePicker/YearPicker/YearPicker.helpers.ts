import moment, { Moment } from 'moment';

export const getYearsList = (from: Moment, length: number) => {
  const listTotal = length;
  const prevYears = [...Array(listTotal)].map((_, index) => ({
    key: index,
    label: from.clone().add(index, 'year').format('YYYY'),
    value: from.clone().add(index, 'year'),
  }));

  return [prevYears].flat();
};

export const getMonthList = (currentDate: Moment) =>
  moment.months().map((month, index) => ({
    key: index,
    label: month,
    value: currentDate.clone().month(index),
  }));
