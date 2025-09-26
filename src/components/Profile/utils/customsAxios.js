import axios from "axios";
import { errorToastify } from "./toastify";

//getting the token from the local storage
export const CustomAxios = (args) => {
  const overrideNotification = args?.overrideNotification || false;

  
  const accessToken =
    localStorage.getItem("accessToken") === null
      ? false
      : localStorage.getItem("accessToken");

  try {
    const axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_ENDPOINT,
      headers: {
        Authorization: `Bearer ${accessToken && accessToken}`,
        "Content-Type": "application/json",
      },
    });

    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error?.response?.status === 401) {
          !overrideNotification && errorToastify("Not Authorized");
        } else if (error?.response?.status === 403) {
          !overrideNotification && errorToastify("Bad Request");
        } else if (error?.response?.status === 500) {
          !overrideNotification &&
            errorToastify("Some error occured. Please try again.");
        } else if (error?.toString()?.toLowerCase()?.includes("network")) {
          errorToastify("Kindly check your connection and try again");
        }
        console.log(`>>> CHECK ERROR HERE >> ${JSON.stringify(error)}`);
        return error?.response ? Promise.reject(error) : error;
      }
    );
    return axiosInstance;
  } catch (err) {
    console.log("error");
  }
};

//Usage

// export const updateData = async ({ id }) => {
//   const result = await CustomAxios().put(
//     `${process.env.REACT_APP_ENDPOINT}/data/${id}`
//   );

//   return result;
// };

// export const getData = ({ queryKey: [key, { id }] }) =>
//   CustomAxios()
//     .get(`${process.env.REACT_APP_ENDPOINT}/data/${id}`)
//     .then((res) => res.data);

// export const postData = async (data) => {
//   const { taskId, workflowInstanceId } = data;
//   try {
//     const results = await CustomAxios().post(
//       `${process.env.REACT_APP_ENDPOINT}/data`,
//       data
//     );
//     return results;
//   } catch (error) {
//     return { error, msg: "Error sending mails" };
//   }
// };
