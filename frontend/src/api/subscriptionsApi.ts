import {
  ApiErrors,
  BadRequestError,
  InternalServerError,
} from "@/types/HttpTypes";
import { api } from "./api";
import { AxiosPromise, HttpStatusCode } from "axios";

const subscriptionsPath = "/subscriptions";

export async function subscribeUserToTeam(
  userEmail: string | undefined,
  teamId: number | undefined
): AxiosPromise<void> {
  if (!userEmail || !teamId)
    throw new BadRequestError("Error subscribing user to team due to empty fields");

  try {
    const response = await api.post(
      subscriptionsPath,
      {
        email: userEmail,
        id: teamId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error: any) {
    
    const errorClass =
      ApiErrors.get(error.response.status) ?? InternalServerError;

    // The user may only subscribe itself to a team once
    const userIsAlreadySubscribedToATeam =
      error.response.status === HttpStatusCode.BadRequest &&
      error.response.data.message === "Already subscripted";

    if (userIsAlreadySubscribedToATeam) return;

    throw new errorClass("Error subscribing user to team");
  }
}
