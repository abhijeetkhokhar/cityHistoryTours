/**
 * Photo library. All photographs are from Unsplash and are free to use under the
 * Unsplash License (https://unsplash.com/license). Credits are kept here so they
 * can be shown on the site and are never lost.
 */

export type SiteImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  credit: string;
};

const img = (
  file: string,
  alt: string,
  width: number,
  height: number,
  credit: string,
): SiteImage => ({ src: `/images/${file}.jpg`, alt, width, height, credit });

export const images = {
  barcelonaSkyline: img(
    "barcelona-skyline-sunset",
    "Barcelona skyline at sunset with the towers of the Sagrada Familia rising above the city",
    2400, 1566, "Korney Violin",
  ),
  barcelonaPanorama: img(
    "barcelona-panorama-dusk",
    "Panoramic view over Barcelona at dusk from the hills above the city",
    2000, 1333, "Mateo Krossler",
  ),
  barcelonaCoast: img(
    "barcelona-coast-aerial",
    "Aerial view of Barcelona's coastline, beaches and city blocks on a sunny day",
    1800, 1201, "Enes",
  ),

  sagradaFacade: img(
    "sagrada-familia-facade",
    "Sculpted Passion façade of the Sagrada Familia against a deep blue sky",
    2400, 1600, "Giulia Angotti",
  ),
  sagradaTowers: img(
    "sagrada-familia-towers",
    "Looking up at the spires of the Sagrada Familia from below the Passion façade",
    1600, 1067, "Sung Shin",
  ),
  sagradaInterior: img(
    "sagrada-familia-interior",
    "Interior of the Sagrada Familia with coloured light from the stained-glass windows",
    1600, 1067, "Peter F",
  ),
  sagradaNight: img(
    "sagrada-familia-night",
    "The Sagrada Familia illuminated at night, framed by trees and a street lamp",
    1400, 2100, "Jay Shah",
  ),
  sagradaDetail: img(
    "sagrada-familia-detail",
    "Close-up of the angular stone sculpture of the Sagrada Familia's Passion façade",
    1600, 1280, "Numan Torres",
  ),
  sagradaDoor: img(
    "sagrada-familia-door",
    "Bronze door of the Sagrada Familia covered in raised inscriptions",
    1400, 2100, "KreatePix Yuni Martin",
  ),

  parkGuellDragon: img(
    "park-guell-dragon",
    "The famous mosaic dragon on the main stairway of Park Güell",
    2400, 1800, "Martijn Vonk",
  ),
  parkGuellBench: img(
    "park-guell-bench",
    "Detail of the curving trencadís mosaic bench in Park Güell",
    1400, 2100, "Armin Pfarr",
  ),
  parkGuellColonnade: img(
    "park-guell-colonnade",
    "Sunlit stone colonnade with leaning columns in Park Güell",
    1400, 1867, "Paul Raillard",
  ),
  parkGuellPavilion: img(
    "park-guell-pavilion",
    "Mosaic-topped entrance pavilion of Park Güell overlooking Barcelona",
    1400, 2100, "Armin Pfarr",
  ),
  parkGuellViaduct: img(
    "park-guell-viaduct",
    "Rustic stone viaduct among the trees of Park Güell",
    1400, 1750, "Ben Morris",
  ),

  placaSantJaume: img(
    "gothic-quarter-placa-sant-jaume",
    "Barcelona City Hall on Plaça de Sant Jaume in the Gothic Quarter",
    2400, 1600, "Pourya Gohari",
  ),
  gothicStreet: img(
    "gothic-quarter-street",
    "Narrow street in Barcelona's old town lined with balconies and lanterns",
    1400, 2100, "Ana Lanza",
  ),
  eveningStreet: img(
    "barcelona-evening-street",
    "Evening view down a tall, narrow Barcelona street towards a church spire",
    1400, 2305, "Stas Bezukh",
  ),
  placaReial: img(
    "placa-reial",
    "Fountain and arcaded façades of Plaça Reial in Barcelona",
    1600, 1067, "Henrique Ferreira",
  ),
  arcDeTriomf: img(
    "arc-de-triomf",
    "The red-brick Arc de Triomf in Barcelona under a clear blue sky",
    1600, 1200, "Hongbin",
  ),
  arcDeTriomfNight: img(
    "arc-de-triomf-night",
    "The Arc de Triomf lit up at night with people walking beneath it",
    1400, 1865, "Jānis Beitiņš",
  ),

  montserratPeaks: img(
    "montserrat-monastery-peaks",
    "Montserrat monastery set beneath the jagged rock peaks of the mountain",
    2400, 1800, "David Tomaseti",
  ),
  montserratMonastery: img(
    "montserrat-monastery-close",
    "Montserrat monastery buildings in front of towering rock formations",
    1600, 1067, "Colin + Meg",
  ),
  montserratAbove: img(
    "montserrat-from-above",
    "Montserrat monastery seen from above, nestled in a mountain ravine",
    1600, 1067, "Corentin Largeron",
  ),
  montserratValley: img(
    "montserrat-valley",
    "Montserrat's rocky ridges above a wide river valley",
    1600, 1067, "Alex Williams",
  ),
  montserratMisty: img(
    "montserrat-misty",
    "Misty Montserrat mountain with the monastery at its foot",
    1600, 1067, "Corentin Largeron",
  ),
  montserratCliffs: img(
    "montserrat-cliffs",
    "Steep cliffs of Montserrat with the monastery complex far below",
    1400, 1750, "Sam Carden",
  ),
  montserratRidge: img(
    "montserrat-ridge",
    "Panoramic view of Montserrat's serrated ridge and surrounding hills",
    1600, 897, "chan lee",
  ),
} satisfies Record<string, SiteImage>;
