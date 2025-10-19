import type { Item } from "./items";
import { items } from "./items";

export interface Donor {
  id: string;
  name: string;
  dedication?: string;
  itemId: string;
  amount: number;
  public: boolean;
  createdAt: string;
}

export const donors: Donor[] = items
  .filter(item => item.donorName)
  .map((item, index) => ({
    id: String(index + 1),
    name: item.donorName ?? "", // filtered so defined
    dedication: item.dedication,
    itemId: item.id,
    amount: item.price,
    public: item.public ?? true,
    createdAt: new Date(Date.now() - index * 86400000).toISOString()
  }));

export function addDonor(donor: Donor) {
  donors.push(donor);
}

export function updateItem(itemId: string, updater: (item: Item) => Item) {
  const index = items.findIndex(item => item.id === itemId);
  if (index >= 0) {
    items[index] = updater(items[index]);
  }
}
