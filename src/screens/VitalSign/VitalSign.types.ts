import * as Yup from 'yup';

export interface VitalSignFormProps {
  age: number;
  height: number;
  weight: number;
  radio1: boolean;
  radio2: boolean;
  radio3: boolean;
  radio4: boolean;
  radio5: boolean;
  radio6?: boolean;
}

export const VitalSchema: Yup.SchemaOf<VitalSignFormProps> = Yup.object().shape({
  age: Yup.number()
    .required()
    .min(1)
    .max(125),
  height: Yup.number()
    .required()
    .min(24)
    .max(250),
  weight: Yup.number()
    .required()
    .min(1)
    .max(400),
  radio1: Yup.boolean()
    .required(),
  radio2: Yup.boolean()
    .required(),
  radio3: Yup.boolean()
    .required(),
  radio4: Yup.boolean()
    .required(),
  radio5: Yup.boolean()
    .required(),
  radio6: Yup.boolean()
    .when('radio5', {
      is: true,
      then: Yup.boolean().required(),
      otherwise: Yup.boolean(),
    }),
});
