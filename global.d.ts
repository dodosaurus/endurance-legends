export namespace Session {
  export type Payload = {
    athleteId: number;
  };
}

export namespace StravaAPI {
  export type StravaGetAccessTokenResponse = {
    access_token: string;
    refresh_token: string;
    expires_at: number;
    athlete: StravaAthlete;
  };

  export type StravaRefreshAccessTokenResponse = {
    access_token: string;
    refresh_token: string;
    expires_at: number;
    athlete: StravaAthlete;
  };

  export type StravaAthlete = {
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    country: string;
    profile: string;
    profile_medium: string;
  };
}
