import React from "react";
import styles from "./Dashboard.module.css";
import { Card } from "@/components/Form/Card";
function page() {

  const DashboardData = [
    {title: "Check Result"},
    {title: "Project Submission"},
    {title: "Registration Guide"},
    {title: "Campus Hostel"},
    {title: "ND/HND Previous Course Registration"},
    {title: "First Semester Course Registration/S \chool Fees Payment"},
    {title: "Second Semester Course Registration/S \chool Fees Payment"},
    {title: "Print Course Form"},
    {title: "Summer Course Registration and Payment"},
    {title: "Print Summer Course Form"},
    {title: "School Fees Balance Payment"},
    {title: "Previous School Fees Payment"},
    {title: "Payment Requery"},
    {title: "View School Charges"},
    {title: "My Payments"},
    {title: "Generate Matriculation Number"},
    {title: "Admission Clearance"},
    {title: "Late Registration/O \ther Payments"},
    {title: "Past School Fees Payments"},
    {title: "Election Aspiration Form"},
    {title: "Outstanding Miscellaneous Payments"},
    {title: "Edit Biodata"},
    {title: "Send Complain"},
  ]

  return (
    <div>
      <h2>Student Dashboard</h2>
      <hr className="mt-[1rem] mb-[1rem] border-t-1.5 border-t-[rgba(0,0,0,.1)] border-solid w-full" />
      <div className={`${styles.dashboard_card}`}>
        {
          DashboardData.map((data) => (
            <Card title={data.title} key={data.title} />
          ))
        }
      </div>
    </div>
  );
}

export default page;
