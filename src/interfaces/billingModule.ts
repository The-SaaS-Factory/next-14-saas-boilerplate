import { OrganizationType } from "./organizationModule";
import { UserType } from "./userModule";

export interface IInvoice {
  id: number;
  type: string;
  status: string;
  userId: number | null;
  currencyId: number;
  userCustomerExternalId: string | null;
  membershipId: number | null;
  gateway: string | null;
  gatewayId: string | null;
  details: string | null;
  invoiceUrl: string | null;
  invoicePdfUrl: string | null;
  subscriptionExternalId: string | null;
  paidAt: Date | null;
  dueAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  user?: UserType | null;
  Membership?: MembershipType | null;
  Currency?: CurrencyType;
  Items?: InvoiceItemType[];
  coupons?: ICoupon[];
}

export interface InvoiceItemType {
  id: number;
  invoiceId: number;
  name: string;
  description: string | null;
  modelType: string | null;
  modelId: number | null;
  images: string | null;
  quantity: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  Invoice?: IInvoice;
}

export type SettingType = {
  id: number;
  userId: number | null;
  settingName: String;
  settingValue: number | String;
};

export interface PricingSettingType {
  id: number;
  settingName: string;
  settingValue: number | string;
  createdAt: Date;
  updatedAt: Date;
  Pricing?: IPricing;
  pricingId?: number | null;
}

export interface PlanType {
  id: number;
  name: string;
  freeTrialDays: number | null;
  stripeProductId: string | null;
  status: string;
  description: string | null;
  PlanCapabilities?: PlanCapabilityType[];
  pricing?: IPricing[] | null;
}

export interface IPricing {
  id: number;
  frequency: string;
  status: string;
  price: number;
  oldPrice: number | null;
  createdAt: Date;
  updatedAt: Date;
  planId: number | null;
  serviceId: number | null;
  settings?: PricingSettingType[] | null;
}

export interface PlanCapabilityType {
  id: number;
  capabilitieId: number;
  planId: number;
  count: number;
  name: string | null;
  plan?: PlanType;
  capabilitie?: CapabilitieType;
}

export interface CapabilitieType {
  id: number;
  name: string;
  description: string | null;
  type: string;
}
export interface CurrencyType {
  id: number;
  name: string;
  rate: number;
  code: string;
}

export type MembershipType = {
  id: number;
  user?: UserType | null;
  endDate: Date;
  plan: PlanType;
  invoice?: IInvoice | null;
  startDate: Date;
  organization?: OrganizationType | null;
};

export type ICoupon = {
  id: number;
  name: string;
  amountOff: number | null;
  duration: string;
  status: string;
  code: string;
  durationInMonths: number | null;
  maxRedemptions: number | null;
  percentOff: number | null;
  user?: UserType | null;
  createdAt: Date;
  updatedAt: Date;
  settings?: CouponSettingType[] | null;
  invoices?: IInvoice[] | null;
};

export type CouponSettingType = {
  id: number;
  couponId: number;
  name: string;
  value: string;
  createdAt: Date;
  updatedAt: Date;
  Coupon?: ICoupon;
};
