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
    course: user.course,
    location: faker.address.city(),
  };
}

export function createRandomUser(course) {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    course: course.type + " " + course.year,
    uId: faker.random.alphaNumeric(10),
  };
}

export function createRandomCourse() {
  courseTypes.map;
  return {
    type: courseTypes[Math.floor(Math.random() * 2)],
    year: years[Math.floor(Math.random() * 3)],
  };
}

const courses = Array.from({ length: 6 }).map(() => {
  return createRandomCourse();
});

const users = Array.from({ length: 10 }).map(() => {
  return createRandomUser(courses[Math.floor(Math.random() * courses.length)]);
});

const bookings = Array.from({ length: 100 }).map(() => {
  return createRandomBooking(users[Math.floor(Math.random() * users.length)]);
});

console.log(JSON.stringify(bookings, null, 2));
console.log(JSON.stringify(courses, null, 2));
console.log(JSON.stringify(users, null, 2));

fs.writeFileSync("bookings.json", JSON.stringify(bookings));
fs.writeFileSync("users.json", JSON.stringify(users));
fs.writeFileSync("courses.json", JSON.stringify(courses));
