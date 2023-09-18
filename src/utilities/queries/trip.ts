import { useMutation } from "react-query";
import client from "../client";

export const useCompleteTripMutation = () => {
  return useMutation(client.trips.complete);
};