import { images, type SiteImage } from "./images";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  CENTRAL TOUR DATA
 *  Every tour card, tour page, sitemap entry and related-tour link is generated
 *  from this file.
 *
 *  Fields marked "CONFIRM" are operational details that only you can provide.
 *  Leave them as `null` and the site shows "To be confirmed" rather than
 *  inventing anything. Booking links live in src/config/booking.ts.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type MeetingPoint = {
  /** e.g. "Outside the main entrance on Carrer de la Marina" */
  name: string;
  address?: string;
  /** Extra directions, e.g. "Look for a guide holding a City History Tours sign" */
  notes?: string;
  /** Link to Google Maps or similar */
  mapUrl?: string;
};

export type InfoItem = { title: string; description: string };
export type FAQ = { question: string; answer: string };

export type Tour = {
  slug: string;
  title: string;
  /** Short label for compact UI (cards, breadcrumbs) */
  shortTitle: string;
  location: string;
  category: string;
  tagline: string;
  /** 1–2 sentence description for cards */
  summary: string;
  /** Opening paragraph on the tour page */
  intro: string;
  overview: string[];
  highlights: string[];
  /** Top 3 highlights shown on cards */
  cardHighlights: string[];
  included: string[];
  excluded: string[];
  /** CONFIRM: e.g. "1 hour 30 minutes". `null` shows "To be confirmed". */
  duration: string | null;
  /** CONFIRM: exact meeting point. `null` shows "To be confirmed". */
  meetingPoint: MeetingPoint | null;
  /** CONFIRM (optional): e.g. "from €45 per adult". `null` hides the price. */
  price: string | null;
  /** CONFIRM (optional): e.g. ["English", "Spanish"]. Empty hides the field. */
  languages: string[];
  itinerary: InfoItem[];
  visitorInfo: InfoItem[];
  faqs: FAQ[];
  heroImage: SiteImage;
  cardImage: SiteImage;
  gallery: SiteImage[];
  related: string[];
  seo: { title: string; description: string; keywords: string[] };
};

const bookingFaq: FAQ = {
  question: "How do I book this tour?",
  answer:
    "Select any “Book Now” button on this page. You’ll be taken to our secure booking page, where you can choose your date, see live availability and receive instant confirmation.",
};

const cancellationFaq: FAQ = {
  question: "What is the cancellation policy?",
  answer:
    "The cancellation and refund terms for this tour are shown clearly during booking and in your confirmation email. If you have any questions before you book, contact our team.",
};

