"use client";
import { closeSupportTicket } from "@/actions/global/supportModule/close-support-ticket";
import { XMarkIcon } from "@heroicons/react/24/outline";

const CloseTicket = ({ ticketId }: { ticketId: number }) => {
  
    const handleCloseTicket = async () => {
    closeSupportTicket(ticketId);
  };

  return (
    <div>
      <button onClick={handleCloseTicket} className="btn-icon">
        <XMarkIcon className="w-5 h-5 text-red-500" />
        Close ticket
      </button>
    </div>
  );
};

export default CloseTicket;
