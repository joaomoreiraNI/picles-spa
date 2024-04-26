export interface IShelter {
  name: string;
  email: string;
  phone: string;
  whatsApp: string;
}
export interface IUpdateShelterRequest {
  name: string;
  email: string;
  phone: string;
  whatsApp: string;
}

export interface IUpdateShelterResponse extends IUpdateShelterRequest {}