export const tours: Tour[] = [
  // ───────────────────────────────── SAGRADA FAMILIA ─────────────────────────
  {
    slug: "sagrada-familia-tour",
    title: "Sagrada Familia Tour",
    shortTitle: "Sagrada Familia",
    location: "Barcelona",
    category: "Gaudí & Modernisme",
    tagline: "Gaudí’s unfinished masterpiece, explained stone by stone.",
    summary:
      "Step inside Antoni Gaudí’s extraordinary basilica with a guide who brings its symbolism, history and ongoing construction to life.",
    intro:
      "More than a century after its first stone was laid, the Basílica de la Sagrada Família is still rising over Barcelona. On this guided tour you’ll discover why Antoni Gaudí devoted the last decades of his life to it, how nature shaped every column and window, and what the façades are telling the people who stop to read them.",
    overview: [
      "Construction of the Sagrada Familia began in 1882, and Gaudí took charge of the project the following year. He transformed a conventional neo-Gothic plan into something entirely his own: a church conceived as a forest of stone, flooded with coloured light and covered in sculpture that tells the Christian story from birth to resurrection.",
      "Your guide begins outside, where the contrast between the richly organic Nativity façade — built during Gaudí’s lifetime — and the stark, angular Passion façade reveals how the building has evolved across generations of architects and craftspeople. You’ll learn to recognise the symbols hidden in the stonework, from the tortoises supporting the columns to the cryptogram whose numbers always add up to 33.",
      "Inside, the scale changes everything. Branching columns rise like trees towards a canopy of vaults, and the stained-glass windows wash the nave in cool blues and greens on one side and warm reds and golds on the other. Your guide explains the geometry Gaudí used to make it all stand — and why he never expected to see it finished.",
      "The basilica was consecrated in 2010, and parts of Gaudí’s work here are inscribed on the UNESCO World Heritage List. This tour gives you the context to appreciate not only what you see, but what is still to come.",
    ],
    highlights: [
      "Explore the interior’s forest of tree-like columns and soaring vaults",
      "See the stained-glass windows transform light into colour across the nave",
      "Decode the symbolism of the Nativity and Passion façades",
      "Understand Gaudí’s structural genius and use of geometry inspired by nature",
      "Hear the story of a building under construction since 1882",
      "Learn about Gaudí’s life, faith and final years dedicated to the basilica",
    ],
    cardHighlights: [
      "Guided visit inside the basilica",
      "Nativity & Passion façades explained",
      "Gaudí’s symbolism and geometry",
    ],
    included: [
      "Guided tour of the Sagrada Familia with a professional guide",
      "Entry to the basilica interior",
      "Commentary on the exterior façades and the history of construction",
    ],
    excluded: [
      "Access to the towers (unless selected as an option when booking)",
      "Hotel pick-up and drop-off",
      "Food and drinks",
      "Gratuities",
    ],
    duration: null,
    meetingPoint: null,
    price: null,
    languages: [],
    itinerary: [
      {
        title: "Meet your guide",
        description:
          "Meet your guide at the meeting point and receive a short introduction to Gaudí, Modernisme and the story of the basilica.",
      },
      {
        title: "The Nativity façade",
        description:
          "Start with the façade Gaudí completed in his lifetime, a joyful explosion of sculpture celebrating the birth of Jesus and the natural world.",
      },
      {
        title: "Security check and entry",
        description:
          "Pass through the basilica’s security check together with your guide and step into the main nave.",
      },
      {
        title: "The interior: a forest of light",
        description:
          "Walk beneath the branching columns and learn how Gaudí engineered the structure, then watch the stained glass colour the space around you.",
      },
      {
        title: "The Passion façade",
        description:
          "Finish at the dramatic Passion façade, where sculptor Josep Maria Subirachs’ angular figures tell the story of the Crucifixion.",
      },
      {
        title: "Free time",
        description:
          "Your guided tour ends inside the grounds, so you’re welcome to stay on and explore at your own pace before leaving.",
      },
    ],
    visitorInfo: [
      {
        title: "Dress code",
        description:
          "The Sagrada Familia is a working place of worship. Shoulders should be covered, and very short shorts, skirts or see-through clothing are not permitted.",
      },
      {
        title: "Security",
        description:
          "All visitors pass through an airport-style security check. Large bags and suitcases are not allowed inside, so travel light.",
      },
      {
        title: "Arrive early",
        description:
          "Please arrive at the meeting point a little before your start time. Entry slots are timed and late arrivals may not be able to join the group.",
      },
      {
        title: "Accessibility",
        description:
          "The basilica interior is accessible for wheelchair users. Please let us know about any accessibility needs before you book so we can advise you.",
      },
      {
        title: "Photography",
        description:
          "Photography for personal use is allowed inside the basilica. Tripods and flash are best left behind.",
      },
      {
        title: "Services",
        description:
          "Religious services and special events can occasionally affect access to parts of the basilica.",
      },
    ],
    faqs: [
      bookingFaq,
      {
        question: "Do I need to buy a separate entry ticket?",
        answer:
          "Basilica entry is included in this tour. Tower access is not included unless it is offered and selected as an option during booking.",
      },
      {
        question: "Is the Sagrada Familia suitable for children?",
        answer:
          "Yes. Children of all ages are welcome, and the stories behind the sculpture and symbolism make the visit engaging for families.",
      },
      {
        question: "What should I wear?",
        answer:
          "Clothing that covers your shoulders, and avoid very short shorts or skirts. Comfortable shoes are recommended.",
      },
      cancellationFaq,
    ],
    heroImage: images.sagradaFacade,
    cardImage: images.sagradaTowers,
    gallery: [
      images.sagradaInterior,
      images.sagradaNight,
      images.sagradaTowers,
      images.sagradaDetail,
      images.sagradaDoor,
      images.barcelonaSkyline,
    ],
    related: ["park-guell-tour", "barcelona-walking-tour", "montserrat-tour-from-barcelona"],
    seo: {
      title: "Sagrada Familia Guided Tour in Barcelona",
      description:
        "Guided tour of Gaudí’s Sagrada Familia in Barcelona: explore the basilica interior, its stained glass and the Nativity and Passion façades with an expert guide.",
      keywords: ["Sagrada Familia tour", "Sagrada Familia guided tour", "Gaudí tour Barcelona", "Barcelona basilica tour"],
    },
  },

  // ───────────────────────────────── PARK GÜELL ──────────────────────────────
  {
    slug: "park-guell-tour",
    title: "Park Güell Tour",
    shortTitle: "Park Güell",
    location: "Barcelona",
    category: "Gaudí & Modernisme",
    tagline: "Mosaics, myths and the city’s finest views.",
    summary:
      "Wander through Gaudí’s playful hillside park — from the mosaic dragon to the serpentine bench — and hear the story of a garden city that never was.",
    intro:
      "Park Güell is where Gaudí’s imagination ran freest. Commissioned by his patron Eusebi Güell as an exclusive garden city, it became instead one of the most joyful public spaces in Europe. Join a guide to uncover the ideas behind its mosaics, viaducts and gingerbread-like pavilions — and enjoy sweeping views across Barcelona to the sea.",
    overview: [
      "In 1900 the industrialist Eusebi Güell bought land on the slopes of what was then known as the Muntanya Pelada, the “bare mountain”, and asked Antoni Gaudí to design an English-style garden city for wealthy families. Only two houses were ever sold, and in 1926 the estate opened as a public park. Today it is part of the UNESCO World Heritage site dedicated to Gaudí’s works.",
      "Your guide leads you through the Monumental Zone, the heart of the park, starting at the fairy-tale entrance pavilions and the grand stairway guarded by the famous mosaic dragon. Above, the Hypostyle Room’s forest of Doric columns was designed as a covered marketplace, its ceiling studded with glittering ceramic medallions.",
      "On the great terrace above, the undulating bench — clad in trencadís, the broken-tile mosaic technique perfected by Gaudí and his collaborator Josep Maria Jujol — offers one of the best views of the city. Along the way you’ll walk beneath stone viaducts that seem to grow out of the hillside and learn how Gaudí worked with the landscape rather than against it.",
      "It’s a tour full of colour, humour and symbolism, and a perfect complement to a visit to the Sagrada Familia.",
    ],
    highlights: [
      "Enter the Monumental Zone with a guide who knows its stories",
      "Meet the iconic mosaic dragon on the main stairway",
      "Discover the Hypostyle Room and its ceramic ceiling medallions",
      "Relax on the serpentine trencadís bench above the city",
      "Walk beneath Gaudí’s organic stone viaducts and colonnades",
      "Enjoy panoramic views over Barcelona to the Mediterranean",
    ],
    cardHighlights: [
      "Monumental Zone with a guide",
      "Mosaic dragon & serpentine bench",
      "Panoramic views over Barcelona",
    ],
    included: [
      "Guided tour of Park Güell with a professional guide",
      "Entry to the Monumental Zone",
      "Commentary on Gaudí, Eusebi Güell and the history of the park",
    ],
    excluded: [
      "Entry to the Gaudí House Museum",
      "Hotel pick-up and drop-off",
      "Food and drinks",
      "Gratuities",
    ],
    duration: null,
    meetingPoint: null,
    price: null,
    languages: [],
    itinerary: [
      {
        title: "Meet your guide",
        description:
          "Meet your guide at the meeting point for an introduction to Eusebi Güell’s ambitious garden-city project.",
      },
      {
        title: "Entrance pavilions",
        description:
          "Begin at the whimsical gatehouse pavilions, with their mushroom-like roofs and colourful ceramic details.",
      },
      {
        title: "The dragon stairway",
        description:
          "Climb the grand stairway past the mosaic dragon, the park’s most famous resident, and hear the legends it represents.",
      },
      {
        title: "Hypostyle Room",
        description:
          "Step beneath the forest of columns designed as a marketplace and look up at the ceramic medallions set into the ceiling.",
      },
      {
        title: "Nature Square and the serpentine bench",
        description:
          "Emerge onto the great terrace with its sinuous mosaic bench and panoramic views across the city to the sea.",
      },
      {
        title: "Viaducts and colonnades",
        description:
          "Finish among the stone porticoes and viaducts that blend architecture with the hillside, then stay and explore at your own pace.",
      },
    ],
    visitorInfo: [
      {
        title: "Timed entry",
        description:
          "Access to the Monumental Zone is by timed ticket and numbers are limited. Please arrive at the meeting point a little before your start time.",
      },
      {
        title: "Hills and steps",
        description:
          "The park is built on a hillside with slopes, stairs and uneven paths. Comfortable walking shoes are essential.",
      },
      {
        title: "Sun and weather",
        description:
          "Much of the visit is outdoors with limited shade. Bring water, sun protection and a hat in warmer months, and a layer in winter.",
      },
      {
        title: "Getting there",
        description:
          "Park Güell sits above the Gràcia neighbourhood. Public transport stops nearby involve an uphill walk, so allow extra time.",
      },
      {
        title: "Accessibility",
        description:
          "Some areas of the park have steep gradients. Please contact us before booking to discuss accessibility needs.",
      },
      {
        title: "Photography",
        description:
          "Photography is welcome throughout the park, and the terrace offers some of the best views in Barcelona.",
      },
    ],
    faqs: [
      bookingFaq,
      {
        question: "Is the whole park included?",
        answer:
          "The tour focuses on the Monumental Zone, where Gaudí’s most famous works are found. The rest of the park is free to explore after your tour.",
      },
      {
        question: "Can I visit the Gaudí House Museum?",
        answer:
          "The Gaudí House Museum inside the park requires a separate ticket and is not included in this tour.",
      },
      {
        question: "Is the tour suitable for children?",
        answer:
          "Absolutely. The colours, mosaics and dragon make Park Güell a favourite with families. Strollers may find some paths and steps challenging.",
      },
      cancellationFaq,
    ],
    heroImage: images.parkGuellDragon,
    cardImage: images.parkGuellDragon,
    gallery: [
      images.parkGuellBench,
      images.parkGuellColonnade,
      images.parkGuellPavilion,
      images.parkGuellViaduct,
      images.barcelonaPanorama,
      images.barcelonaCoast,
    ],
    related: ["sagrada-familia-tour", "barcelona-walking-tour", "montserrat-tour-from-barcelona"],
    seo: {
      title: "Park Güell Guided Tour in Barcelona",
      description:
        "Guided tour of Gaudí’s Park Güell in Barcelona: the mosaic dragon, Hypostyle Room, serpentine bench and panoramic city views with an expert guide.",
      keywords: ["Park Güell tour", "Park Guell guided tour", "Gaudí park Barcelona", "Barcelona Gaudí tours"],
    },
  },

  // ───────────────────────────── BARCELONA WALKING TOUR ──────────────────────
  {
    slug: "barcelona-walking-tour",
    title: "Barcelona Walking Tour",
    shortTitle: "Barcelona Walking Tour",
    location: "Barcelona",
    category: "Gothic Quarter",
    tagline: "Two thousand years of history in the old city’s lanes.",
    summary:
      "Walk through Roman Barcino, medieval squares and hidden corners of the Gothic Quarter with a guide who knows every story behind the stones.",
    intro:
      "Long before Gaudí, Barcelona was a Roman colony, a medieval maritime power and a city of guilds, cathedrals and palaces. This walking tour takes you into the old town’s labyrinth of lanes, where Roman walls, Gothic churches and quiet squares reveal how the city grew — and the moments that shaped it.",
    overview: [
      "The Barri Gòtic, or Gothic Quarter, sits on the site of Roman Barcino, founded more than two thousand years ago. Traces of its walls still frame the streets, and in a hidden courtyard stand columns from the city’s ancient Roman temple.",
      "With your guide you’ll trace the city’s story from those Roman beginnings to the height of the medieval Crown of Aragon, when Barcelona’s merchants traded across the Mediterranean. You’ll visit the area around Barcelona Cathedral, the political heart of Plaça de Sant Jaume — home to both City Hall and the Catalan government — and the atmospheric lanes of El Call, the medieval Jewish quarter.",
      "Along the way, your guide points out the details most visitors walk straight past: the neo-Gothic bridge of Carrer del Bisbe, the scarred walls of Plaça de Sant Felip Neri, and the elegant arcades of Plaça Reial, where the lampposts are an early work by a young Antoni Gaudí.",
      "It’s the perfect introduction to Barcelona at the start of a trip — you’ll come away with a mental map of the old city and plenty of ideas for where to return.",
    ],
    highlights: [
      "Explore the medieval lanes of the Gothic Quarter on foot",
      "Discover remains of Roman Barcino, including its ancient walls",
      "Visit the area around Barcelona Cathedral",
      "See Plaça de Sant Jaume, the city’s political heart for centuries",
      "Wander through El Call, the medieval Jewish quarter",
      "Admire Plaça Reial and the lampposts designed by a young Gaudí",
    ],
    cardHighlights: [
      "Gothic Quarter & Roman Barcino",
      "Cathedral area & Plaça de Sant Jaume",
      "Hidden squares and local stories",
    ],
    included: [
      "Guided walking tour with a professional local guide",
      "Commentary on Roman, medieval and modern Barcelona",
      "Local recommendations for the rest of your stay",
    ],
    excluded: [
      "Entry tickets to monuments, churches or museums",
      "Hotel pick-up and drop-off",
      "Food and drinks",
      "Gratuities",
    ],
    duration: null,
    meetingPoint: null,
    price: null,
    languages: [],
    itinerary: [
      {
        title: "Meet your guide",
        description:
          "Meet your guide at the meeting point in the old city for an introduction to Barcelona’s long history.",
      },
      {
        title: "Roman Barcino",
        description:
          "Discover what remains of the Roman city — sections of its walls and the columns of its ancient temple.",
      },
      {
        title: "Cathedral and Carrer del Bisbe",
        description:
          "Explore the area around Barcelona Cathedral and the photogenic neo-Gothic bridge spanning Carrer del Bisbe.",
      },
      {
        title: "Plaça de Sant Jaume",
        description:
          "Stand between City Hall and the Palau de la Generalitat, where Barcelona and Catalonia have been governed for centuries.",
      },
      {
        title: "El Call and Sant Felip Neri",
        description:
          "Wander the narrow lanes of the medieval Jewish quarter and the quiet square still marked by the events of the Spanish Civil War.",
      },
      {
        title: "Plaça Reial",
        description:
          "End in the palm-lined Plaça Reial, with its arcades and the lampposts that were among Gaudí’s first commissions.",
      },
    ],
    visitorInfo: [
      {
        title: "Walking",
        description:
          "This is a walking tour on mostly flat, sometimes cobbled streets. Wear comfortable shoes and bring water.",
      },
      {
        title: "Route",
        description:
          "The exact route may vary slightly due to events, services, roadworks or crowds, while covering the main highlights of the old city.",
      },
      {
        title: "Weather",
        description:
          "The tour runs mainly outdoors. Bring sun protection in summer and an umbrella or light jacket when rain is forecast.",
      },
      {
        title: "Keep valuables safe",
        description:
          "As in any busy city centre, keep an eye on bags and phones, particularly in crowded squares.",
      },
      {
        title: "Accessibility",
        description:
          "Some streets are narrow and cobbled. Please contact us before booking to discuss accessibility needs.",
      },
      {
        title: "Ask questions",
        description:
          "Your guide is happy to share recommendations for restaurants, museums and neighbourhoods to explore afterwards.",
      },
    ],
    faqs: [
      bookingFaq,
      {
        question: "Do we go inside any buildings?",
        answer:
          "This is an outdoor walking tour focused on the streets, squares and monuments of the old city. Entry to churches, museums or monuments is not included.",
      },
      {
        question: "Is this tour a good first activity in Barcelona?",
        answer:
          "Yes. It gives you a clear sense of the city’s history and layout, along with ideas for what to explore during the rest of your stay.",
      },
      {
        question: "Is the tour suitable for children?",
        answer:
          "Yes, families are welcome. The tour is on foot, so consider younger children’s stamina.",
      },
      cancellationFaq,
    ],
    heroImage: images.placaSantJaume,
    cardImage: images.placaReial,
    gallery: [
      images.gothicStreet,
      images.placaReial,
      images.eveningStreet,
      images.placaSantJaume,
      images.arcDeTriomfNight,
      images.arcDeTriomf,
    ],
    related: ["sagrada-familia-tour", "park-guell-tour", "montserrat-tour-from-barcelona"],
    seo: {
      title: "Barcelona Walking Tour: Gothic Quarter & Old Town",
      description:
        "Guided Barcelona walking tour through the Gothic Quarter: Roman Barcino, the cathedral area, Plaça de Sant Jaume, El Call and Plaça Reial.",
      keywords: ["Barcelona walking tour", "Gothic Quarter tour", "Barcelona old town tour", "Barri Gòtic guided tour"],
    },
  },

  // ─────────────────────────── MONTSERRAT FROM BARCELONA ─────────────────────
  {
    slug: "montserrat-tour-from-barcelona",
    title: "Montserrat Tour from Barcelona",
    shortTitle: "Montserrat",
    location: "Montserrat",
    category: "Day Trip from Barcelona",
    tagline: "A mountain monastery above the clouds of Catalonia.",
    summary:
      "Leave the city behind for Montserrat’s saw-toothed peaks, its Benedictine monastery and the Black Madonna, Catalonia’s beloved patron.",
    intro:
      "Rising abruptly from the Catalan plain, the jagged peaks of Montserrat have drawn pilgrims, artists and travellers for a thousand years. This tour from Barcelona takes you to the Benedictine monastery cradled high in the rock, with time to experience the basilica, the legend of the Black Madonna and the extraordinary mountain landscape.",
    overview: [
      "Montserrat — the “serrated mountain” — is one of Catalonia’s most important spiritual and cultural sites. Its strange rock pinnacles, formed from ancient conglomerate, have inspired legends for centuries, and the area is protected as a natural park.",
      "The Benedictine monastery of Santa Maria de Montserrat was founded in the eleventh century and remains a living community of monks today. Its basilica is home to the Virgin of Montserrat, the small, dark-faced Romanesque statue known affectionately as La Moreneta and venerated as patron of Catalonia.",
      "Your guide shares the history of the monastery, the legends of the mountain and the role Montserrat has played in Catalan identity, from medieval pilgrimage to the present day. The monastery is also home to the Escolania, one of the oldest boys’ choirs in Europe.",
      "There’s time to soak up the setting too: the views from the monastery terraces stretch across the valley, and funiculars and footpaths lead higher into the peaks for those who want to explore further.",
    ],
    highlights: [
      "Escape Barcelona for Montserrat’s dramatic mountain scenery",
      "Visit the Benedictine monastery of Santa Maria de Montserrat",
      "Discover the basilica and the story of the Black Madonna",
      "Learn about the Escolania, one of Europe’s oldest boys’ choirs",
      "Take in sweeping views across the Catalan countryside",
      "Hear the legends and history behind Catalonia’s sacred mountain",
    ],
    cardHighlights: [
      "Day trip from Barcelona",
      "Monastery & Black Madonna",
      "Spectacular mountain views",
    ],
    included: [
      "Guided tour with a professional guide",
      "Transport between Barcelona and Montserrat",
      "Guided visit of the monastery complex and basilica area",
    ],
    excluded: [
      "Funicular tickets to higher viewpoints (unless stated in your booking)",
      "Museum of Montserrat entry",
      "Hotel pick-up and drop-off (unless stated in your booking)",
      "Food and drinks",
      "Gratuities",
    ],
    duration: null,
    meetingPoint: null,
    price: null,
    languages: [],
    itinerary: [
      {
        title: "Depart Barcelona",
        description:
          "Meet your guide in Barcelona and travel out of the city towards the mountain, with an introduction to Montserrat along the way.",
      },
      {
        title: "Arrive at Montserrat",
        description:
          "Watch the rock pinnacles rise ahead as you approach the monastery, set high on the mountainside.",
      },
      {
        title: "Monastery and basilica",
        description:
          "Explore the monastery complex with your guide and learn about the Benedictine community that has lived here for centuries.",
      },
      {
        title: "The Black Madonna",
        description:
          "Discover the story of La Moreneta, the Virgin of Montserrat, and why she holds such a special place in Catalan hearts.",
      },
      {
        title: "Free time on the mountain",
        description:
          "Enjoy free time to take in the views, visit the museum or ride a funicular higher into the peaks (tickets not included unless stated).",
      },
      {
        title: "Return to Barcelona",
        description:
          "Travel back to Barcelona with time to reflect on one of Catalonia’s most remarkable places.",
      },
    ],
    visitorInfo: [
      {
        title: "Mountain weather",
        description:
          "Montserrat is noticeably cooler and windier than Barcelona, and conditions can change quickly. Bring an extra layer, even in summer.",
      },
      {
        title: "Footwear",
        description:
          "Expect slopes and steps around the monastery. Comfortable shoes with good grip are recommended.",
      },
      {
        title: "Visiting the Black Madonna",
        description:
          "Access to the Virgin of Montserrat can involve queues at busy times and is subject to the basilica’s services and opening hours.",
      },
      {
        title: "Respectful dress",
        description:
          "The basilica is an active place of worship. Please dress respectfully and keep noise to a minimum during services.",
      },
      {
        title: "Escolania choir",
        description:
          "The boys’ choir performs on a schedule set by the monastery and does not sing every day. Performances are not guaranteed during the tour.",
      },
      {
        title: "Food and drink",
        description:
          "There are cafés and a restaurant at the monastery. You’re welcome to bring water and snacks for the journey.",
      },
    ],
    faqs: [
      bookingFaq,
      {
        question: "How far is Montserrat from Barcelona?",
        answer:
          "Montserrat lies northwest of Barcelona, roughly an hour’s journey away depending on traffic and route.",
      },
      {
        question: "Will I hear the Escolania choir?",
        answer:
          "The choir sings on a schedule set by the monastery and not every day, so a performance cannot be guaranteed. Your guide can tell you whether one is expected on your date.",
      },
      {
        question: "Is the tour suitable for children and older travellers?",
        answer:
          "Yes. The monastery area involves some slopes and steps but is manageable for most visitors. Please contact us about any specific mobility needs before booking.",
      },
      cancellationFaq,
    ],
    heroImage: images.montserratPeaks,
    cardImage: images.montserratMonastery,
    gallery: [
      images.montserratAbove,
      images.montserratCliffs,
      images.montserratValley,
      images.montserratMisty,
      images.montserratMonastery,
      images.montserratRidge,
    ],
    related: ["sagrada-familia-tour", "park-guell-tour", "barcelona-walking-tour"],
    seo: {
      title: "Montserrat Tour from Barcelona",
      description:
        "Guided Montserrat tour from Barcelona: visit the Benedictine monastery, the basilica and the Black Madonna amid spectacular mountain scenery.",
      keywords: ["Montserrat tour from Barcelona", "Montserrat day trip", "Montserrat monastery tour", "Black Madonna Montserrat"],
    },
  },
];

export const TO_BE_CONFIRMED = "To be confirmed";

export function getTour(slug: string): Tour | undefined {
  return tours.find((t) => t.slug === slug);
}

export function getRelatedTours(tour: Tour): Tour[] {
  return tour.related
    .map((slug) => getTour(slug))
    .filter((t): t is Tour => Boolean(t));
}

export function tourPath(slug: string) {
  return `/tours/${slug}`;
}
