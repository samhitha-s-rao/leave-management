// import axios from "axios";


// const axiosInstance = axios.create({
//     baseURL:"https://localhost:5238/api"
// });


// axiosInstance.interceptors.request.use(
// (config)=>{

//     const token =
//         localStorage.getItem("token") ||
//         sessionStorage.getItem("token");


//     if(token)
//     {
//         config.headers.Authorization =
//         `Bearer ${token}`;
//     }


//     return config;

// });


// export default axiosInstance;