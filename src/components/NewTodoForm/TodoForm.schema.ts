import { object, string, Infer, nullable } from 'superstruct';
import { nonempty } from '../../utils/struct';

export const schema = object({
  todo: nullable(nonempty(string())),
});

export type TodoValues = Infer<typeof schema>;

export const initialValues: TodoValues = {
  todo: null,
};
