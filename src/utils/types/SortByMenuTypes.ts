export enum SortByTypes {
  NEWEST = 'Newest',
  OLDEST = 'Oldest',
  PRICEHIGH = 'Price highest',
  PRICELOW = 'Price lowest',
}

export type PaginationOptions = '16' | '32' | 'All';

export type SortMenuType = {
  sort: SortByTypes;
  pagination: PaginationOptions;
};
