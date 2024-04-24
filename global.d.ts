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
    city: string;
    profile: string;
    profile_medium: string;
  };

  export type StravaActivity = {
    id: number;
    name: string;
    type: string;
    distance: number;
    moving_time: number;
    elapsed_time: number;
    total_elevation_gain: number;
    start_date: string;
    start_date_local: string;
    location_country: string;
    kudos_count: number;
  }
}
