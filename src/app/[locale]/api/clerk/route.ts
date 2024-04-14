import {
  handleEventWebhook,
  validateClerkRequest,
} from "@/utils/facades/serverFacades/clerkFacade";

export async function POST(request: Request) {
  const payload = await validateClerkRequest(request);
  
  try {
    
    await handleEventWebhook(payload);
  } catch (error) {
    console.log(error);
  }

  return Response.json({ message: "Received" });
}
