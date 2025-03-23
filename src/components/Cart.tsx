import { useState } from 'react'
import type { CartItem, GrocerieItem, Id } from '../lib/definitions'
import { groceries } from '../lib/groceries'
import Grocerie from './Grocerie'

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>([])

  const handleAddCart = (grocerie: GrocerieItem) => {
    const findGrocerie = cart.find(item => item.id === grocerie.id)
    if (findGrocerie) {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === grocerie.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      )
    } else {
      setCart(cart => [...cart, { ...grocerie, quantity: 1 }])
    }
  }

  const handleDelCart = (id: Id) => {
    const item = cart.find(item => item.id === id)
    if (item && item.quantity > 1) {
      setCart(prevCart =>
        prevCart.map(item => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
      )
    } else {
      setCart(prevCart => prevCart.filter(item => item.id !== id))
    }
  }

  const totalPrice = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0)

  return (
    <div>
      <h1>Carrito de compras</h1>
      <div className="container">
        <div>
          <h2 className="title">Productos disponibles</h2>
          <ul className="list">
            {groceries.map(grocerie => (
              <Grocerie
                key={grocerie.id}
                onClick={() => handleAddCart(grocerie)}
                className="list-item"
              >
                <span>
                  {grocerie.name} - ${grocerie.unitPrice} c/u
                </span>
              </Grocerie>
            ))}
          </ul>
        </div>
        <div>
          {cart.length === 0 ? (
            <h2 className="title">Carrito vacio</h2>
          ) : (
            <>
              <h2 className="title">Productos agregados</h2>
              <ul className="list">
                {cart.map(({ id, name, unitPrice, quantity }) => (
                  <Grocerie key={id} onClick={() => handleDelCart(id)} className="list-item">
                    <span>
                      {name} - (cant: {quantity}) - ${unitPrice} c/u
                    </span>
                  </Grocerie>
                ))}
                <h2 className="title">Total Price: {totalPrice.toFixed(2)}</h2>
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
