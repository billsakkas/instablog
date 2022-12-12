import { Injectable } from '@angular/core';
import { Landmark } from '../../interfaces/landmark';
import * as Parse from 'parse';

@Injectable({
  providedIn: 'root',
})
export class LandmarkService {
  async getLandmarkById(id: string) {
    // Create a query for landmarks with the id
    const Landmark = Parse.Object.extend('Landmark');
    const query = new Parse.Query(Landmark);
    query.equalTo('objectId', id);

    // Start the query
    const result = await query.first();
    if (!result) return null;

    // Return the result as a Landmark
    const landmark = {
      ...result.attributes,
      id: result.id,
    } as Landmark;

    return landmark;
  }

  async getLandmarks(): Promise<Landmark[]> {
    // Create a query for landmarks
    const Landmark = Parse.Object.extend('Landmark');
    const query = new Parse.Query(Landmark);

    // Set the query to get every landmark available
    const results = await query.find();

    // Map the results to a Landmark array
    const landmarks: Landmark[] = results.map((result) => {
      return {
        ...result.attributes,
        id: result.id,
      } as Landmark;
    });

    // Return the landmarks sorted by order
    return landmarks.sort((a, b) => a.order - b.order);
  }

  async getLandmarksByTitle(text: string) {
    // Create a query for landmarks with the title
    const Landmark = Parse.Object.extend('Landmark');
    const query = new Parse.Query(Landmark);
    query.fullText('title', text);

    // Start the query
    const results = await query.find();

    // Map the results to a Landmark array
    const landmarks: Landmark[] = results.map((result) => {
      return {
        ...result.attributes,
        id: result.id,
      } as Landmark;
    });

    // Return the landmarks sorted by order
    return landmarks.sort((a, b) => a.order - b.order);
  }

  async modifyLandmark(landmark: Landmark, image: File | null) {
    // Convert the image to base64
    const imageBase64 = await this.convertImageToBase64(image);

    // Call the cloud function and pass the landmark and image
    const result = (await Parse.Cloud.run('modifyLandmark', {
      landmark,
      image: imageBase64,
    })) as Landmark;

    return result;
  }

  private async convertImageToBase64(image: File | null) {
    // If there is no image, return null
    if (!image) return Promise.resolve(null);

    // Convert the image to base64
    // Saddly FileReader only works with callbacks :(
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
}
