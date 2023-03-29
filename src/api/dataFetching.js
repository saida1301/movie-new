import axios from "axios";

export const fetchData = ({baseUrl}) => {
  const response =  await axios.get(`${baseUrl}`);
  
  const  {data} = response;
  return data;
}
