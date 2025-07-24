export type Vacancie = {
  id: number;
  name: string;
  salary_range: {
    from: number;
    to: number;
    currency: string;
  } | null;
  experience: {
    name: string;
  };
  work_format: [{ id: string; name: string }];
  employer: {
    name: string;
  };
  area: {
    name: string;
  };
};
