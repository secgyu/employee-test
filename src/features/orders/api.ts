import { createClient } from "@/src/lib/supabase/server";
import type { Order, OrderStatus } from "@/src/features/orders/types";

interface OrderRow {
  id: string;
  recipient_name: string;
  recipient_phone: string;
  total_amount: number;
  status: OrderStatus;
  created_at: string;
  order_items: {
    id: string;
    product_id: string | null;
    name: string;
    unit_price: number;
    quantity: number;
  }[];
}

const ORDER_SELECT =
  "id, recipient_name, recipient_phone, total_amount, status, created_at, order_items(id, product_id, name, unit_price, quantity)";

/** 현재 로그인 사용자의 주문 내역 (최신순). 미로그인 시 빈 배열. */
export async function getOrders(): Promise<Order[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from("orders")
    .select(ORDER_SELECT)
    .order("created_at", { ascending: false });

  const rows = (data as OrderRow[] | null) ?? [];
  return rows.map((row) => ({
    id: row.id,
    recipientName: row.recipient_name,
    recipientPhone: row.recipient_phone,
    totalAmount: row.total_amount,
    status: row.status,
    createdAt: row.created_at,
    items: row.order_items.map((item) => ({
      id: item.id,
      productId: item.product_id,
      name: item.name,
      unitPrice: item.unit_price,
      quantity: item.quantity,
    })),
  }));
}
