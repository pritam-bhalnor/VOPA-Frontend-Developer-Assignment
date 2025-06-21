export type Supplier = {
  name: string;
  id: string;
  slug: string;
};

export type Award = {
  date: string;
  value_for_two: number;
  suppliers_id: string;
  suppliers: Supplier[];
  value_for_three: number;
  count: string;
  offers_count: number;
  value_for_one: number;
  suppliers_name: string;
  value: string;
  offers_count_data: {
    [key: string]: {
      count: number;
      value: string;
    };
  };
};

export type Purchaser = {
  id: string;
  sid: string | null;
  name: string | null;
};

export type TypeData = {
  id: string;
  name: string;
  slug: string;
};

export type Tender = {
  id: string;
  date: string;
  deadline_date: string;
  deadline_length_days: string;
  title: string;
  category: string;
  sid: string;
  src_url: string;
  purchaser: Purchaser;
  type: TypeData;
  awarded: Award[];
};

export type TenderDetail = {
  id: string;
  title: string;
  date: string;
  deadline_date: string;
  deadline_length_days: string;
  category: string;
  sid: string;
  src_url: string;
  purchaser: {
    id: string;
    sid: string | null;
    name: string | null;
  };
  type: {
    id: string;
    name: string;
    slug: string;
  };
  notices: Array<{
    date: string;
    data: {
      date: string;
      type: string;
    };
  }>;
  awarded: Array<{
    date: string;
    suppliers_name: string;
    value: string;
    offers_count: number;
  }>;
};
