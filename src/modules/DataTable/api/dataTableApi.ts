import { products } from '../../../../localDb/products';
import { pages } from '../../../../localDb/pages';
import { pricePlans } from '../../../../localDb/pricePlans';

const database = [products, pages, pricePlans];
export const getData = () => {
  const randomIndex = Math.floor(Math.random() * database.length);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(database[randomIndex]);
    }, 3000);
  });
};
