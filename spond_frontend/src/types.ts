export interface MemberType {
  id: string;
  name: string;
}

export interface FormMeta {
  title: string;
  registrationOpens: string;
  memberTypes: MemberType[];
  clubId: string;
  formId: string;
  group: string;
}

export interface FormData {
  member_type_id: string;
  group: string;
  name: string;
  email: string;
  phone: string;
  birth_date: string;
}
