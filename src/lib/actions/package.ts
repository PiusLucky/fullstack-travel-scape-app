"use server";

import { PackageData } from "@/types";
import { connectToDatabase } from "../database/connection/mongoose";
import Package from "../database/models/packages.model";
import { handleError } from "../utils";
import { faker } from "@faker-js/faker";

export async function getAllPackages() {
  try {
    await connectToDatabase();

    const packages = await Package.find().sort("-createdAt");

    return JSON.parse(JSON.stringify(packages));
  } catch (error) {
    handleError(error);
  }
}

export async function getPackageById(packageId: string) {
  try {
    await connectToDatabase();

    const packageInstance = await Package.findById(packageId);

    if (!packageInstance) throw new Error("Package not found");

    return JSON.parse(JSON.stringify(packageInstance));
  } catch (error) {
    handleError(error);
  }
}

export async function getTotalAvailablePackages() {
  try {
    await connectToDatabase();

    const packagesCount = await Package.countDocuments();
    return packagesCount;
  } catch (error) {
    handleError(error);
  }
}

export async function createPackage(packageData: PackageData) {
  try {
    await connectToDatabase();

    const newPackage = await Package.create(packageData);

    return JSON.parse(JSON.stringify(newPackage));
  } catch (error) {
    handleError(error);
  }
}

export async function updatePackage(
  packageId: string,
  packageData: PackageData
) {
  try {
    await connectToDatabase();

    const updatedPackage = await Package.findByIdAndUpdate(
      packageId,
      packageData,
      { new: true }
    );

    if (!updatedPackage) throw new Error("Package update failed");

    return JSON.parse(JSON.stringify(updatedPackage));
  } catch (error) {
    handleError(error);
  }
}

export async function deletePackage(packageId: string) {
  try {
    await connectToDatabase();

    const deletedPackage = await Package.findByIdAndDelete(packageId);

    return deletedPackage ? JSON.parse(JSON.stringify(deletedPackage)) : null;
  } catch (error) {
    handleError(error);
  }
}

export async function generateNewPackages(total: number = 12) {
  try {
    await connectToDatabase();

    // Check if there is at least one package
    const singlePackage = await Package.find();

    if (singlePackage?.length > 0) {
      return {
        message: "All good, you already have packages",
      };
    }

    const tripNames = [
      "Journey through the Highlands in Scotland",
      "Safari adventure in Kenya's Maasai Mara",
      "Island hopping in the Philippines",
      "Cultural immersion in Japan",
      "Exploration of the fjords in Norway",
      "Desert expedition in Morocco",
      "Trekking in the Himalayas of Nepal",
      "Road trip along the coast of Australia",
      "Historical tour of Italy's ancient ruins",
      "Wildlife encounter in the Amazon Rainforest",
      "Relaxing getaway in the Maldives",
      "City exploration in vibrant India",
    ];

    const images = [
      "https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/2450296/pexels-photo-2450296.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/917510/pexels-photo-917510.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/269809/pexels-photo-269809.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1687122/pexels-photo-1687122.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/2629233/pexels-photo-2629233.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/3791466/pexels-photo-3791466.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/3791466/pexels-photo-3791466.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/5272924/pexels-photo-5272924.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/6312169/pexels-photo-6312169.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/6271680/pexels-photo-6271680.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/4993107/pexels-photo-4993107.jpeg?auto=compress&cs=tinysrgb&w=600",
    ];
    for (let i = 0; i < total; i++) {
      const packageObj = {
        name: tripNames[i],
        username: faker.internet.userName(),
        email: faker.internet.email(),
        image: images[i],
        per_person_price_in_credit: faker.number.int({ min: 5, max: 20 }),
        location: faker.location.country(),
        total_days: faker.number.int({ min: 10, max: 100 }),
        total_people_allowed: faker.number.int({ min: 5, max: 100 }),
      };

      await createPackage(packageObj);
    }

    return {
      message: total + " Packages generated successfully",
    };
  } catch (error) {
    handleError(error);
  }
}
