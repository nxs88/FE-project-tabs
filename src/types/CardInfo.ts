export type Vacancie = {
  id: number;
  name: string | null;
  salary_range: {
    from: number | null;
    to: number | null;
    currency: string | null;
  } | null;
  experience: {
    name: string | null;
  };
  work_format: { id: string; name: string }[];
  employer: {
    name: string | null;
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
