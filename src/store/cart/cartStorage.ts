import type { CartItem } from "./cartSlice";

export const getCartKey = (userId: number) => {
  return `cart_${userId}`;
};

export const loadCart = (
  userId: number
): CartItem[] => {
  const savedCart = localStorage.getItem(
    getCartKey(userId)
  );

  if (!savedCart) {
    return [];
  }

  try {
    return JSON.parse(savedCart);
  } catch {
    return [];
  }
};

export const saveCart = (
  userId: number,
  items: CartItem[]
) => {
  localStorage.setItem(
    getCartKey(userId),
    JSON.stringify(items)
  );
};