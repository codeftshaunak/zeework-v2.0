import { API } from "./proxy";
import { useApiErrorHandling } from "./proxy";

const makeApiRequest = async (method, endpoint, data = null, customHeaders) => {
  // const authtoken = localStorage.getItem("authtoken");
  const authtoken = "";

  const headers = {
    "Content-Type": customHeaders ? customHeaders : "application/json",
    token: authtoken,
  };

  const config = {
    method,
    url: endpoint,
    data,
    headers,
  };

  try {
    const response = await API(config);
    return response.data;
  } catch (error) {
    // Use the error handling hook
    const { handleApiError } = useApiErrorHandling();
    handleApiError(error);
    return error.response.data;
  }
};

export const updateFreelancerProfile = async (data) =>
  makeApiRequest("post", "/profile-details", data, "multipart/form-data");

export const uploadImage = async (data) =>
  makeApiRequest("post", "/user-profile-image", data, "multipart/form-data");

export const updateFreelancer = async (data) => {
  return makeApiRequest("PUT", "/edit-profile", data);
};

export const getAllDetailsOfUser = async () =>
  makeApiRequest("get", "/user/profile");

export const forgetLoginPassword = async (data) =>
  makeApiRequest("post", "/forgot-password", data);

export const changeOldPassword = async (body) =>
  makeApiRequest("post", "/reset-password", body);

export const getTaskDetails = async (offer_id) =>
  makeApiRequest("get", `/task?contract_ref=${offer_id}`);
