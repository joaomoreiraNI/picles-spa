export interface IPet {
  id: string;
  name: string;
  type: string;
  size: string;
  gender: string;
  bio: string;
  photo: string;
}

export type GetPetsRequest = Pick<IPet, "type" | "size" | "gender"> & {
  page?: number;
};

export type GetPetsResponse = {
  item: IPet[];
  totalPages: number;
  currentPage: number;
};
