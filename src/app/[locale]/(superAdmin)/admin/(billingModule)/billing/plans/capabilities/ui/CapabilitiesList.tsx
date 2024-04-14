import NotFound from "@/components/layouts/errors/NotFound";
import TableLoaderSkeleton from "@/components/ui/loaders/TableLoaderSkeleton";
import { Suspense } from "react";
import Link from "next/link";
import { Capabilitie } from "@prisma/client";
import { getAllCapabilities } from "@/actions/superAdmin/superAdminBillingModule/get-all-capabilities";
import DeleteModel from "@/components/core/DeleteModel";
import { deleteCapabilitie } from "@/actions/superAdmin/superAdminBillingModule/delete-capacitie";

const CapabilitiesList = async () => {
  const data = await getAllCapabilities();

  return (
    <div>
      <Suspense fallback={<TableLoaderSkeleton count={10} />}>
        {data.length === 0 ? (
          <div className="flex justify-center w-full items-center h-96">
            <NotFound message="No users found" />
          </div>
        ) : (
          <div className=" ">
            <div className="mt-8 flow-root">
              <div className="  -my-2 overflow-x-auto ">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full  divide-y divide-gray-300 text-primary">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold   sm:pl-0"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold   sm:pl-0"
                        >
                          Type
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold   sm:pl-0"
                        >
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y    divide-gray-200 bg-main text-primary">
                      {data?.map((capabilitie: Capabilitie) => (
                        <tr key={capabilitie.id}>
                          <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                            <div className=" ">{capabilitie.name}</div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-5 text-sm  ">
                            <div className=" ">{capabilitie.type}</div>
                          </td>
                          <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                            <div className=" ">{capabilitie.description}</div>
                          </td>

                          <td className="relative flex items-center space-x-3 py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                            <DeleteModel
                              modelId={capabilitie.id}
                              deleteAction={deleteCapabilitie}
                            />

                            <Link
                              href={`capabilities/edit/${capabilitie.id}`}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Edit
                              <span className="sr-only">,</span>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default CapabilitiesList;
