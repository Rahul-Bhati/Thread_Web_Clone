import { Button } from "@chakra-ui/react"
import useShowToast from "../hooks/useShowToast";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";

const LogoutButton = () => {
     const showToast = useShowToast();
     const setUser = useSetRecoilState(userAtom);

     const handleLogout = async () => {
          try {
               const res = await fetch("/api/users/logout", {
                    method: "POST",
                    headers: {
                         "Content-Type": "application/json",
                    },
               });

               const data = await res.json();

               if (data.error) {
                    showToast("Error", data.error, "error");
                    return;
               }
               localStorage.removeItem("user-threads")
               setUser(null);
               
          } catch (error) {
               console.log(error);
          }
     }
     return (
          <Button position={"fixed"} top={"30px"} right={"30px"} size={"sm"} onClick={handleLogout}>LogoutButton</Button>
     )
}

export default LogoutButton