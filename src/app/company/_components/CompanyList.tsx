"use client";

import React from "react";
import Image from "next/image";
import { ICompany } from "@/@types/ICompany";

const companyData: ICompany[] = [
  {
    name: "TechCorp Solutions",
    business: "Software Development",
    address: "123 Main Street",
    province: "Bangkok",
    postalcode: "10110",
    tel: "02-123-4567",
    picture: "https://picsum.photos/200/300?random=1",
  },
  {
    name: "GreenField Agriculture",
    business: "Agricultural Equipment",
    address: "456 Country Road",
    province: "Chiang Mai",
    postalcode: "50000",
    tel: "053-789-0123",
    picture: "https://picsum.photos/200/300?random=2",
  },
  {
    name: "HealthFirst Medical",
    business: "Healthcare Services",
    address: "789 Health Avenue",
    province: "Phuket",
    postalcode: "83000",
    picture: "https://picsum.photos/200/300?random=3",
  },
];

// CompanyList Component
const CompanyList: React.FC = () => {
  return (
    <div className='container mx-auto px-6 py-6'>
      <h2 className='text-2xl font-bold mb-6'>Company List</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {companyData.map((company, index) => (
          <div key={index} className='bg-white shadow-md rounded-lg p-4'>
            <Image
              src={company.picture}
              alt={company.name}
              width={150}
              height={150}
              className='w-full h-40 object-cover rounded-md mb-4'
            />
            <h3 className='text-xl font-semibold'>{company.name}</h3>
            <p className='text-gray-600'>{company.business}</p>
            <p className='text-gray-500'>
              {company.address}, {company.province}, {company.postalcode}
            </p>
            {company.tel && <p className='text-gray-500'>Tel: {company.tel}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyList;
