import { Doctor } from "../models/doctor.model";
import { faker } from "@faker-js/faker";
import { hashPassword } from "./password";

export const createFakeDoctor = async () => {
  try {
    // Check if any doctors exist in the database
    const existingDoctor = await Doctor.findOne();

    if (existingDoctor) {
      console.log(
        "Doctor already exists in database. Skipping fake doctor creation."
      );
      return null;
    }

    const fakeDoctor = new Doctor({
      fullName: faker.person.fullName(),
      date_of_birth: faker.date.birthdate({ min: 30, max: 60, mode: "age" }),
      gender: faker.helpers.arrayElement(["M", "F"]),
      license_number: `LIC-${faker.string.alphanumeric(8).toUpperCase()}`,
      specialty: faker.helpers.arrayElement([
        "Cardiology",
        "Pediatrics",
        "Neurology",
        "Oncology",
        "General Practice",
        "Dermatology",
      ]),
      years_of_experience: faker.number.int({ min: 1, max: 40 }),
      phone: faker.phone.number(),
      email: "audo401@gmail.com",
      password: await hashPassword("Verysecurepassword"),
      office_address: {
        country: faker.location.country(),
        county: faker.location.state(),
        city: faker.location.city(),
        postal_code: faker.location.zipCode(),
      },
    });

    const savedDoctor = await fakeDoctor.save();
    console.log("Fake doctor created:", savedDoctor);
    return savedDoctor;
  } catch (error) {
    console.error("Error creating fake doctor:", error);
    throw error;
  }
};
