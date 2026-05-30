export type OrderStatus = "paid" | "cancelled";

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  paid: "주문완료",
  cancelled: "주문취소",
};

export interface OrderItem {
  id: string;
  productId: string | null;
  name: string;
  unitPrice: number;
  quantity: number;
}

export interface Order {
  id: string;
  recipientName: string;
  recipientPhone: string;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  items: OrderItem[];
}
