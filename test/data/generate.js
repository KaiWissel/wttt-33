import { faker } from "@faker-js/faker/locale/de";
import crypto from "crypto";
import fs from "fs";
import courseTypes from "./courseTypes.json" assert { type: "json" };

const actions = ["Kommen", "Gehen", "Pause Start", "Pause Ende"];

const years = [2021, 2022, 2023];

export function createRandomBooking(user) {
  return {
    userId: user.id,
    createdAt: faker.date.between("2022-11-11", "2022-12-12"),
    action: actions[Math.floor(Math.random() * 4)],
    location: faker.address.city(),
  };
}

export function createRandomUser(course) {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    id: crypto.randomUUID(),
    status: "Aktiv",
    uId: faker.random.alphaNumeric(10),
    courseId: course.id,
  };
}

export function createRandomCourse() {
  return courseTypes
    .map((t) =>
      years.map((y) => {
        return {
          courseTypeShortName: t.shortName,
          year: y,
          id: crypto.randomUUID(),
        };
      })
    )
    .flat();
}

const courses = createRandomCourse();

const users = Array.from({ length: 20 }).map(() => {
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
