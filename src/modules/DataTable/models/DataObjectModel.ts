// Это вариант решения через универсальный интерфейс, но также мы можем описать
// каждый вид данных и объединить интерфейсы при помощи Partial, чтобы сделать их опциональными
export interface DataObjectModel {
  id: number;
  active: boolean;

  [key: string]: string | number | boolean;
}
