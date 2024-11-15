'use server';
import { deleteImage } from '@/utils/deleteImage';
import { OrderType, ProductFormData, ProductType } from './Types';
import { ProductOrder } from '@/components/Content/types';
import { query_MySql } from '@/Сonfig/configMySQL';

export async function getMeUser(email: string, password: string) {
  if (email === process.env.ADMIN_EMAIL) {
    if (password === process.env.ADMIN_PASSWORD) {
      return { status: true, message: 'Аутентификация прошла успешно' };
    } else {
      return { status: false, message: 'Неверный пароль' };
    }
  } else {
    return { status: false, message: 'Пользователь не найден' };
  }
}

export async function getProducts(category: string, pageNumber: number) {
  const pageSize = 6;
  const offset = (pageNumber - 1) * pageSize;

  const results = await query_MySql(`
      SELECT * FROM products 
  WHERE category = '${category}'
  LIMIT ${pageSize} OFFSET ${offset}
  `);
  return results as ProductType[];
}

export async function getProduct(id: number) {
  const query = 'SELECT * FROM products WHERE id = ?';
  const results = await query_MySql(query, [id]);
  const product: ProductType[] = results as ProductType[];
  return product;
}

export async function setProduct(d: ProductFormData) {
  const query = `INSERT INTO products (title, descriptions, weight, calories, price, structure, category, img)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  try {
    await query_MySql(query, [
      d.title,
      d.description,
      d.weight,
      d.calories,
      d.price,
      d.structure,
      d.category,
      d.img,
    ]);

    const rows: any = await query_MySql(`SELECT LAST_INSERT_ID() as id`);

    if (rows[0]?.id > 0) {
      return { status: true, insertedId: rows[0].id };
    } else {
      return { status: false, message: 'Ошибка вставки данных.' };
    }
  } catch (error) {
    console.error('Ошибка выполнения запроса:', error);
    return { status: false, message: 'Произошла ошибка.' };
  }
}

export async function getProductsAll(category: string) {
  const rows = (await query_MySql(
    ` SELECT * FROM products WHERE category = '${category}' FOR UPDATE`,
  )) as ProductType[];
  return rows;
}

export async function getOrderByIds(ids: number[]): Promise<ProductType[]> {
  const idsList = ids.join(', ');

  const rows = (await query_MySql(`
    SELECT * FROM products WHERE id IN (${idsList}) FOR UPDATE;
  `)) as ProductType[];

  return rows;
}

export async function actionSetOrder(d: OrderType, productsOrder: ProductOrder[]) {
  const productsOrderJson = JSON.stringify(productsOrder);
  const query = `INSERT INTO orders (address, floor, intercom, name, receive, tel, products)
   VALUES (?, ?, ?, ?, ?, ?,?)`;
  try {
    await query_MySql(query, [
      d.address,
      d.floor,
      d.intercom,
      d.name,
      d.receive,
      d.tel,
      productsOrderJson,
    ]);
    const rows: any = await query_MySql(`SELECT LAST_INSERT_ID() as id`);

    if (rows[0]?.id > 0) {
      return { status: true, insertedId: rows[0].id };
    } else {
      return { status: false, message: 'Ошибка вставки данных.' };
    }
  } catch (error) {
    console.error('Ошибка выполнения запроса:', error);
    return { status: false, message: 'Произошла ошибка.' };
  }
}

export async function deleteOrder(orderId: number) {
  const query = `DELETE FROM orders WHERE id = ?`;

  try {
    const result = await query_MySql(query, [orderId]);

    if ((result as any).affectedRows > 0) {
      return { status: true, message: 'Заказ успешно удален.' };
    } else {
      return { status: false, message: 'Заказ не найден.' };
    }
  } catch (error) {
    console.error('Ошибка удаления заказа:', error);
    return { status: false, message: 'Ошибка при удалении заказа.' };
  }
}

export async function getOrder() {
  const rows = (await query_MySql(`SELECT * FROM  orders`)) as OrderType[];
  console.log(rows);

  return rows;
}

export async function deleteProduct(id: number) {
  try {
    //удаления изображения
    const resultProduct = await getProduct(id);
    const deleteImg = await deleteImage(resultProduct[0].img);
    if (!deleteImg) {
      return { status: false, message: 'Ошибка при удалении' };
    }
    //удаляем запись
    const query = `DELETE FROM products WHERE id = ?`;
    const result = await query_MySql(query, [id]);

    if ((result as any).affectedRows > 0) {
      return { status: true, message: 'Заказ успешно удален.' };
    } else {
      return { status: false, message: 'Заказ не найден.' };
    }
  } catch (error) {
    console.error('Ошибка удаления продукта:', error);
    return { status: false, message: 'Ошибка при удалении продукта.' };
  }
}

export async function isProductExists(id: number): Promise<boolean> {
  const rows = (await query_MySql(`SELECT 1 FROM products WHERE id = ${id} LIMIT 1`)) as any[];

  return rows.length > 0;
}
export async function updateProduct(id: number, d: ProductFormData) {
  const query = `
    UPDATE products
    SET title =?, descriptions =?, weight=?, calories=?, price=?, structure=?, category=?, img=?
    WHERE id = ?
  `;

  const values = [
    d.title,
    d.description,
    d.weight,
    d.calories,
    d.price,
    d.structure,
    d.category,
    d.img,
    id, // id для поиска строки
  ];

  const result: any = await query_MySql(query, values);

  // Проверка, были ли изменены строки
  if (result.affectedRows > 0) {
    return { status: true, message: 'Product updated successfully' };
  } else {
    return { status: false, message: 'Product not found or no changes made' };
  }
}
