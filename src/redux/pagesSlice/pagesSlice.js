import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  findWork: {
    jobsList: [],
  },
  myJobs: {
    userJobs: {},
  },
  myStats: { reports: {} },
};

const pagesSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {
    setFindWorkData: (state, action) => {
      const { jobsList } = action.payload;
      state.findWork.jobsList = jobsList;
    },
    setMyJobsData: (state, action) => {
      const { userJobs } = action.payload;
      state.myJobs.userJobs = userJobs;
    },
    setStatsData: (state, action) => {
      const { reports } = action.payload;
      state.myStats.reports = reports;
    },
    restorePagesState: (state) => {
      state.myJobs.userJobs = {};
      state.myStats.reports = {};
    },
  },
});

export const {
  setFindWorkData,
  setMyJobsData,
  setStatsData,
  restorePagesState,
} = pagesSlice.actions;

export default pagesSlice.reducer;
