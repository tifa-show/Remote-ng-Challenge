export class Team {
  name: string;
  email: string;
  phone: string;
  tshirt_color: string;
  riders_ids: RiderMember[];
  image : string;

  constructor() {
    this.name = '';
    this.email = '';
    this.phone = '';
    this.tshirt_color = '';
    this.riders_ids = [];
    this.image = '';
  }
}

export class RiderMember {

  riders: string;
  phone: string;

  constructor() {
    this.riders = '';
    this.phone = '';
  }
}
