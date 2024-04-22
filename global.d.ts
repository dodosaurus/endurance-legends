export namespace Session {
  export type Payload = {
    athleteId: number
  }
}

export namespace StravaAPI {
  export type StravaGetAccessTokenResponse = {
    access_token: string;
    refresh_token: string;
    expires_at: number;
    athlete: {
      id: number;
    };
  };

  export type StravaRefreshAccessTokenResponse = {
    access_token: string;
    referesh_token: string;
    expires_at: number;
    athlete: {
      id: number;
    };
  };
}


