import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  // Получаем название файла из URL параметров
  const { searchParams } = new URL(request.url);
  const file = searchParams.get('file');

  if (!file) {
    return NextResponse.json({ error: 'Файла отсутствует' }, { status: 400 });
  }

  // Путь до файла
  const filePath = path.join(process.cwd(), 'public/products', file);

  // Проверяем, существует ли файл
  if (fs.existsSync(filePath)) {
    const imageBuffer = fs.readFileSync(filePath);
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
      },
    });
  }

  // Если файл не найден, возвращаем ошибку
  return NextResponse.json({ error: 'File not found' }, { status: 404 });
}
