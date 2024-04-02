"use client";
import { Card, LineChart, Metric, Text, Title } from "@tremor/react";
import DashboardHeader from "./DashboardHeader";
import { useEffect, useState } from "react";
import {
  KpiGrowthType,
  KpiStatType,
  KpiType,
} from "@/interfaces/dashboardTypes";
import { getSuperAdminKpis } from "@/actions/superAdmin/superAdminDashboardModule/get-superadmin-kpis";
 
 
const DashboardClientComponent = () => {
  const times = [
    { name: "Last week", value: 7 },
    { name: "Last month", value: 30 },
    { name: "Last 3 months", value: 90 },
    { name: "Last 6 months", value: 180 },
    { name: "Last year", value: 365 },
  ];
  const [timeSelected, setTimeSelected] = useState(times[0]);
  const [statsCount, setStatsCount] = useState<KpiStatType[]>([]);
 

  useEffect(() => {
    getSuperAdminKpis({
      args: {
        period: timeSelected.value,
      },
    })
      .then((data) => {
        if (!data) return;
        const kpisCounts: KpiType[] = (data as KpiType[]).filter(
          (item: KpiType) => item.type === "counts"
        );

        if (kpisCounts.length > 0) {
          const uniqueNames: string[] = [
            ...(new Set(kpisCounts.map((item) => item.name)) as any),
          ];

          const kpisCountsDistinctWithVariation: KpiStatType[] =
            uniqueNames.map((name) => {
              const items: KpiGrowthType[] = kpisCounts.filter(
                (item) => item.name === name
              );

              items.sort(
                (a, b) =>
                  new Date(a.createdAt).getTime() -
                  new Date(b.createdAt).getTime()
              );

              const oldestValue = items[items.length - 1].value;
              const latestValue = items[0].value;
              const value = oldestValue - latestValue;

              return { name, items, value, oldestValue };
            });

          setStatsCount(kpisCountsDistinctWithVariation);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [timeSelected]);

  const parseStatName = (name: string) => {
    const nameSplitted = name.split("_");
    const nameParsed = nameSplitted.map(
      (item) => item.charAt(0).toUpperCase() + item.slice(1)
    );
    return nameParsed.join(" ");
  };


  return (
    <main>
      <DashboardHeader />

      <div>
        <div className="mt-5 grid grid-cols-3 gap-5 sm:grid-cols-5">
          {times.map((time, index) => (
            <button
              key={`time-${index}`}
              onClick={() => {
                setTimeSelected(time);
              }}
              className={`${
                timeSelected.name === time.name
                  ? "btn-main"
                  : "btn-outline-main"
              }`}
            >
              <span className="text-primary">{time.name}</span>
            </button>
          ))}
        </div>
        <div className="max-w-8xl  p-3  mb-56">
          <div>
            <h3 className="text-title text-primary">Variations</h3>
            <div></div>
            <dl className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-5 lg:grid-cols-4">
              {statsCount.map((stat: KpiStatType) => (
                <Card key={`stat1-${stat.name}`} className="max-w-xs  ">
                  <Text>{parseStatName(stat.name)}</Text>
                  <Metric> {stat.value}</Metric>
                </Card>
              ))}
            </dl>
          </div>

          <h3 className="text-title text-primary mt-3">Growth</h3>

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {statsCount.map((statGrowth: KpiStatType, index: number) => {
              const data = statGrowth.items.map((item: KpiGrowthType) => {
                return {
                  day: item.createdAt,
                  [statGrowth.statGrowth ?? ""]: item.value,
                };
              });

              return (
                <Card key={`stat2-${statGrowth.name}`}>
                  <Title className="text-title text-primary">
                    Total: {statGrowth.oldestValue}
                  </Title>
                  <LineChart
                    key={index}
                    className="mt-6"
                    data={data}
                    index="day"
                    categories={Object.keys(data[0]).slice(1)}
                  />
                  <div className="flex my-3 capitalize text bg-main p-3">
                    <span className="text-title text-primary">
                      {" "}
                      {parseStatName(statGrowth.name)}
                    </span>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardClientComponent;
