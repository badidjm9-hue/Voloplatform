'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { Cart, CartItem, Hotel, Room } from '@/types'
import { useAuth } from './AuthContext'
import toast from 'react-hot-toast'

interface CartContextType {
  cart: Cart
  addItem: (hotel: Hotel, room: Room, checkInDate: Date, checkOutDate: Date, guests: number, rooms: number) => void
  removeItem: (itemId: string) => void
  updateItem: (itemId: string, updates: Partial<CartItem>) => void
  clearCart: () => void
  getItemCount: () => number
  isEmpty: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>({
    items: [],
    subtotal: 0,
    taxes: 0,
    fees: 0,
    total: 0,
    currency: 'USD',
    updatedAt: new Date(),
  })
  const { user } = useAuth()

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        // Convert date strings back to Date objects
        parsedCart.items = parsedCart.items.map((item: any) => ({
          ...item,
          checkInDate: new Date(item.checkInDate),
          checkOutDate: new Date(item.checkOutDate),
        }))
        setCart(parsedCart)
      } catch (error) {
        console.error('Error parsing saved cart:', error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const calculateTotals = (items: CartItem[]): Pick<Cart, 'subtotal' | 'taxes' | 'fees' | 'total'> => {
    const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0)
    const taxes = subtotal * 0.1 // 10% tax
    const fees = items.reduce((sum, item) => sum + (item.fees || 0), 0)
    const total = subtotal + taxes + fees
    
    return { subtotal, taxes, fees, total }
  }

  const addItem = (
    hotel: Hotel, 
    room: Room, 
    checkInDate: Date, 
    checkOutDate: Date, 
    guests: number, 
    rooms: number
  ) => {
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))
    
    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(item => 
      item.room.id === room.id && 
      item.checkInDate.getTime() === checkInDate.getTime() &&
      item.checkOutDate.getTime() === checkOutDate.getTime()
    )

    if (existingItemIndex !== -1) {
      // Update existing item
      const updatedItems = [...cart.items]
      const existingItem = updatedItems[existingItemIndex]
      
      updatedItems[existingItemIndex] = {
        ...existingItem,
        rooms: existingItem.rooms + rooms,
        totalPrice: (existingItem.totalPrice / existingItem.rooms) * (existingItem.rooms + rooms),
        taxes: (existingItem.taxes / existingItem.rooms) * (existingItem.rooms + rooms),
        fees: (existingItem.fees / existingItem.rooms) * (existingItem.rooms + rooms),
        grandTotal: (existingItem.grandTotal / existingItem.rooms) * (existingItem.rooms + rooms),
      }

      const totals = calculateTotals(updatedItems)
      setCart({
        ...cart,
        items: updatedItems,
        ...totals,
        updatedAt: new Date(),
      })
      
      toast.success('Updated booking quantity!')
    } else {
      // Add new item
      const basePrice = room.basePrice * nights * rooms
      const taxes = basePrice * 0.1
      const fees = (room.serviceFee || 0) * nights * rooms
      const grandTotal = basePrice + taxes + fees

      const newItem: CartItem = {
        id: `${room.id}-${checkInDate.getTime()}`,
        hotel,
        room,
        checkInDate,
        checkOutDate,
        nights,
        rooms,
        guests,
        totalPrice: basePrice,
        taxes,
        fees,
        grandTotal,
        currency: room.currency,
      }

      const updatedItems = [...cart.items, newItem]
      const totals = calculateTotals(updatedItems)
      
      setCart({
        ...cart,
        items: updatedItems,
        ...totals,
        updatedAt: new Date(),
      })
      
      toast.success('Added to cart!')
    }
  }

  const removeItem = (itemId: string) => {
    const updatedItems = cart.items.filter(item => item.id !== itemId)
    const totals = calculateTotals(updatedItems)
    
    setCart({
      ...cart,
      items: updatedItems,
      ...totals,
      updatedAt: new Date(),
    })
    
    toast.success('Removed from cart!')
  }

  const updateItem = (itemId: string, updates: Partial<CartItem>) => {
    const updatedItems = cart.items.map(item => {
      if (item.id === itemId) {
        return { ...item, ...updates }
      }
      return item
    })
    
    const totals = calculateTotals(updatedItems)
    setCart({
      ...cart,
      items: updatedItems,
      ...totals,
      updatedAt: new Date(),
    })
  }

  const clearCart = () => {
    setCart({
      items: [],
      subtotal: 0,
      taxes: 0,
      fees: 0,
      total: 0,
      currency: 'USD',
      updatedAt: new Date(),
    })
    toast.success('Cart cleared!')
  }

  const getItemCount = () => {
    return cart.items.reduce((total, item) => total + item.rooms, 0)
  }

  const value: CartContextType = {
    cart,
    addItem,
    removeItem,
    updateItem,
    clearCart,
    getItemCount,
    isEmpty: cart.items.length === 0,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

// Hook for cart synchronization with user account
export function useCartSync() {
  const { user } = useAuth()
  const { cart } = useCart()

  // Save cart to user account when user logs in
  useEffect(() => {
    if (user && cart.items.length > 0) {
      // Here you would typically save the cart to the user's account
      // For now, we'll just keep it in localStorage
      console.log('User logged in, cart synced')
    }
  }, [user, cart.items])

  return { cart }
}