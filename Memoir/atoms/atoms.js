import { serverLocation } from "@/constants/utils";
import { getToken } from "@/functions/SecureStore";
import axios from "axios";
import { atom, selector } from "recoil";

export const testingAtom = atom({
    key: "testingAtomKey",
    default: 10
})

export const isAuthenticatedAtom = atom({
    key: "isAuthenticatedAtomKey",
    default: false
});

// export const allJournalsAtom = atom({
//     key: "allJournalsAtomKey",
//     default: selector({
//         key: "allJournalsAtomSelector",
//         get: async () => {
//             const token = await getToken()
//             const headers = {authorization: `Bearer ${token}`};
//             try {
//                 const response = await axios(`${serverLocation}/api/journal`, {headers})
//                 return response.data.journals
//             } catch (error) {
//                 console.log("Error fetching journals");
//                 return []
//             }
//         }
//     })
// })

export const allJournalsAtom = atom({
    key: "allJournalsAtomKey",
    default: []
})

