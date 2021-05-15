export class Player {
  firstName: string;
  lastName: string;
  email: string;
  score: number;
  image: any;

  constructor(firstName: string, lastName: string, email: string, image:any) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.score = 0;
    this.image = image;
  }
//!/^[a-zAA-z]+$/.test(value)
//!/^[a-zAA-z]+$/.test(value)
//!/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(value)
}

