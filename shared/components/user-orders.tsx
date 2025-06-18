'use client';

import React, { useState } from 'react';
import { Order } from '@prisma/client';
import { BadgeCheck, Clock, Package } from 'lucide-react';

interface Props {
  orders: Order[];
}

const UserOrders: React.FC<Props> = ({ orders }) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleOrderClick = (order: Order) => {
    console.log(typeof order.items);
    console.log(Array.isArray(order.items));
    console.log(order.items);

    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {orders.map((order) => (
        <div
          key={order.id}
          className="relative bg-gradient-to-br from-primary/20 to-card rounded-2xl p-[2px] shadow-lg border border-border/50 cursor-pointer transition hover:shadow-xl hover:border-primary/40 group"
          onClick={() => handleOrderClick(order)}
        >
          <div className="bg-card rounded-2xl p-5 h-full flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-1">
              <Package size={20} className="text-primary" />
              <h3 className="text-xl font-extrabold tracking-wide">#{order.id}</h3>
              <span className="ml-auto flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full"
                style={{ background: order.status === 'PENDING' ? 'rgba(251,191,36,0.12)' : 'rgba(34,197,94,0.12)' }}>
                {order.status === 'PENDING' ? <Clock size={16} className="text-yellow-500" /> : <BadgeCheck size={16} className="text-green-500" />}
                {order.status === 'PENDING' ? 'В процессе' : 'Завершен'}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Дата: <span className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</span></p>
            <p className="text-lg font-bold text-primary">{order.totalAmount} ₽</p>
          </div>
        </div>
      ))}

      {selectedOrder && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/70 z-50 flex items-center justify-center animate-fade-in">
          <div className="bg-gradient-to-br from-primary/20 to-card rounded-2xl p-[2px] shadow-2xl border border-border/50 w-full max-w-md relative">
            <div className="bg-card text-foreground rounded-2xl p-6 relative">
              <button onClick={handleCloseModal} className="absolute right-4 top-4 text-muted-foreground hover:text-primary text-2xl font-bold">×</button>
              <div className="flex items-center gap-2 mb-2">
                <Package size={20} className="text-primary" />
                <h3 className="text-xl font-extrabold tracking-wide">#{selectedOrder.id}</h3>
                <span className="ml-auto flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full"
                  style={{ background: selectedOrder.status === 'PENDING' ? 'rgba(251,191,36,0.12)' : 'rgba(34,197,94,0.12)' }}>
                  {selectedOrder.status === 'PENDING' ? <Clock size={16} className="text-yellow-500" /> : <BadgeCheck size={16} className="text-green-500" />}
                  {selectedOrder.status === 'PENDING' ? 'В процессе' : 'Завершен'}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">Дата: <span className="font-medium">{new Date(selectedOrder.createdAt).toLocaleDateString()}</span></p>
              <p className="text-lg font-bold text-primary mb-2">{selectedOrder.totalAmount} ₽</p>
              <h4 className="text-md font-semibold mt-4 mb-2">Товары:</h4>
              <ul className="mb-2 flex flex-col gap-1">
                {typeof selectedOrder.items === 'string' ? (
                  JSON.parse(selectedOrder.items).map((item: any) => (
                    <li key={item.id} className="flex items-center gap-2 text-muted-foreground">
                      <span className="inline-block w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                        {item.productItem.product.name[0]}
                      </span>
                      <span>{item.productItem.product.name}</span>
                      <span className="ml-auto text-xs text-foreground/70">{item.quantity} шт.</span>
                    </li>
                  ))
                ) : (
                  <li className="text-muted-foreground italic">Нет данных о товарах</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserOrders;
