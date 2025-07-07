export type Launch = {
  flight_number: number;
  links: {
    mission_patch_small: string;
  };
  mission_name: string;
  rocket: {
    rocket_name: string;
  };
  details?: string;
};
