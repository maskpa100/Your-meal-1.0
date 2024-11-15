'use server';
import fs from 'fs';
import path from 'path';

// Функция для удаления изображения
export const deleteImage = (fileName: string): Promise<boolean> => {
  const filePath = path.join('./public/products/', fileName);

  return new Promise((resolve) => {
    // Проверка существования файла перед удалением
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        console.error('Файл не существует или недоступен:', filePath);
        return resolve(false);
      }

      // Удаление файла
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Ошибка при удалении файла:', err);
          return resolve(false);
        }

        // Успешное удаление
        resolve(true);
      });
    });
  });
};
