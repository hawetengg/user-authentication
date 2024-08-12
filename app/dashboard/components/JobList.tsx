"use client";
import React, { useEffect, useState } from "react";
import JobCard from "@/app/dashboard/components/jobCard";
import Link from "next/link";
import { Job } from "@/app/dashboard/lib/types/job";

export default function JobList() {
  const [jobData, setJobData] = useState<Job[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://akil-backend.onrender.com/opportunities/search"
        );
        const { data } = await response.json();
        if(!response.ok){
          console.log("yes")
        }
        setJobData(data);
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
      console.log(jobData)
    }

    fetchData();
  }, []);

  return (
    <main className="min-h-screen px-20 py-10 bg-white">
      <div className="mb-6">
        <div className="flex justify-center items-center gap-5 my-4 w-full">
          <div>
            <h1 className="text-3xl font-bold">Opportunities</h1>
            <p className="text-gray-600">Showing {jobData.length} results</p>
          </div>
          <div className="flex items-center ml-auto">
            <span className="mr-2">Sort by:</span>
            <select className="border rounded p-1 font-bold">
              <option>Most Relevant</option>
              <option>Latest</option>
            </select>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 mx-auto max-w-4xl">
        {jobData.map((job) => (
          <Link key={job.id} href={`/dashboard/job/${job.id}`} legacyBehavior>
            <a className="my-5">
              <JobCard
                id={parseInt(job.id)}
                title={job.title}
                location={job.location.join(", ")} 
                description={job.description}
                imageUrl={job.logoUrl}
              />
            </a>
          </Link>
        ))}
      </div>
    </main>
  );
}
