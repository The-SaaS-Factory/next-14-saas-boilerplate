// import { clerkClient } from "@clerk/nextjs";
// import { checkMarketingActionsOnRegister } from "./marketingFacade";

// import prisma from "@/lib/db";
// import {
//   notifyToSuperAdmin,
//   subscribeUserToNotificationSystem,
// } from "./novuFacade";
 

// export const handleCreateOrganization = async (organizationData: any) => {
//   let userAdmin = null;

//   userAdmin = await prisma.user.findFirst({
//     where: {
//       externalId: organizationData.created_by,
//     },
//    
//   });

//   if (userAdmin) {
//     const organization = await prisma.organization.create({
//       data: {
//         externalId: organizationData.id,
//         externalAttributes: JSON.stringify(organizationData),
//         name: organizationData.name,
//         user: {
//           connect: {
//             id: userAdmin.id,
//           },
//         },
//       },
//     });

//     createAmountByDefaultForOrganization({
//       organizationId: organization.id
//     });

//     subscribeUserToNotificationSystem("organization", organizationData);

//     notifyToSuperAdmin(
//       `New organization created: ${organizationData.name} by ${userAdmin.name}`
//     );

//     checkMarketingActionsOnRegister("Organization", organization.id);
//   }
// };

// export const handleOrganizationUpdated = async (organizationData: any) => {
//   const organization = await prisma.organization.findFirst({
//     where: {
//       externalId: organizationData.id,
//     },
//   });

//   if (organization) {
//     const organizationUpdated = await prisma.organization.update({
//       where: {
//         id: organization.id,
//       },
//       data: {
//         externalAttributes: JSON.stringify(organizationData),
//         name: organizationData.name,
//       },
//     });

//     syncOrganizationPermissions(
//       organization.id,
//       organizationData.public_metadata.permissions,
//     );

//     return organizationUpdated;
//   } else {
//     return handleCreateOrganization(organizationData);
//   }
// };

// export const getClerkOrganizations = async (userId: string) => {
//   const organizations = clerkClient.users.getOrganizationMembershipList({
//     userId,
//   });

//   return organizations;
// };

// export const syncOrganizationsWithClerk = async (user: any) => {

//   if(!user) return console.log('User not found');

//   const clerkOrganizations = await getClerkOrganizations(user.externalId);
//   if (clerkOrganizations) {
//     for (const clerkOrganization of clerkOrganizations) {
//       const organization = await prisma.organization.findFirst({
//         where: {
//           externalId: clerkOrganization.organization.id,
//         },
//       });

//       if (!organization) {
//         await handleCreateOrganization(clerkOrganization.organization);
//       } else {
//         await handleOrganizationUpdated(clerkOrganization.organization);
//       }
//     }
//   }
// };
