import { ServerContent } from '@/components/Content/ServerContent';
import { list } from '@/data/NavList';
import { redirect } from 'next/navigation';

export default async function Home({ params }: { params: { category: string } }) {
  const selectedCategory = list.find((item) => item.url === params.category);

  if (selectedCategory) {
    return <ServerContent category={selectedCategory.url} />;
  } else {
    redirect('/404');
  }
}
