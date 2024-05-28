// import axios from "axios";
// import { BASE_URL, useApiErrorHandling } from "./proxy";

// export const API = axios.create({
//   baseURL: BASE_URL,
// });

// export const getAllJobs = async () => {
//   // eslint-disable-next-line no-useless-catch
//   try {
//     const authtoken = localStorage.getItem("authtoken");
//     const response = await API.get("/job/get-all", {
//       headers: {
//         "Content-Type": "application/json",
//         token: `${authtoken}`,
//       },
//     });

//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// export const getInvitedFreelancer = async () => {
//   try {
//     const authToken = localStorage.getItem("authtoken");
//     const response = await API.get("/freelancers/invited", {
//       headers: {
//         "Content-Type": "application/json",
//         token: authToken,
//       },
//     });

//     return response.data.body;
//   } catch (error) {
//     console.error("API Error:", error.message);
//     throw error;
//   }
// };

// export const applyJob = async (data) => {
//   try {
//     const authtoken = localStorage.getItem("authtoken");
//     const response = await API.post(`/job-proposal`, data, {
//       headers: {
//         "content-type": "multipart/form-data",
//         token: `${authtoken}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     return error.data;
//   }
// };

// export const createJob = async (formData) => {
//   try {
//     const authtoken = localStorage.getItem("authtoken");
//     const response = await API.post("/job/create", formData, {
//       headers: {
//         "Content-Type": `multipart/form-data`,
//         token: `${authtoken}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     return error;
//   }
// };

// export const getAllJobsProposal = async () => {
//   try {
//     const authtoken = localStorage.getItem("authtoken");
//     const response = await API.get("/jobs/proposals", {
//       headers: {
//         "Content-Type": "application/json",
//         token: `${authtoken}`,
//       },
//     });

//     return response?.data?.body;
//   } catch (error) {
//     return error;
//   }
// };

// const makeApiRequest = async (
//   method,
//   endpoint,
//   data = null,
//   customHeaders = {},
//   params = {},
//   contentType = "application/json"
// ) => {
//   const authtoken = localStorage.getItem("authtoken");

//   const headers = {
//     "Content-Type": contentType,
//     token: authtoken,
//     ...customHeaders,
//   };

//   const config = {
//     method,
//     url: endpoint,
//     headers,
//     data,
//     params,
//   };

//   try {
//     const response = await API(config);
//     return response?.data.body;
//   } catch (error) {
//     const { handleApiError } = useApiErrorHandling();
//     handleApiError(error);
//     return error.response?.data;
//   }
// };

// export const userAllJobs = async () => makeApiRequest("get", "/user/jobs");

// export const getSingleJobDetails = async (id) =>
//   makeApiRequest("get", `/job/get-job?job_id=${id}`);

// export const getAgencyAllJobs = async () =>
//   makeApiRequest("get", "/agency/jobs");

// export const updateJob = async (id, data) =>
//   makeApiRequest(
//     "patch",
//     `/job/update?job_id=${id}`,
//     data,
//     {},
//     {},
//     "multipart/form-data"
//   );

// export const deleteJob = async (id) =>
//   makeApiRequest("delete", `/job/delete`, { job_id: id });

import axios from "axios";
import { BASE_URL } from "./proxy";

const API = axios.create({
  baseURL: BASE_URL,
});

const setAuthHeaders = (contentType = "application/json") => {
  // const authToken = localStorage.getItem("authtoken");
  const authToken = "";
  return {
    headers: {
      "Content-Type": contentType,
      token: authToken,
    },
  };
};

const handleError = (error) => {
  if (error.response?.data?.code === 401) {
    // handleLogout();
  }
  return error.response?.data;
};

export const getAllJobs = async () => {
  try {
    const response = await API.get("/job/get-all", setAuthHeaders());
    return response.data.body;
  } catch (error) {
    return handleError(error);
  }
};

export const getJobs = async (
  page,
  category,
  searchTerm,
  experience,
  contractType,
  hourlyRateMin,
  hourlyRateMax,
  fixedRateMin,
  fixedRateMax,
  payment
) => {
  try {
    // const authtoken = localStorage.getItem("authtoken");
    const experienceValues = experience
      ? experience.map((exp) => exp).join(",")
      : "";
    const contractValue = contractType
      ? contractType.map((contact) => contact).join(",")
      : "";

    const response = await API.get("/job/search", {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        page: page || 1,
        searchTerm: searchTerm || null,
        experience: experienceValues || null,
        job_type: contractValue || null,
        hourly_rate_min: hourlyRateMin || null,
        hourly_rate_max: hourlyRateMax || null,
        fixed_rate_min: fixedRateMin || null,
        fixed_rate_max: fixedRateMax || null,
        category: category ? category.map((cat) => cat.value).join(",") : null,
        payment: payment || null,
      },
    });

    return response.data.body;
  } catch (error) {
    console.error("Error fetching job data:", error);
    throw error;
  }
};

export const getInvitedFreelancer = async () => {
  try {
    const response = await API.get("/freelancers/invited", setAuthHeaders());
    return response.data.body;
  } catch (error) {
    return handleError(error);
  }
};

export const applyJob = async (data) => {
  try {
    const response = await API.post("/job/apply", data, setAuthHeaders());
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const createJob = async (formData) => {
  try {
    const response = await API.post("/job/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...setAuthHeaders().headers,
      },
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getAllJobsProposal = async () => {
  try {
    const response = await API.get("/jobs/proposals", setAuthHeaders());
    return response.data.body;
  } catch (error) {
    return handleError(error);
  }
};

export const userAllJobs = async () => {
  try {
    const response = await API.get("/user/jobs", setAuthHeaders());
    return response.data.body;
  } catch (error) {
    return handleError(error);
  }
};

export const getSingleJobDetails = async (id) => {
  try {
    const response = await API.get(
      `/job/get-job?job_id=${id}`,
      setAuthHeaders()
    );
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getAgencyAllJobs = async () => {
  try {
    const response = await API.get("/agency/jobs", setAuthHeaders());
    return response.data.body;
  } catch (error) {
    return handleError(error);
  }
};

export const updateJob = async (id, data) => {
  try {
    const response = await API.patch(`/job/update?job_id=${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...setAuthHeaders().headers,
      },
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const deleteJob = async (id) => {
  try {
    const response = await API.delete(`/job/delete`, {
      headers: {
        "Content-Type": "application/json",
        ...setAuthHeaders().headers,
      },
      data: { job_id: id },
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const endJobContract = async (body) => {
  try {
    const response = await API.post("/contract/end", body, setAuthHeaders());
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const changeOldPassword = async (body) => {
  try {
    const response = await API.post("/reset-password", body, setAuthHeaders());
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const submitTask = async (body) => {
  try {
    const response = await API.post(
      "/offer/task/submit",
      body,
      setAuthHeaders("multipart/form-data")
    );
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const taskApproveOrReject = async (body) => {
  try {
    const response = await API.post("/task/approve", body, setAuthHeaders());
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};
