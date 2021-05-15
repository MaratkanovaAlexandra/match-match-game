export class Player {
  firstName: string;
  lastName: string;
  email: string;
  score: number;
  image: ImageData;

  constructor(firstName: string, lastName: string, email: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.score = 0;
  }
//!/^[a-zAA-z]+$/.test(value)
//!/^[a-zAA-z]+$/.test(value)
//!/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(value)
}

