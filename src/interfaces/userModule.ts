export type UserType = {
  id?: number;
  email?: string | null;
  avatar?: string | null;
  name?: string | null;
  phone?: string | null;
  country?: string | null;
  city?: string | null;
  state?: string | null;
  Membership?: UserMembershipType[] | null;
};

export type UserMembershipType = {
  id: number;
  endDate: string | null;
  plan: UserMembershipPlanType | null;
};

export type UserMembershipPlanType = {
  id: number;
  name: string;
  price: number;
  status: string;
  oldPrice: number | null;
  type: string;
  settings: PlanSettings[];
  PlanCapabilities: UserMembershipPlanCapabilitieType[];
};

export type PlanSettings = {
  settingName: string;
  settingValue: string;
};

export type UserMembershipPlanCapabilitieType = {
  id: number;
  name: string;
  type: string;
  capabilitieId: string;
  count: string | number;
  capabilitie: PlanCapabilitieType;
};

export type PlanCapabilitieType = {
  id: number;
  name: string;
  description: string;
  type: string;
};
