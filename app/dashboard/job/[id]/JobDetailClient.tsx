"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Job } from "@/app/dashboard/lib/types/job";
import { SiTicktick } from "react-icons/si";
import { CiLocationOn, CiCirclePlus } from "react-icons/ci";
import { formatDateToCustomString } from "@/app/dashboard/util/formaDate";
import {
  MdOutlineLocalFireDepartment,
  MdOutlineDateRange,
} from "react-icons/md";

const JobDetailClient = () => {
  const { id } = useParams();
  const [job, setJob] = useState<Job>();

  useEffect(() => {
    async function fetchJob() {
      try {
        console.log(`Fetching job data for ID: ${id}`);
        const response = await fetch(
          ` https://akil-backend.onrender.com/opportunities/${id}`
        );
        const {data} = await response.json();
        if (response.ok) {
          console.log("Fetched job data:", data);
          setJob(data);
        } else {
          console.error("Failed to fetch job data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    }

    if (id) {
      fetchJob();
    } else {
      console.error("No ID found in the URL");
    }
  }, [id]);

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-14 flex-col justify-between  bg-white shadow-lg rounded-lg my-16 w-full">
      <h1 className="text-3xl font-bold mb-4 text-[#25324B]">{job.title}</h1>
      <div className="flex flex-col md:flex-row gap-14">
        <div className="md:w-3/4 pr-4">
          <p className="text-gray-600 mb-4">{job.description}</p>
          <h2 className="text-2xl font-bold mb-2 text-[#25324B]">
            Responsibilities
          </h2>
          <ul className="flex flex-col gap-2">
            {job.responsibilities?.split("\n").map((responsibility, index) => (
              <li key={index} className="flex gap-2">
                <SiTicktick className="text-[#56CDAD]" />
                <p className="text-start text-gray-600">{responsibility}</p>
              </li>
            ))}
          </ul>
          <h2 className="text-2xl font-bold mb-2 text-[#25324B]">
            Ideal Candidate
          </h2>
          <div className="mb-4 text-gray-600">
            <p>{job.idealCandidate}</p>
          </div>
          <h2 className="text-2xl font-bold mb-2 inline-flex gap-2 text-[#25324B]">
            <CiLocationOn />
            When & Where
          </h2>
          <p className="mb-4 text-gray-600">{job.whenAndWhere}</p>
        </div>
        <div className="md:w-1/4 pl-4 border-l border-gray-200">
          <h2 className="text-2xl font-bold mb-2 text-[#25324B]">About</h2>
          <p className="flex gap-2 text-gray-600">
            <CiCirclePlus />
            Posted On: {formatDateToCustomString(job.datePosted)}
          </p>
          <p className="flex gap-2 text-gray-600">
            <MdOutlineLocalFireDepartment />
            Deadline: {formatDateToCustomString(job.deadline)}
          </p>
          <p className="flex gap-2 text-gray-600">
            <CiLocationOn />
            Location:{" "}
            {Array.isArray(job.location)
              ? job.location.join(", ")
              : "Not provided"}
          </p>
          <p className="flex gap-2 text-gray-600">
            <MdOutlineDateRange />
            Start Date: {formatDateToCustomString(job.startDate)}
          </p>
          <p className="flex gap-2 text-gray-600">
            <MdOutlineDateRange />
            End Date: {formatDateToCustomString(job.endDate)}
          </p>
          <h2 className="text-2xl font-bold mb-2 text-[#25324B]">Categories</h2>
          {Array.isArray(job.categories) && job.categories.length > 0 ? (
            job.categories.map((category, index) => (
              <p
                key={index}
                className="mb-2 text-[#FFC663] bg-[#FDF3EB] py-1 px-3 rounded-full"
              >
                {category}
              </p>
            ))
          ) : (
            <p>No categories provided</p>
          )}
          <h2 className="text-2xl font-bold mb-2 text-[#25324B]">
            Required Skills
          </h2>
          {Array.isArray(job.requiredSkills) &&
          job.requiredSkills.length > 0 ? (
            job.requiredSkills.map((skill, index) => (
              <p
                key={index}
                className="mb-2 text-[#2D298E] bg-[#F8F8Fd] py-1 px-3 rounded-full"
              >
                {skill}
              </p>
            ))
          ) : (
            <p>No skills required</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetailClient;
