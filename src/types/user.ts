export interface User {
  id: string
  fullName: string
  email: string
  isActive: boolean
  role: "admin" | "customer" | "seller"
  address: string
  createdAt: Date

  // Opcional fields
  tags?: string[]
  description?: string
}