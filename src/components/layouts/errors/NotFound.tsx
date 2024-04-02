import Image from "next/image";

const NotFound = ({ message }: { message: string }) => {
  return (
    <div className="flex h-96">
      <div className="flex mx-auto  text-center flex-col space-y-3">
        <Image
          width={777}
          height={777}
          src="/assets/img/not_found.png"
          className="w-full mx-auto h-full object-cover"
          alt="Not found"
        />
        <span className="text-subtitle mx-auto">{message}</span>
      </div>
    </div>
  );
};

export default NotFound;
