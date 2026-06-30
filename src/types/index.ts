export type Role = 'ADMIN' | 'RESELLER' | 'AFFILIATE' | 'CUSTOMER';
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'BANNED';
export type TransactionType = 'PURCHASE' | 'WITHDRAWAL';
export type TransactionStatus = 'PENDING' | 'PROCESSING' | 'SUCCESS' | 'FAILED' | 'CANCELLED';
export type PaymentMethod = 'MANUAL_TRANSFER' | 'QRIS' | 'E_WALLET' | 'CREDIT_CARD' | 'BANK_TRANSFER';
export type DepositStatus = 'PENDING' | 'VERIFIED' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
export type CommissionType = 'RESELLER' | 'AFFILIATE' | 'REFERRAL';
export type CommissionStatus = 'PENDING' | 'APPROVED' | 'WITHDRAWN' | 'CANCELLED';
export type NotificationType = 'TRANSACTION' | 'DEPOSIT' | 'COMMISSION' | 'SYSTEM' | 'PROMOTION' | 'ACCOUNT';
export type DiscountType = 'PERCENTAGE' | 'FIXED';

export interface IUser {
  id: string;
  email: string;
  name: string;
  role: Role;
  status: UserStatus;
  isVerified: boolean;
  profileImage?: string;
  createdAt: Date;
}

export interface ITransaction {
  id: string;
  transactionNumber: string;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  paymentMethod: PaymentMethod;
  createdAt: Date;
}

export interface IDeposit {
  id: string;
  depositNumber: string;
  amount: number;
  status: DepositStatus;
  paymentMethod: PaymentMethod;
  createdAt: Date;
}

export interface ICommission {
  id: string;
  amount: number;
  type: CommissionType;
  status: CommissionStatus;
  createdAt: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  statusCode: number;
}
