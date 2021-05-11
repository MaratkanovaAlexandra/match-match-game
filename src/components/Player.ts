export class Player {
  private _firstName: string;
  private _lastName: string;
  private _email: string;
  private _score: number;

  constructor(firstName: string, lastName: string, email: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.score = 0;
  }

  get firstName() {
    return this._firstName;
  }
  set firstName(value: string) {
    if (!/^[a-zAA-z]+$/.test(value))
      throw new TypeError("argument is not valid");
    this._firstName = value;
  }

  get lastName() {
    return this._lastName;
  }
  set lastName(value: string) {
    if (!/^[a-zAA-z]+$/.test(value))
      throw new TypeError("argument is not valid");
    this._lastName = value;
  }

  get email() {
    return this._email;
  }
  set email(value: string) {
    if (!/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(value))
      throw new TypeError("argument is not valid");
    this._email = value;
  }

  get score() {
    return this._score; 
  }
  set score(value:number) {
      this._score = value;
  }

}

