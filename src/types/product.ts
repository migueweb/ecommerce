export interface Product {
  
  id: number
  sku: string
  name: string
  brand: string
  quantity: number
  price: number
  isActive: boolean
  category: string
  image_url: string
  createdAt: Date

  tags?: string[]
  dimensions?: { width: number; height: number; depth?: number }
  description?: string
}