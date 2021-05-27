export class Player {
  firstName: string;
  lastName: string;
  email: string;
  score: number;
  image: string;

  constructor(firstName: string, lastName: string, email: string, image:string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.score = 0;
    this.image = image;
  }
}

