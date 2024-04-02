import { updateMembership } from "./membershipFacade";
import { calculateMonthsFromDays } from "./strFacade";
import { getSuperAdminSetting } from "./adminFacade";
import prisma from "@/lib/db";
import {
  sendLoopsTransactionalEventToUser,
  storeContactInLoopsAudience,
} from "./loopsEmailMarketingFacade";

export const checkMarketingActionsOnRegister = async (userId: number) => {
  activateFreeTrial(userId);
  sendWelcomeEmail(userId);
  storeContactInEmailProvider(userId);
};

const storeContactInEmailProvider = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (user) {
    storeContactInLoopsAudience(
      user.email as string,
      user.name as string,
      "userRegistered"
    );
  }
};

const activateFreeTrial = async (userId: number) => {
  const freeTrial: string | null = await getSuperAdminSetting(
    "MARKETING_FREE_TRIAL"
  );

  console.log(freeTrial);
  

  if (freeTrial && freeTrial == "true") {
    const planTrial = await getSuperAdminSetting("MARKETING_FREE_TRIAL_PLAN");
    const days = await getSuperAdminSetting("MARKETING_FREE_DAYS");

    console.log(planTrial);
    
    if (planTrial) {
      const plan = await prisma.plan.findUnique({
        where: {
          id: parseInt(planTrial),
        },
      });
 

      if (plan) {
        const months = calculateMonthsFromDays(days ? parseInt(days) : 14);
        updateMembership({
          userId,
          months,
          pricingId: null,
          currencyId: null,
          planId: plan.id,
        });
      } else {
        //send log
        //#Fix add module of logs/actions for super admin,
      }
    }
  }
};

export const sendWelcomeEmail = async (userId: number) => {
  const loopActived: string | null = await getSuperAdminSetting(
    "LOOPS_ENABLED"
  );

  if (loopActived == "true") {
    const loopId: string | null = await getSuperAdminSetting("LOOPS_API_KEY");

    if (loopId) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
      //Check email for user
      const welcomeEmailForUserEnabled = await getSuperAdminSetting(
        "MARKETING_WELCOME_EMAIL_FOR_USERS_ENABLED"
      );

      const welcomeEmailForUser = await getSuperAdminSetting(
        "MARKETING_WELCOME_EMAIL_USER_TRANSACTIONALID"
      );

      if (
        welcomeEmailForUserEnabled === "true" &&
        user &&
        welcomeEmailForUser
      ) {
        const payload = {
          email: user.email as string,
          transactionalId: welcomeEmailForUser,
          dataVariables: {
            name: user.name,
          },
        };

        sendLoopsTransactionalEventToUser(payload);
      }
    }
  }
};
