export type KpiGrowthType = {
    value: number;
    name: string | number;
    createdAt: string;
    updatedAt: string;
  };

  export type KpiStatType = {
    name: string;
    value: string | number;
    createdAt?: string;
    statGrowth?: string | number;
    oldestValue: string | number;
    items: KpiGrowthType[];
  };
  
  export type KpiType = {
    id: string;
    name: string;
    type: string;
    value: number;
    createdAt: string;
    updatedAt: string;
  };