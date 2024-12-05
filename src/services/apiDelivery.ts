import api from "@/lib/axios";
import { DeliveryForm } from "@/types/delivery";
import { isAxiosError } from "axios";


export const calculateDelivery = async (formData: DeliveryForm) => {
  try {
    const { data } = await api.post('/delivery', formData);
    return data;
  } catch (error) {
    if(isAxiosError(error) && error.response) {
      return error.response.data;
    }
  }
}