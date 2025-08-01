export type Vacancie = {
  id: number;
  name: string;
  salary_range: {
    from: number;
    to: number;
    currency: string;
  } | null;
  experience: {
    name: string | null;
  };
  work_format: { id: string; name: string }[];
  employer: {
    name: string;
  };
  area: {
    name: string;
  };
  snippet: {
    requirement: string | null;
    responsibility: string | null;
  };
  apply_alternate_url: string;
};
