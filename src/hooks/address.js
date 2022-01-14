import * as api from "../api/address"
import { useQuery, useMutation } from "react-query"
import { queryClient } from '../App'

export const useAllAddresses = () => {
  return useQuery("address", api.fetchAddresses)
}

export const useAddress = (id) => {
  return useQuery(["address", id], () => api.fetchAddressById(id), {
    enabled: !!id,
  })
}

export const useDeleteAddress = () => {
  return useMutation(api.deleteAddress, {
    onSuccess: (_, id) => {
      queryClient.refetchQueries("addresses");
    },
  })
}

export const useUpdateAddress = () => {
  return useMutation(api.updateAddress, {
    onSuccess: (_, { id, ...variables }) => {
      queryClient.refetchQueries("addresses")
      queryClient.refetchQueries(["address", id])
    },
  })
}

export const useAddAddress = () => {
  return useMutation(api.addAddress, {
    onSuccess: () => {
      queryClient.refetchQueries("addresses");
    },
  })
}