import Image from "next/image";
import Link from "next/link";

interface JobCardProps {
  id: number;
  title: string;
  location: string;
  description: string;
  imageUrl: string;
}

const JobCard: React.FC<JobCardProps> = ({
  id,
  title,
  location,
  description,
  imageUrl,
}) => {
  return (
    <div className="card border p-4 rounded-lg shadow-lg bg-gray-50">
      <div className="flex">
        <img
          src={imageUrl}
          alt={title}
          width={100}
          height={100}
          className="rounded-lg"
        />
        <div className="ml-4">
          <h3 className="text-2xl font-semibold text-[#25324B]">{title}</h3>
          <p className="text-gray-600">{location}</p>
        </div>
      </div>
      <p className="mt-2 text-gray-700">{description}</p>
      <div className="mt-4 flex space-x-2">
        <button className="bg-[#EFFAF7] text-[#56CDAD]  py-1 px-3 rounded-full">
          In-person
        </button>
        <button className="bg-white text-[#FFB836] border border-[#FFB836] py-1 px-3 rounded-full">
          Education
        </button>
        <button className="bg-white text-[#615EAA] border border-[#615EAA] py-1 px-3 rounded-full">
          IT
        </button>
      </div>
    </div>
  );
};

export default JobCard;
