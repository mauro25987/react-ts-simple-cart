export type Id = number

export interface GrocerieItem {
  id: Id
  name: string
  unitPrice: number
}

export interface CartItem extends GrocerieItem {
  quantity: number
}
