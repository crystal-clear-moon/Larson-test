import axios from 'axios';

const url = 'https://fsl-candidate-api-vvfym.ondigitalocean.app/v1';

export const fetchAddresses = async () => {
	const { data } = await axios.get(url + '/address?orderBy=id&direction=desc');
	return data;
}
export const fetchAddressById = async (id) => {
	const { data } = await axios.get(url + '/address/' + id);
	return data;
}
export const updateAddress = async ({ id, ...payload }) => {
  const { data } = await axios.patch(url + `/address/${id}`, payload)
  return data
}
export const addAddress = async (payload) => {
  const { data } = await axios.post(url + '/address', payload)
  return data
}
export const deleteAddress = async (id) => {
  const { data } = await axios.delete(url + `/address/${id}`)
  return data
}