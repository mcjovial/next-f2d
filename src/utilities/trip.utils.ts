import { Trip } from "@/types";

export function hasOngoingTrip(trips: Trip[]): boolean {
  if (trips.length > 0) {
    return trips.some((trip) => trip.status === 'ongoing');
  }
  return false;
}

export function hasCompletedTrip(trips: Trip[]): boolean {
  if (trips.length > 0) {
    return trips.some((trip) => trip.status === 'completed');
  }
  return false;
}

export function ongoingTrip(trips: Trip[]): Trip {  
  return trips?.find((trip) => trip.status === 'ongoing')!;
}