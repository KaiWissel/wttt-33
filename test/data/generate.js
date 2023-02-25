import { faker } from "@faker-js/faker/locale/de";
import fs from "fs";

const actions = ["Kommen", "Gehen", "Pause Start", "Pause Ende"];
const courseTypes = ["FGM", "EGS"];
const years = [2021, 2022, 2023];

export function createRandomBooking(user) {
  return {
    username: user.firstName + " " + user.lastName,
    date: faker.date.between("2022-11-11", "2022-12-12"),
    action: actions[Math.floor(Math.random() * 4)],
    course: user.courseType + " " + user.year,
    location: faker.address.city(),
  };
}

export function createRandomUser() {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    courseType: courseTypes[Math.floor(Math.random() * 2)],
    year: years[Math.floor(Math.random() * 3)],
    uId: faker.random.alphaNumeric(10),
  };
}

const users = Array.from({ length: 10 }).map(() => {
  return createRandomUser();
});

const bookings = Array.from({ length: 100 }).map(() => {
  return createRandomBooking(users[Math.floor(Math.random() * users.length)]);
});

console.log(JSON.stringify(bookings, null, 2));
console.log(JSON.stringify(users, null, 2));

fs.writeFileSync("bookings.json", JSON.stringify(bookings));
fs.writeFileSync("users.json", JSON.stringify(users));
