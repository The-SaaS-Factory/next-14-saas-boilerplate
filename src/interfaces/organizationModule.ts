import { PlanType } from "./billingModule";

 
export type OrganizationType = {
  id?: number;
  name: string;
  email?: string;
  avatar?: string;
  Membership?: OrganizationMembershipType;
};

export type OrganizationMembershipType = {
  id: string;
  endDate: string;
  plan: PlanType;
};
