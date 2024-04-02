import { stripeWebhook } from "@/utils/facades/serverFacades/stripeFacade";

export async function POST(request: Request) {
  const body = await request.text();
  try {
  await stripeWebhook(body);
  } catch (error) {
    console.log(error);
  }
  return Response.json({ message: "ok" });
}
