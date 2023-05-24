export default class DoctorModel {
  constructor({
    name,
    email,
    documents,
    id,
    appointments,
    phone,
    user_role,
    address
  } = {}
  ) {
    this.name = name ?? null;
    this.email = email ?? null;
    this.user_role = '1';
    this.documents = documents ?? [];
    this.id = id ?? null;
    this.appointments = appointments ?? [];
    this.phone = phone ?? null;
    this.user_role = user_role ?? '1';
    this.address = address ?? '';
  }

  static fromFirestore(data) {
    return new ClientModel({ ...data })
  }

  toFirestore() {
    return {
      name: this.name,
      email: this.email,
      user_role: this.user_role,
      documents: this.documents,
      id: this.id,
      appointments: this.appointments,
      phone: this.phone,
      user_role: this.user_role,
      address: this.address
    }
  }
}