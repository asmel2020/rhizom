import { useMoralis } from "react-moralis";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
export const VerifyConnection = async()=>{

    const MySwal = withReactContent(Swal);

    const {
        isWeb3Enabled,
        enableWeb3,
        isAuthenticated,
      } = useMoralis();

      if(!isAuthenticated){
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: "connect your wallet",
        });
        return
      }
      if(!isWeb3Enabled && isAuthenticated){
        await enableWeb3();
      }
}