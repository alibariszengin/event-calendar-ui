import {useState, useEffect} from 'react'
import axios from 'axios'
const useAxios = (url = '', method="get", options = null, cb=()=>{}) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
      let isMounted = true;
  
      setLoading(true);
  
      axios[method](url, options)
        .then(res => res.json())
        .then(data => {
          if (isMounted) {
            cb();
            setData(data);
            setError(null);
          }
        })
        .catch(error => {
          if (isMounted) {
            setError(error);
            setData(null);
          }
        })
        .finally(() => isMounted && setLoading(false));
  
      return () => (isMounted = false);
    }, [url, method, options, cb]);
  
    return { loading, error, data };
  };
  
  export default useAxios;

//   const {data} = useAxios('http://localhost:5000/api/auth/login',"post",{
		  
// 			email:mail,
// 			password: password
	
// 		  },()=>{
// 			auth.login(() => {
// 			  history.replace("/");
// 			});
// 		});