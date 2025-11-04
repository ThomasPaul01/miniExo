import { describe, expect, test } from '@jest/globals';
import { Person, Wizard } from './person';

describe('Person class', () => {
    test('should create a Person with name and 100 life points', () => {
        const person = new Person('Malik');
        expect(person.name).toBe('Malik');
        expect(person.lifePoints).toBe(100);
    });

    test('should reduce life points by 10 when hit another person', () => {
        const person1 = new Person('Malik');
        const person2 = new Person('Sofia');
        person1.hit(person2);
        expect(person2.lifePoints).toBe(90);
    });
    test('should return false for isDead when life points are above 0', () => {
        const person = new Person('Malik');
        expect(person.isDead()).toBe(false);
    });

    test('should create a Wizard with name and 80 life points', () => {
        const wizard = new Wizard('Gandalf');
        expect(wizard.name).toBe('Gandalf');
        expect(wizard.lifePoints).toBe(80);
    });

    test('should reduce life points by 15 when Wizard hits another person', () => {
        const wizard = new Wizard('Gandalf');
        const person = new Person('Frodo');
        wizard.hit(person);
        expect(person.lifePoints).toBe(85);
    });

    test('should return true for isDead when life points are 0 or below', () => {
        const person = new Person('Malik');
        person.lifePoints = 0;
        expect(person.isDead()).toBe(true);
    });

});

    