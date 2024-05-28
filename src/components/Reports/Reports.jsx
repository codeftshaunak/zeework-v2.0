// import MyReports from './MyReports'
// import ConnectionHistory from './ConnectionHistory';
// import BillingEarning from './BillingEarning';
// import TransactionHistory from './TransactionHistory';

// import Status from './Status.jsx';
import GenaralStats from "./GenaralStats.jsx";
import Adjustment from "./Adjustment.jsx";
import Timesheet from "./Timesheet.jsx";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { agencyReports } from "../../helpers/APIs/agencyApis.js";
import { freelancerReports } from "../../helpers/APIs/freelancerApis.js";
import EarningsOverview from "./EarningsOverview/EarningsOverview.jsx";
import { getAgencyAllJobs, userAllJobs } from "../../helpers/APIs/jobApis.js";
import { useDispatch, useSelector } from "react-redux";
import {
  setMyJobsData,
  setStatsData,
} from "../../redux/pagesSlice/pagesSlice.js";

const Reports = () => {
  const [cookies] = useCookies(["activeagency"]);
  const activeAgency = cookies.activeagency;
  // const [reports, setReports] = useState([]);
  const reports = useSelector((state) => state.pages.myStats.reports);
  const userJobs = useSelector((state) => state.pages.myJobs.userJobs);
  const [isLoading, setIsLoading] = useState(false);
  const [jobIsLoading, setJobIsLoading] = useState(false);
  const { stats, balance } = reports;
  const dispatch = useDispatch();

  const getStatsReports = async () => {
    setIsLoading(true);
    try {
      const { code, body } = activeAgency
        ? await agencyReports()
        : await freelancerReports();
      if (code === 200) dispatch(setStatsData({ reports: body }));
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const getHourlyJobs = async () => {
    setJobIsLoading(true);
    try {
      const response = activeAgency
        ? await getAgencyAllJobs()
        : await userAllJobs();
      if (response) dispatch(setMyJobsData({ userJobs: response }));
    } catch (error) {
      console.error(error);
    }
    setJobIsLoading(false);
  };

  useEffect(() => {
    if (Object.keys(reports).length === 0) {
      getStatsReports();
    }
    if (Object.keys(userJobs).length === 0) {
      getHourlyJobs();
    }
  }, []);
  return (
    <div className="w-full mx-auto">
      <EarningsOverview balance={balance} isLoading={isLoading} />
      <GenaralStats stats={stats} isLoading={isLoading} />
      <Timesheet
        activeJobs={userJobs?.active_jobs?.filter(
          (job) => job.job_type === "hourly"
        )}
        isLoading={jobIsLoading}
      />
      <Adjustment />
    </div>
  );
};

export default Reports;
