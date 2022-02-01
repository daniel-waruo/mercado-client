export interface Product {
  id?: number
  sku: string
  name: string
  image?:string
  category?: number
  brand?: number
  cost: number | string,
  price: number | string,
  inStock: number,
  categoryName?: string
}

export interface Customer {
  id?: number
  name: string | null
  phone: string | null
  email: string | null
  businessName: string | null
  location: string | null
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

export interface CustomerMetrics {
  totalCustomer: number
  avgCustomerRevenue: number
  conversionRate: number
}

export interface InventoryMetrics {
  totalCount: number
  inventoryValue: number
  expectedProfit: number
}

export interface CartProduct {
  product: Product,
  quantity: number
}
