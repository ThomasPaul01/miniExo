class Person {
  name: string;
  lifePoints: number;

  constructor(name: string) {
    this.name = name;
    this.lifePoints = 100;
  }
  
  hit(person: Person): void {
    person.lifePoints -= 10;
  }
  
  isDead(): boolean {
    if (this.lifePoints > 0) {
      return false;
    }
    return true;
  }
}

class Wizard extends Person {
  constructor(name: string) {
    super(name);
    this.lifePoints = 80;
  }
  
  hit(person: Person): Person {
    person.lifePoints -= 15;
    return person;
  }
}

export { Person, Wizard };
