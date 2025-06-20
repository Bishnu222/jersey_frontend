import { useMutation } from "@tanstack/react-query";

// useMutation is used for post/put/patch/delete request state

import { registerUserService } from "../services/authService";
import { toast } from "react-toastify";

export const useRegisterUser = () =>{
    return useMutation(
        {
            mutationFn: registerUserService,
            mutationKey:['register'],
            onSuccess: (data) =>{
                console.log(data)
                toast.success("Registration Success")
            },
            onError: (err) =>{
                console.log("Err", err)
                toast.error("Registrations failed")
            }
        }
    )
}


