export interface Product {
  id?: number,
  sku: string,
  name: string,
  category?: number
  brand?: number
  cost: number | string,
  price: number | string,
  inStock: number,
  categoryName?: string
}

export interface Customer {
  id?: number
  name: string
  phone: string
  email: string
  businessName: string
  location: string
  imageSrc?: string
}

export interface OrderItem {
  id: number
  order: number
  cost: number
  price: number
  product: Product
  quantity: number
}

export interface Order {
  id?: number
  buyer?: Customer
  channel: string
  created_at: string
  items: OrderItem[]
  payment_method: string
  payment_status: string
  status: 'fin' | 'prep' | 'ship' | 'can' | string
  total: number
}


export interface Metrics {
  totalSales: number
  totalCustomers: number
  totalProfits: number
  totalCost: number
  membersOnline: number
  todayRevenue: number
  totalRevenue: number
}


export interface DashboardMetrics {
  totalOrders: number
  avgOrderValue: number
  orderCancelRate: number
}
