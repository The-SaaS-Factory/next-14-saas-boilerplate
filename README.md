 # Multipurpose boilerplate full stack in Next js 14 with server actions, TS and Clerk   
  
  Get started on your next project quickly using this toolkit with authentication, invoices, administration, support ticker, notifications and much more 
 
 ## Installation
   1. Clone the repository
   2. Install the requirements
   3. Copy .env.example to .env
   4. Run npx prisma db seed
   5. Run the server

 ## Clerk Super Admin configuration
   1. Edit the user public metadata, and add this:  { isSuperAdmin: true, permissions: ["superAdmin:totalAccess"]} 