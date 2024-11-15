import { getOrder } from '@/app/actions';
import ClientOrders from './clientOrder';
import { unstable_noStore } from 'next/cache';

export default async function OrdersPage() {
  unstable_noStore();
  const data = await getOrder();
  return <ClientOrders ServerOrders={data} />;
}
