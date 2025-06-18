import { useSearchParams } from 'next/navigation';
import React from 'react';

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

interface QueryFilters extends PriceProps {
  shaurmaTypes: string;
  sizes: string;
}

export interface Filters {
  sizes: Set<string>;
  shaurmaTypes: Set<string>;
  prices: PriceProps;
}

interface ReturnProps extends Filters {
  setPrices: (name: keyof PriceProps, value: number) => void;
  setShaurmaTypes: (value: string) => void;
  setSizes: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;

  const [sizes, setSizes] = React.useState<Set<string>>(
    new Set<string>(searchParams.has('sizes') ? searchParams.get('sizes')?.split(',') : []),
  );

  const [shaurmaTypes, setShaurmaTypes] = React.useState<Set<string>>(
    new Set<string>(
      searchParams.has('shaurmaTypes') ? searchParams.get('shaurmaTypes')?.split(',') : [],
    ),
  );

  const [prices, setPrices] = React.useState<PriceProps>({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined,
  });

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrices((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateShaurmaTypes = (value: string) => {
    setShaurmaTypes(new Set([value]));
  };

  const updateSizes = (value: string) => {
    setSizes(new Set([value]));
  };

  return React.useMemo(
    () => ({
      sizes,
      shaurmaTypes,
      prices,
      setPrices: updatePrice,
      setShaurmaTypes: updateShaurmaTypes,
      setSizes: updateSizes,
    }),
    [sizes, shaurmaTypes, prices],
  );
};
