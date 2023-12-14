export interface dataExample {
  id: number | string,
  state: string,
  date: string,
  number: string,
  value: string
}

export interface Props {
  status: number;
  infoPaypal: {
    id: string;
    state: string;
    date: string;
    number: string;
    value: string;
  }
}