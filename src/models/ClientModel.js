export default class ClientModel {
  constructor({
    name,
    email,
    created_date,
    status,
    documents,
    id,
    appointments,
    birth_date,
    medicine,
    phone,
    user_role
  } = {}
  ) {
    this.name = name ?? null;
    this.email = email ?? null;
    this.user_role = '1';
    this.created_date = created_date ?? Date.now();
    this.status = status ?? "invited";
    this.documents = documents ?? [];
    this.id = id ?? null;
    this.appointments = appointments ?? [];
    this.birth_date = birth_date ?? null;
    this.medicine = medicine ?? [];
    this.phone = phone ?? null;
    this.user_role = user_role ?? '1'
  }

  static fromFirestore(data) {
    return new ClientModel({ ...data })
  }

  toFirestore() {
    return {
      name: this.name,
      email: this.email,
      user_role: this.user_role,
      created_date: this.created_date,
      status: this.status,
      documents: this.documents,
      id: this.id,
      appointments: this.appointments,
      birth_date: this.birth_date,
      medicine: this.medicine,
      phone: this.phone,
      user_role: this.user_role
    }
  }
}