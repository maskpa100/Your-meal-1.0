'use server';
import fs from 'fs';
import path from 'path';

// Функция для сохранения изображения
export const saveBase64Image = (base64Data: string): Promise<string | undefined> => {
  // Название файла текущее время
  const currentDate: Date = new Date();
  const formattedDate: string = currentDate
    .toISOString()
    .replace('T', '_')
    .split('.')[0]
    .replace(/:/g, '-');

  const fileName = `${formattedDate}.png`;
  const filePath = path.join('./public/products/', fileName);

  return new Promise((resolve) => {
    // Извлечение данных из base64 строки
    const base64Image = base64Data.split(';base64,').pop();

    if (!base64Image) {
      console.error('Некорректные данные Base64.');
      return resolve(undefined);
    }

    // Запись данных в файл
    fs.writeFile(filePath, base64Image, { encoding: 'base64' }, (err) => {
      if (err) {
        console.error('Ошибка при записи файла:', err);
        return resolve(undefined);
      }

      // Возвращаем название файла
      resolve(fileName);
    });
  });
};
