import Image from "next/image";

const OrganizationCard = ({
  organization,
}: {
  organization?: {
    avatar?: string | undefined;
    name?: string | undefined;
    id?: number | undefined;
    email?: string | undefined;
  };
}) => (
  <div>
    <div className="flex flex-col  ">
      <div className="flex items-center space-x-2">
        <Image
          width={40}
          height={40}
          className="avatar"
          src={organization?.avatar ?? "/assets/img/avatar.png"}
          alt=""
        />
        <div className="flex  flex-col">
          <span className="mr-auto text-primary">
            {organization?.name} - {organization?.id && organization.id}
          </span>
          <span className="text-primary mr-auto">{organization?.email}</span>
        </div>
      </div>
    </div>
  </div>
);

export default OrganizationCard;
