import { z } from 'zod';

// Auth Validation Schemas
export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});

// User Validation Schemas
export const updateUserSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  avatar: z.string().optional(),
});

// Subscription Validation Schemas
export const createSubscriptionSchema = z.object({
  plan: z.enum(['BASIC', 'PRO', 'ENTERPRISE']),
  billingCycle: z.enum(['MONTHLY', 'ANNUAL']),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
});

export const updateSubscriptionSchema = z.object({
  status: z.enum(['ACTIVE', 'CANCELED', 'EXPIRED', 'PAUSED']).optional(),
  endDate: z.string().datetime().optional(),
});

// Invoice Validation Schemas
export const createInvoiceSchema = z.object({
  subscriptionId: z.string().min(1, 'Subscription ID is required'),
  amount: z.number().positive('Amount must be positive'),
  status: z.enum(['DRAFT', 'SENT', 'PAID', 'OVERDUE', 'CANCELED', 'REFUNDED']).optional(),
  issuedDate: z.string().datetime(),
  dueDate: z.string().datetime(),
  items: z.string(), // JSON string
});

export const updateInvoiceSchema = z.object({
  status: z.enum(['DRAFT', 'SENT', 'PAID', 'OVERDUE', 'CANCELED', 'REFUNDED']).optional(),
  dueDate: z.string().datetime().optional(),
});

// Customer Validation Schemas
export const createCustomerSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  country: z.string().optional(),
});

export const updateCustomerSchema = z.object({
  companyName: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  country: z.string().optional(),
});

// Pagination Validation Schema
export const paginationSchema = z.object({
  page: z.string().transform(Number).pipe(z.number().min(1)).optional(),
  limit: z.string().transform(Number).pipe(z.number().min(1).max(100)).optional(),
  search: z.string().optional(),
});

// Export types from schemas
export type RegisterRequest = z.infer<typeof registerSchema>;
export type LoginRequest = z.infer<typeof loginSchema>;
export type RefreshTokenRequest = z.infer<typeof refreshTokenSchema>;
export type CreateSubscriptionRequest = z.infer<typeof createSubscriptionSchema>;
export type UpdateSubscriptionRequest = z.infer<typeof updateSubscriptionSchema>;
export type CreateInvoiceRequest = z.infer<typeof createInvoiceSchema>;
export type UpdateInvoiceRequest = z.infer<typeof updateInvoiceSchema>;
export type CreateCustomerRequest = z.infer<typeof createCustomerSchema>;
export type UpdateCustomerRequest = z.infer<typeof updateCustomerSchema>;
export type PaginationParams = z.infer<typeof paginationSchema>;
