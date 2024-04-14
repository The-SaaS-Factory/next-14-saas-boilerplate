"use client";

function PrintInvoiceButton() {
  //   const handlePrint = () => {
  //     var printDiv = document.getElementById("invoicePrintDiv");
  //     var printWindow = window.open(
  //       "",
  //       "",
  //       "left=0, top=0, width=800, height=500, toolbar=0, scrollbars=0, status=0"
  //     );
  //     if (printDiv && printWindow) {

  //       printDiv.print();

  //     }
  //   };

  return (
    <div>
      <button onClick={() => window.print()} className="btn-main">
        Imprimir
      </button>
    </div>
  );
}

export default PrintInvoiceButton;
