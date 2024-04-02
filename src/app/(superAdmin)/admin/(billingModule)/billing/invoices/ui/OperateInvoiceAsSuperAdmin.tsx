"use client";
import { createInvoiceItemToInvoice } from "@/actions/superAdmin/superAdminBillingModule/create-invoice-item-to-invoice";
import { deleteInvoice } from "@/actions/superAdmin/superAdminBillingModule/delete-invoice";
import { makeInvoicePaid } from "@/actions/superAdmin/superAdminBillingModule/make-invoice-paid";
import DeleteModel from "@/components/core/DeleteModel";
import NewForm from "@/components/core/NewForm";
import { IInvoice } from "@/interfaces/billingModule";
import { toast } from "sonner";
function OperateInvoiceAsSuperAdmin({ invoice }: { invoice: IInvoice }) {
  const handleMakeAsPaid = async () => {
    await makeInvoicePaid(invoice.id)
      .then(() => {
        toast.success("Invoice marked as paid");
      })
      .catch(() => {
        toast.error("Error marking invoice as paid");
      });
  };
  return (
    <div className="flex flex-col space-y-7 w-full max-w-lg mx-auto">
      {invoice?.status !== "PAID" && (
        <div className="w-full bg-indigo-500 rounded-xl shadow-md p-3 flex">
          <button onClick={handleMakeAsPaid} className="btn-main ml-auto">
            Marcar como pagado
          </button>
        </div>
      )}
      <div className="w-full bg-indigo-500 rounded-xl shadow-md p-3 flex">
        <DeleteModel modelId={invoice.id} deleteAction={deleteInvoice} />
      </div>

      <div className="flex flex-col p-7 w-full bg-gray-200 dark:bg-gray-800 text-primary rounded-2xl shadow-xl">
        <h2 className="text-subtitle">Adicionar items facturables</h2>
        <p className="text-red-500">
          No funciona para pagos recurrentes con Stripe
        </p>
        <div className="flex space-x-3">
          <NewForm
            fields={[
              {
                label: "Nombre ",
                name: "name",
                type: "text",
                required: true,
              },
              {
                label: "Description",
                name: "description",
                type: "text",
                required: true,
              },
              {
                label: "Precio",
                name: "price",
                type: "number",
                required: true,
              },
              {
                label: "Cantidad",
                name: "quantity",
                type: "number",
                required: true,
              },
              {
                label: "Invoice ID",
                name: "invoiceId",
                type: "number",
                note: "Este campo no se toca!",
                required: true,
              },
            ]}
            values={{ invoiceId: invoice.id }}
            onSubmit={createInvoiceItemToInvoice}
          />
        </div>
      </div>
    </div>
  );
}

export default OperateInvoiceAsSuperAdmin;
