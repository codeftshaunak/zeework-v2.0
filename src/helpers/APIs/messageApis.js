import { API } from "./proxy";
import { useApiErrorHandling } from "./proxy";

const makeApiRequest = async (
  method,
  endpoint,
  data = null,
  customHeaders = {},
  contentType = "application/json"
) => {
  // const authtoken = localStorage.getItem("authtoken");
  const authtoken = "";

  const headers = {
    "Content-Type": contentType,
    token: authtoken,
    ...customHeaders, // Allow for custom headers
  };

  const config = {
    method,
    url: endpoint,
    headers,
    data,
  };

  try {
    const response = await API(config);
    return response.data;
  } catch (error) {
    // Use the error handling hook
    const { handleApiError } = useApiErrorHandling();
    const { path, message, isError } = handleApiError(error);
    return { path, message, isError };
  }
};

export const getMessageUsers = async (profile) =>
  makeApiRequest(
    "get",
    `/user-chat-list${profile ? `?profile=${profile}` : ""}`
  );

export const getMessageDetails = async (receiverId, contractRef, profile) =>
  makeApiRequest(
    "get",
    `/message-list?receiver_id=${receiverId}${
      contractRef ? `&contract_ref=${contractRef}` : ""
    }`,
    null,
    { profile: profile }
  );

export const deleteMessage = async (id) =>
  makeApiRequest("post", `/message/delete?message_id=${id}`);

// export const deleteMessage = async (id) => {
//   try {
//     const authtoken = localStorage.getItem("authtoken");
//     const response = await API.post(`/message/delete?message_id=${id}`, {
//       headers: {
//         "Content-Type": "application/json",
//         token: `${authtoken}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };
