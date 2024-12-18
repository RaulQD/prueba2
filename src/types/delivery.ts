export type Delivery = {
  id: number;
  distance: number;
  discount: number;
  discountPercent: number;
  costInDollars: number;
  costInSoles: number;
}

export type DeliveryForm = Pick<Delivery, 'distance'>;