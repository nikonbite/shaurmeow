import React from "react";
import { WhiteBlock } from "./white-block";
import { CheckoutItemDetails } from "./checkout-item-details";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { Button, Skeleton } from "../ui";
import { cn } from "@/shared/lib/utils";

const VAT = 15;
const DELIVERY_PRICE = 250;

interface Props {
  totalAmount: number;
  loading?: boolean;
  className?: string;
}

export const CheckoutSidebar: React.FC<Props> = ({
  totalAmount,
  loading,
  className,
}) => {
  const vatPrice = (totalAmount * VAT) / 100;
  const totalPrice = totalAmount + DELIVERY_PRICE + vatPrice;

  return (
    <WhiteBlock className={cn("p-4 sm:p-5 md:p-6 lg:sticky lg:top-4", className)}>
      <div className="flex flex-col gap-1">
        <span className="text-lg sm:text-xl">Итого:</span>
        {loading ? (
          <Skeleton className="h-8 sm:h-9 md:h-11 w-36 sm:w-40 md:w-48" />
        ) : (
          <span className="h-8 sm:h-9 md:h-11 text-2xl sm:text-3xl md:text-[34px] font-extrabold">
            {totalPrice} ₽
          </span>
        )}
      </div>

      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Package size={16} className="mr-2 text-gray-400" />
            <span className="text-sm sm:text-base">Стоимость корзины:</span>
          </div>
        }
        value={
          loading ? (
            <Skeleton className="h-5 sm:h-6 w-14 sm:w-16 rounded-[6px]" />
          ) : (
            <span className="text-sm sm:text-base">{totalAmount} ₽</span>
          )
        }
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Percent size={16} className="mr-2 text-gray-400" />
            <span className="text-sm sm:text-base">Налоги:</span>
          </div>
        }
        value={
          loading ? (
            <Skeleton className="h-5 sm:h-6 w-14 sm:w-16 rounded-[6px]" />
          ) : (
            <span className="text-sm sm:text-base">{vatPrice} ₽</span>
          )
        }
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Truck size={16} className="mr-2 text-gray-400" />
            <span className="text-sm sm:text-base">Доставка:</span>
          </div>
        }
        value={
          loading ? (
            <Skeleton className="h-5 sm:h-6 w-14 sm:w-16 rounded-[6px]" />
          ) : (
            <span className="text-sm sm:text-base">{DELIVERY_PRICE} ₽</span>
          )
        }
      />

      <Button
        loading={loading}
        type="submit"
        className="w-full h-12 sm:h-13 md:h-14 rounded-xl sm:rounded-2xl mt-4 sm:mt-5 md:mt-6 text-sm sm:text-base font-bold"
      >
        Оформить заказ
        <ArrowRight className="w-4 sm:w-5 ml-1 sm:ml-2" />
      </Button>
    </WhiteBlock>
  );
};
