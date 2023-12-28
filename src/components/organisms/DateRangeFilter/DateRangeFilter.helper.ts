import * as Yup from 'yup';

export const FormSchema = Yup.object({
  from: Yup.object().required('required'),
  to: Yup.object().required('required').test(
    'is-greater-than-from',
    'invalidDateRange',
    function (value) {
      const { from } = this.parent;
      if (from && value) {
        return value >= from;
      }
      return true;
    }
  ).test(
    'is-greater-than-from',
    'invalidDateRangeYearAfter',
    function (value) {
      const { from } = this.parent;
      if (from && value) {
        const fromDate: any = this.resolve(Yup.ref('from'));
        const toDate: any = this.resolve(Yup.ref('to'));
        const maxDate = new Date(fromDate);
        const minDate = new Date(toDate);
        maxDate.setDate(maxDate.getDate() + 365);

        return minDate <= maxDate;
      }
      return true;
    }
  )
});
