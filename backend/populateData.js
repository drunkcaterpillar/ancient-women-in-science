const preprocessYear = (year) => {
  if (!year || typeof year !== "string") {
    return null; // Return null if year is undefined or not a string
  }

  year = year.trim().toLowerCase(); // Normalize the string

  if (year === "unknown") {
    return null; // Handle "Unknown" years
  }

  // Handle approximate years like "c. 1900 BCE" or exact years like "1458 BCE"
  const match = year.match(/c\.?\s*(\d+)\s*(bce|ce)?/i);
  if (match) {
    let yearValue = parseInt(match[1], 10);
    if (match[2] && match[2].toUpperCase() === "BCE") {
      yearValue = -yearValue; // Convert BCE years to negative numbers
    }
    return yearValue; // Return the processed year
  }

  // Handle century formats like "1st century BCE"
  const centuryMatch = year.match(/(\d+)[a-z]*\s*century\s*(bce|ce)?/i);
  if (centuryMatch) {
    let centuryValue = parseInt(centuryMatch[1], 10);
    let yearValue = (centuryValue - 1) * 100; // Convert century to a year range
    if (centuryMatch[2] && centuryMatch[2].toUpperCase() === "BCE") {
      yearValue = -yearValue; // Convert BCE centuries to negative numbers
    }
    return yearValue; // Return the start of the century as the processed year
  }

  return null; // If none of the formats match, return null
};

const mongoose = require("mongoose");
require("dotenv").config();
const Woman = require("./models/woman.model");

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 30000, // Increase timeout to avoid timing out too early
});

const women = [
  {
    name: "Pandrosion",
    categories: ["Mathematics"],
    birthYear: 300,
    deathYear: 360,
    location: "Alexandria, Egypt",
    contribution:
      "Developed an approximate method for solving the problem of doubling the cube, which was a significant mathematical challenge in ancient Greece. She also contributed a simplified method for constructing the geometric mean.",
    struggles:
      "Her contributions were criticized by Pappus, a fellow mathematician, who downplayed her work and discredited her abilities. Many scholars believed she was a man until recently when it was recognized she was one of the earliest female mathematicians.",
    image: "/images/pandrosion.png",
    quotes: [],
    artifacts: ["Pandrosion's methods in Pappus' Collection"],
    impact:
      "Though much of her work has been overshadowed or lost, she is considered an early female pioneer in mathematics, predating Hypatia.",
    source: "https://mathshistory.st-andrews.ac.uk/Biographies/Pandrosion/",
    lat: 31.2001,
    lng: 29.9187,
  },
  {
    name: "Hypatia",
    categories: ["Mathematics", "Astronomy", "Philosophy"],
    birthYear: 370,
    deathYear: 415,
    location: "Alexandria, Egypt",
    contribution:
      "Philosopher, mathematician, and astronomer known for her work on the astrolabe and advancements in geometry.",
    struggles:
      "Hypatia was murdered by a Christian mob due to her pagan beliefs and her influence as a prominent woman in a male-dominated society. Her work was largely attributed to male scholars posthumously.",
    image: "/images/hypatia.png",
    quotes: [
      "Reserve your right to think, for even to think wrongly is better than not to think at all.",
    ],
    artifacts: ["Hypatia's Commentaries on Diophantus"],
    impact:
      "Her contributions laid the groundwork for future women philosophers and mathematicians.",
    source: "https://en.wikipedia.org/wiki/Hypatia",
    lat: 31.2001,
    lng: 29.9187,
  },
  {
    name: "Maria Agnesi",
    categories: ["Mathematics"],
    birthYear: 1718,
    deathYear: 1799,
    location: "Milan, Italy",
    contribution:
      "Wrote the first book discussing both differential and integral calculus, Instituzioni analitiche ad uso della gioventù italiana.",
    struggles:
      "As a woman, her contributions were often sidelined in a male-dominated academic field.",
    image: "/images/maria_agnesi.png",
    quotes: [],
    artifacts: ["Instituzioni analitiche ad uso della gioventù italiana"],
    impact:
      "Her textbook was used for decades and is considered foundational in mathematics education.",
    source: "https://en.wikipedia.org/wiki/Maria_Agnesi",
    lat: 45.4642,
    lng: 9.19,
  },
  {
    name: "thank u devrim!",
    categories: ["Mathematics", "Physics"],
    birthYear: 1706,
    deathYear: 1749,
    location: "Paris, France",
    contribution:
      "Translated and commented on Isaac Newton’s Principia Mathematica, still the standard French translation.",
    struggles:
      "Her work was overshadowed by male counterparts, and she often had to justify her intelligence and capabilities as a woman.",
    image: "/images/emilie_du_chatelet.png",
    quotes: [
      "If I were king, I would make it my chief concern to reform an abuse which cuts back half the human race.",
    ],
    artifacts: ["Translation of Principia Mathematica"],
    impact:
      "Her translation and commentary remain highly respected in the field of physics.",
    source: "https://en.wikipedia.org/wiki/Émilie_du_Châtelet",
    lat: 48.8566,
    lng: 2.3522,
  },
  {
    name: "Wang Zhenyi",
    categories: ["Astronomy", "Mathematics"],
    birthYear: 1768,
    deathYear: 1797,
    location: "Anhui, China",
    contribution:
      "Published at least twelve books and multiple articles on astronomy and mathematics, explaining lunar eclipses and the movement of celestial bodies.",
    struggles:
      "As a self-taught woman in Qing dynasty China, she faced societal barriers to formal education.",
    image: "/images/wang_zhenyi.png",
    quotes: [],
    artifacts: ["Works on lunar eclipses and celestial movements"],
    impact:
      "She broke barriers for women in science and contributed to the understanding of celestial phenomena.",
    source: "https://en.wikipedia.org/wiki/Wang_Zhenyi",
    lat: 31.8639,
    lng: 117.2808,
  },
  {
    name: "Sophie Germain",
    categories: ["Mathematics"],
    birthYear: 1776,
    deathYear: 1831,
    location: "Paris, France",
    contribution:
      "Known for her work on Fermat's Last Theorem, she developed Sophie Germain's theorem, which was a major step toward proving Fermat’s Last Theorem for the case where n equals 5.",
    struggles:
      "As a woman, she had to use a male pseudonym (Monsieur Antoine-Auguste LeBlanc) to gain recognition in the male-dominated academic world.",
    image: "/images/sophie_germain.png",
    quotes: [
      "Algebra is but written geometry, and geometry is but algebra in space.",
    ],
    artifacts: [
      "Proof of Sophie Germain's theorem, Contributions to elasticity theory",
    ],
    impact:
      "Her theorem laid important groundwork for Fermat’s Last Theorem and advanced number theory.",
    source: "https://mathwomen.agnesscott.org",
    lat: 48.8566,
    lng: 2.3522,
  },
  {
    name: "Florence Nightingale",
    categories: ["Statistics"],
    birthYear: 1820,
    deathYear: 1910,
    location: "Florence, Italy",
    contribution:
      "Pioneered modern nursing and used statistics to improve healthcare conditions. Created the polar area diagram to show mortality rates in the Crimean War.",
    struggles:
      "Despite her monumental contributions to healthcare, she faced resistance in gaining recognition for her statistical work because she was a woman.",
    image: "/images/florence_nightingale.png",
    quotes: ["I attribute my success to this: I never gave or took an excuse."],
    artifacts: [
      "Polar area diagram showing causes of mortality in the Crimean War",
    ],
    impact:
      "Her application of statistics revolutionized public health and healthcare practices globally.",
    source: "https://en.wikipedia.org/wiki/Florence_Nightingale",
    lat: 43.7696,
    lng: 11.2558,
  },
  {
    name: "Sarah Woodhead",
    categories: ["Mathematics"],
    birthYear: 1851,
    deathYear: 1912,
    location: "United Kingdom",
    contribution:
      "First woman to pass the rigorous Cambridge Mathematical Tripos Exam in 1873.",
    struggles:
      "Faced societal barriers as women were not expected to participate in higher education or mathematical fields during her time.",
    image: "/images/sarah_woodhead.png",
    quotes: [],
    artifacts: ["Exam results from Cambridge Mathematical Tripos"],
    impact:
      "Paved the way for future generations of women in mathematics by being the first woman to pass the prestigious Tripos exam.",
    source: "https://en.wikipedia.org/wiki/Sarah_Woodhead",
    lat: 52.2053,
    lng: 0.1218,
  },
  {
    name: "Sofya Kovalevskaya",
    categories: ["Mathematics"],
    birthYear: 1850,
    deathYear: 1891,
    location: "Moscow, Russia",
    contribution:
      "First woman to earn a doctorate in mathematics in 1874. Discovered the Kovalevskaya top, an example of integrable rigid body motion.",
    struggles:
      "Faced significant obstacles due to her gender and was initially denied university teaching positions.",
    image: "/images/sofya_kovalevskaya.png",
    quotes: [
      "It is impossible to be a mathematician without being a poet in soul.",
    ],
    artifacts: ["Kovalevskaya top"],
    impact:
      "Her work remains influential in mathematical physics and theory of differential equations.",
    source: "https://en.wikipedia.org/wiki/Sofya_Kovalevskaya",
    lat: 55.7558,
    lng: 37.6173,
  },
  {
    name: "Charlotte Angas Scott",
    categories: ["Mathematics"],
    birthYear: 1858,
    deathYear: 1931,
    location: "Lincolnshire, England",
    contribution:
      "First woman to receive a doctorate in mathematics from the University of London, despite facing institutional barriers.",
    struggles:
      "Denied formal recognition for her academic achievements because of her gender, she was not officially awarded the title of 'eighth wrangler.'",
    image: "/images/charlotte_angas_scott.png",
    quotes: [],
    artifacts: ["Pioneering work on algebraic curves"],
    impact:
      "Helped women gain access to formal mathematical education and significantly contributed to algebraic geometry.",
    source: "https://en.wikipedia.org/wiki/Charlotte_Angas_Scott",
    lat: 53.2341,
    lng: -0.5382,
  },
  {
    name: "Cornelia Fabri",
    categories: ["Mathematics"],
    birthYear: 1869,
    deathYear: 1915,
    location: "Ravenna, Italy",
    contribution:
      "First woman to earn a doctorate in mathematics from the University of Pisa, known for her work in hydraulics and vortex motion theory.",
    struggles:
      "Faced societal limitations due to her gender, often overshadowed by male peers despite her groundbreaking work.",
    image: "/images/cornelia_fabri.png",
    quotes: [
      "My heart has always been suspended between two equal and opposing forces, which balance each other and keep me in perfect blindness as to what my future will be.",
    ],
    artifacts: ["Theories on vortex motions in fluids"],
    impact:
      "Her contributions in hydraulics and applied mathematics were significant in a male-dominated field.",
    source: "https://en.wikipedia.org/wiki/Cornelia_Fabri",
    lat: 44.4184,
    lng: 12.2035,
  },
  {
    name: "Louise Petrén-Overton",
    categories: ["Mathematics"],
    birthYear: 1880,
    deathYear: 1977,
    location: "Sweden",
    contribution:
      "First woman in Sweden to earn a doctorate in mathematics. Specialized in partial differential equations.",
    struggles:
      "Faced barriers as the first Swedish woman to venture into a male-dominated academic area.",
    image: "/images/louise_petren.png",
    quotes: [],
    artifacts: ["Thesis on partial differential equations"],
    impact:
      "Set a precedent for women pursuing higher education in mathematics in Sweden.",
    source: "https://en.wikipedia.org/wiki/Louise_Petrén",
    lat: 59.3293,
    lng: 18.0686,
  },
  {
    name: "Mildred Sanderson",
    categories: ["Mathematics"],
    birthYear: 1889,
    deathYear: 1914,
    location: "United States",
    contribution:
      "Known for her work on modular invariants, her PhD thesis included an important theorem on the subject.",
    struggles:
      "Died tragically young, limiting her potential contributions to mathematics.",
    image: "/images/mildred_sanderson.png",
    quotes: [],
    artifacts: ["Theorem on modular invariants"],
    impact:
      "Her work remains a critical reference in algebra and modular theory.",
    source: "https://en.wikipedia.org/wiki/Mildred_Sanderson",
    lat: 39.7392,
    lng: -104.9903,
  },
  {
    name: "Emmy Noether",
    categories: ["Mathematics", "Physics"],
    birthYear: 1882,
    deathYear: 1935,
    location: "Erlangen, Germany",
    contribution:
      "Developed Noether's theorem, linking symmetries and conservation laws in physics, a cornerstone of modern theoretical physics.",
    struggles:
      "Faced significant gender-based discrimination in Germany, with many academic institutions refusing to recognize her work.",
    image: "/images/emmy_noether.png",
    quotes: [
      "If one wants to understand the basic principles of mathematics, one must master the symbols and techniques in the field.",
    ],
    artifacts: ["Noether's Theorem"],
    impact:
      "Noether's Theorem continues to be fundamental in both mathematics and physics.",
    source: "https://en.wikipedia.org/wiki/Emmy_Noether",
    lat: 49.568,
    lng: 11.022,
  },
  {
    name: "Anna Pell-Wheeler",
    categories: ["Mathematics"],
    birthYear: 1883,
    deathYear: 1966,
    location: "United States",
    contribution:
      "First woman to present a lecture at the American Mathematical Society Colloquium.",
    struggles:
      "Had to work tirelessly to overcome barriers as a woman in academia during the early 20th century.",
    image: "/images/anna_pell_wheeler.png",
    quotes: [],
    artifacts: ["Lectures on integral equations"],
    impact:
      "Became a role model for women pursuing advanced studies in mathematics.",
    source: "https://en.wikipedia.org/wiki/Anna_Pell_Wheeler",
    lat: 38.9072,
    lng: -77.0369,
  },
  {
    name: "Cecilia Kreiger",
    categories: ["Mathematics"],
    birthYear: 1894,
    deathYear: 1974,
    location: "Canada",
    contribution:
      "First woman to earn a PhD in mathematics in Canada, focused on functional analysis.",
    struggles:
      "Faced numerous challenges as an immigrant and a woman in a male-dominated field.",
    image: "/images/cecilia_kreiger.png",
    quotes: [],
    artifacts: ["Thesis on functional analysis"],
    impact: "Opened doors for women in Canadian mathematics and academia.",
    source: "https://en.wikipedia.org/wiki/Cecilia_Krieger",
    lat: 43.6532,
    lng: -79.3832,
  },
  {
    name: "Mary Cartwright",
    categories: ["Mathematics"],
    birthYear: 1900,
    deathYear: 1998,
    location: "Northamptonshire, England",
    contribution:
      "Developed Cartwright's Theorem, which is key in understanding the behavior of analytic functions.",
    struggles:
      "Though brilliant, she had to overcome systemic gender barriers throughout her career.",
    image: "/images/mary_cartwright.png",
    quotes: [],
    artifacts: ["Cartwright's Theorem"],
    impact:
      "Her contributions are foundational in complex analysis and chaos theory.",
    source: "https://en.wikipedia.org/wiki/Mary_Cartwright",
    lat: 52.2405,
    lng: -0.9027,
  },
  {
    name: "Euphemia Haynes",
    categories: ["Mathematics"],
    birthYear: 1890,
    deathYear: 1980,
    location: "United States",
    contribution: "First African-American woman to earn a PhD in mathematics.",
    struggles:
      "Faced both racial and gender discrimination throughout her academic career.",
    image: "/images/euphemia_haynes.png",
    quotes: [],
    artifacts: ["Work on linear systems"],
    impact: "Paved the way for African-American women in STEM fields.",
    source: "https://en.wikipedia.org/wiki/Euphemia_Haynes",
    lat: 38.9072,
    lng: -77.0369,
  },
  {
    name: "Gladys West",
    categories: ["Mathematics"],
    birthYear: 1930,
    deathYear: null,
    location: "Virginia, United States",
    contribution:
      "Pioneered the calculations that directly impacted the development of the GPS system.",
    struggles:
      "As an African-American woman, she faced considerable systemic and racial barriers in her work.",
    image: "/images/gladys_west.png",
    quotes: ["If you persevere, you're going to succeed."],
    artifacts: ["Work on satellite data analysis"],
    impact:
      "Her contributions are integral to modern navigation systems, especially GPS.",
    source: "https://en.wikipedia.org/wiki/Gladys_West",
    lat: 37.4316,
    lng: -78.6569,
  },

  {
    name: "Aganice",
    categories: ["Astronomy", "Natural Philosophy"],
    birthYear: preprocessYear("c. 1900 BCE"),
    deathYear: preprocessYear("Unknown"),
    location: "Egypt",
    contribution:
      "An Egyptian princess, also known as Athyrta, worked on astronomy and natural philosophy during the Middle Kingdom period. Her contributions included studying celestial bodies and their movements.",
    struggles:
      "Little documentation of her work exists, and as a woman in ancient Egypt, her contributions may have been overshadowed by men in the royal court.",
    image: "/images/aganice.png",
    quotes: [],
    artifacts: [],
    impact:
      "Aganice was a pioneer in early astronomy, contributing to the understanding of celestial mechanics.",
    source: "https://pantheon.org/articles/a/aganice.html",
    lat: 26.8206,
    lng: 30.8025,
  },
  {
    name: "Hatshepsut",
    categories: ["Botany", "Medicine"],
    birthYear: preprocessYear("c. 1500 BCE"),
    deathYear: preprocessYear("1458 BCE"),
    location: "Egypt",
    contribution:
      "Promoted expeditions to Punt in search of medicinal plants. Often referred to as the Queen Doctor, she played a pivotal role in the advancement of herbal medicine.",
    struggles:
      "Faced resistance due to her status as a female pharaoh, an unusual role for a woman in ancient Egypt.",
    image: "/images/hatshepsut.png",
    quotes: [
      "I have raised up what was in ruins, I have restored that which was destroyed.",
    ],
    artifacts: ["Botanical specimens brought from Punt"],
    impact: "Her expeditions laid the groundwork for early botanical science.",
    source: "https://en.wikipedia.org/wiki/Hatshepsut",
    lat: 25.7189,
    lng: 32.6572,
  },
  {
    name: "Tapputi-Belatekallim",
    categories: ["Chemistry"],
    birthYear: preprocessYear("c. 1200 BCE"),
    deathYear: preprocessYear("Unknown"),
    location: "Babylon, Mesopotamia",
    contribution:
      "First recorded chemist, she developed perfume-making techniques, including distillation, mentioned in cuneiform tablets.",
    struggles:
      "As a woman in ancient Mesopotamia, she likely faced limitations in how her contributions were recorded and remembered.",
    image: "/images/tapputi_belatekallim.png",
    quotes: [],
    artifacts: ["Perfume recipes"],
    impact:
      "Tapputi's contributions are foundational to early chemistry and the development of perfume and distillation techniques.",
    source: "https://en.wikipedia.org/wiki/Tapputi",
    lat: 32.5402,
    lng: 44.42,
  },
  {
    name: "Theano",
    categories: ["Philosophy", "Mathematics"],
    birthYear: preprocessYear("c. 500 BCE"),
    deathYear: preprocessYear("Unknown"),
    location: "Greece",
    contribution:
      "Pythagorean philosopher known for her works on mathematics and ethics. Often associated with the Golden Mean.",
    struggles:
      "Like many women philosophers, her work was overshadowed by her male counterparts, particularly her husband, Pythagoras.",
    image: "/images/theano.png",
    quotes: ["Nothing too much."],
    artifacts: ["Writings on the Golden Mean"],
    impact:
      "Her contributions are central to the Pythagorean philosophy, influencing mathematics and ethical thought.",
    source: "https://en.wikipedia.org/wiki/Theano",
    lat: 37.9838,
    lng: 23.7275,
  },
  {
    name: "Aglaonice",
    categories: ["Astronomy"],
    birthYear: preprocessYear("c. 150 BCE"),
    deathYear: preprocessYear("Unknown"),
    location: "Thessaly, Greece",
    contribution:
      "First recorded female astronomer in ancient Greece, known for her ability to predict lunar eclipses, which was seen as magical by her contemporaries.",
    struggles:
      "She was regarded as a sorceress for her astronomical knowledge, illustrating the superstition surrounding science in ancient times.",
    image: "/images/aglaonice.png",
    quotes: [],
    artifacts: [],
    impact:
      "Aglaonice is credited with bridging astronomy and mythology, using her knowledge of lunar cycles to predict celestial events.",
    source: "https://en.wikipedia.org/wiki/Aglaonice",
    lat: 39.5556,
    lng: 22.9672,
  },
  {
    name: "Fang",
    categories: ["Alchemy"],
    birthYear: preprocessYear("1st century BCE"),
    deathYear: preprocessYear("Unknown"),
    location: "China",
    contribution:
      "First recorded Chinese female alchemist credited with discovering a method of transforming mercury into silver.",
    struggles:
      "As a woman in ancient China, her contributions were likely downplayed or lost over time.",
    image: "/images/fang_alchemist.png",
    quotes: [],
    artifacts: ["Alchemy notes on mercury and silver transformation"],
    impact:
      "Fang's work contributed to the early understanding of chemical processes in Chinese alchemy.",
    source: "https://en.wikipedia.org/wiki/Timeline_of_women_in_science",
    lat: 35.8617,
    lng: 104.1954,
  },
  {
    name: "Mary the Jewess",
    categories: ["Alchemy"],
    birthYear: preprocessYear("1st century CE"),
    deathYear: preprocessYear("Unknown"),
    location: "Alexandria, Egypt",
    contribution:
      "One of the earliest alchemists, known for inventing the bain-marie (double boiler) and contributions to practical alchemy.",
    struggles:
      "As an early female scientist, her work was often attributed to male alchemists.",
    image: "/images/mary_the_jewess.png",
    quotes: [
      "One becomes two, two becomes three, and out of the third comes the one as the fourth.",
    ],
    artifacts: ["Bain-marie apparatus"],
    impact:
      "Her work laid the foundations for modern chemistry, especially laboratory techniques.",
    source: "https://en.wikipedia.org/wiki/Mary_the_Jewess",
    lat: 31.2001,
    lng: 29.9187,
  },
  {
    name: "Cleopatra the Alchemist",
    categories: ["Chemistry", "Alchemy"],
    birthYear: preprocessYear("3rd century CE"),
    deathYear: preprocessYear("Unknown"),
    location: "Alexandria, Egypt",
    contribution:
      "An early figure in practical alchemy, credited with inventing the alembic, a device used in distillation.",
    struggles:
      "Her work in alchemy was often viewed through a mystical lens, minimizing her scientific contributions.",
    image: "/images/cleopatra_the_alchemist.png",
    quotes: [],
    artifacts: ["Alembic"],
    impact:
      "Cleopatra's invention of the alembic was a major advancement in the development of distillation techniques used in chemistry.",
    source: "https://en.wikipedia.org/wiki/Cleopatra_the_Alchemist",
    lat: 31.2001,
    lng: 29.9187,
  },

  {
    name: "Keng Hsien-Seng",
    categories: ["Chemistry", "Alchemy"],
    birthYear: preprocessYear("c. 975 CE"),
    deathYear: preprocessYear("Unknown"),
    location: "China",
    contribution:
      "A Chinese alchemist employed by the Royal Court, known for distilling perfumes and utilizing an early Soxhlet-like process for extracting camphor into alcohol. She was also skilled in extracting silver from ores using mercury.",
    struggles:
      "Little is known about her due to a lack of detailed historical records, which is a common issue for women in ancient Chinese alchemy.",
    image: "/images/keng_hsien_seng.png",
    quotes: [],
    artifacts: ["Early distillation equipment for perfumes and camphor"],
    impact:
      "Keng Hsien-Seng's contributions advanced the techniques of distillation and chemical extraction, which were crucial to later developments in chemistry.",
    source: "https://en.wikipedia.org/wiki/Timeline_of_women_in_science",
    lat: 35.8617,
    lng: 104.1954,
  },
  {
    name: "Al-ʻIjliyyah",
    categories: ["Engineering", "Astronomy"],
    birthYear: preprocessYear("10th century"),
    deathYear: preprocessYear("Unknown"),
    location: "Aleppo, Syria",
    contribution:
      "An astrolabe maker who worked for the court of Sayf al-Dawla. Her work contributed to the development of accurate astronomical devices used for navigation and observing the stars.",
    struggles:
      "As a woman working in the male-dominated field of engineering, her contributions were often minimized in historical records.",
    image: "/images/al_ijliyyah.png",
    quotes: [],
    artifacts: ["Astrolabes created for Sayf al-Dawla"],
    impact:
      "Her astrolabes were considered advanced for their time, and she played a significant role in the evolution of early astronomy and navigation tools.",
    source: "https://en.wikipedia.org/wiki/Al-ʻIjliyyah",
    lat: 36.2021,
    lng: 37.1343,
  },
  {
    name: "Dobrodeia of Kiev",
    categories: ["Medicine"],
    birthYear: preprocessYear("Unknown"),
    deathYear: 1131,
    location: "Kiev, Rus' (modern-day Ukraine)",
    contribution:
      "First woman to write a treatise on medicine in the Eastern Roman Empire. Her work focused on treating ailments of the body and skin.",
    struggles:
      "Her medical contributions were overshadowed by her political role as a princess and empress, which limited her recognition as a medical practitioner.",
    image: "/images/dobrodeia_of_kiev.png",
    quotes: [],
    artifacts: ["Treatise on medicine"],
    impact:
      "Dobrodeia’s work influenced early medieval medicine, particularly in Eastern Europe.",
    source: "https://en.wikipedia.org/wiki/Timeline_of_women_in_science",
    lat: 50.4501,
    lng: 30.5234,
  },
  {
    name: "Trota of Salerno",
    categories: ["Medicine"],
    birthYear: preprocessYear("11th century"),
    deathYear: preprocessYear("12th century"),
    location: "Salerno, Italy",
    contribution:
      "Compiled medical works focusing on women’s health and skin diseases. Her writings were widely used in medieval medical schools across Europe.",
    struggles:
      "Her works were sometimes attributed to male authors or overshadowed by other medieval male physicians.",
    image: "/images/trota_of_salerno.png",
    quotes: [],
    artifacts: ["Treatise on women’s health"],
    impact:
      "Trota’s medical texts became a staple in the Salerno School of Medicine and were used by practitioners throughout the Middle Ages.",
    source: "https://en.wikipedia.org/wiki/Trota_of_Salerno",
    lat: 40.6824,
    lng: 14.7681,
  },
  {
    name: "Adelle of the Saracens",
    categories: ["Medicine"],
    birthYear: preprocessYear("12th century"),
    deathYear: preprocessYear("Unknown"),
    location: "Salerno, Italy",
    contribution:
      "Taught at the Salerno School of Medicine, focusing on medical treatments and practices.",
    struggles:
      "Her contributions are largely undocumented, typical for women scholars of the period.",
    image: "/images/adelle_of_the_saracens.png",
    quotes: [],
    artifacts: [],
    impact:
      "Her teaching at the Salerno School contributed to the knowledge passed down through the generations in the field of medicine.",
    source: "https://en.wikipedia.org/wiki/Timeline_of_women_in_science",
    lat: 40.6824,
    lng: 14.7681,
  },
  {
    name: "Hildegard of Bingen",
    categories: ["Natural History", "Medicine", "Theology"],
    birthYear: 1098,
    deathYear: 1179,
    location: "Germany",
    contribution:
      "Considered a founder of scientific natural history in Germany, she wrote extensively on botany, medicine, and natural science.",
    struggles:
      "As a woman in a male-dominated religious institution, her scientific contributions were often overlooked in favor of her theological works.",
    image: "/images/hildegard_of_bingen.png",
    quotes: [
      "All living creatures are sparks from the radiation of God’s brilliance, emerging from God like the rays of the sun.",
    ],
    artifacts: ["Scivias, Physica (works on natural science)"],
    impact:
      "Her works in natural history and medicine were revolutionary for the time and continue to influence holistic medicine today.",
    source: "https://en.wikipedia.org/wiki/Hildegard_of_Bingen",
    lat: 49.9842,
    lng: 7.9266,
  },
  {
    name: "Herrad of Landsberg",
    categories: ["Natural History", "Science Compilation"],
    birthYear: 1130,
    deathYear: 1195,
    location: "Alsace, France",
    contribution:
      "Compiled the ‘Hortus deliciarum,’ a scientific and theological compendium.",
    struggles:
      "Her works were overshadowed by male scholars, and many of her writings were destroyed during the French Revolution.",
    image: "/images/herrad_of_landsberg.png",
    quotes: [],
    artifacts: ["Hortus deliciarum"],
    impact:
      "Herrad’s compendium was one of the first encyclopedic works combining scientific knowledge and theology.",
    source: "https://en.wikipedia.org/wiki/Herrad_of_Landsberg",
    lat: 48.3182,
    lng: 7.4416,
  },
  {
    name: "Adelmota of Carrara",
    categories: ["Medicine"],
    birthYear: preprocessYear("14th century"),
    deathYear: preprocessYear("Unknown"),
    location: "Padua, Italy",
    contribution:
      "A practicing physician known for her medical expertise during the Middle Ages.",
    struggles:
      "Documentation of her work is scarce, but her role as a female physician was notable in a time when women rarely practiced medicine.",
    image: "/images/adelmota_of_carrara.png",
    quotes: [],
    artifacts: [],
    impact:
      "Adelmota of Carrara helped pave the way for female physicians in medieval Italy.",
    source: "https://en.wikipedia.org/wiki/Timeline_of_women_in_science",
    lat: 45.4064,
    lng: 11.8768,
  },
  {
    name: "Damo",
    categories: ["Natural Philosophy"],
    birthYear: -600,
    deathYear: -550,
    location: "Greece",
    contribution:
      "A natural philosopher, known for her work in philosophy and early scientific thought.",
    struggles: "Her work was often overshadowed by her father, Pythagoras.",
    image: "/images/damo.png",
    quotes: [],
    artifacts: ["Philosophical teachings in early Greece"],
    impact:
      "Her contributions to natural philosophy were an early influence on scientific thought.",
    source: "https://en.wikipedia.org/wiki/Damo",
    lat: 38.2444,
    lng: 21.7344,
  },
  {
    name: "Diotima of Mantinea",
    categories: ["Philosophy"],
    birthYear: -400,
    deathYear: -350,
    location: "Mantinea, Greece",
    contribution:
      "A philosopher and scientist, known for her teachings on love and wisdom, mentioned in Plato’s Symposium.",
    struggles:
      "Her contributions were largely attributed to Plato, overshadowing her own work.",
    image: "/images/diotima_of_mantinea.png",
    quotes: ["Love is the ladder to wisdom."],
    artifacts: ["Philosophical discussions on love and knowledge"],
    impact:
      "She influenced Plato’s work and contributed to ancient Greek philosophy.",
    source: "https://en.wikipedia.org/wiki/Diotima_of_Mantinea",
    lat: 37.5829,
    lng: 22.3605,
  },
  {
    name: "Eccello of Lucania",
    categories: ["Mathematics", "Natural Philosophy"],
    birthYear: -500,
    deathYear: -450,
    location: "Lucania, Italy",
    contribution:
      "A Greek-Italian mathematician and philosopher, known for contributions to early mathematical thought and natural philosophy in the region of Lucania.",
    struggles:
      "Little is known about her life, but as a woman in ancient mathematics, she would have faced significant barriers to recognition and education.",
    image: "/images/eccello.png",
    quotes: [],
    artifacts: ["Early writings on natural philosophy"],
    impact:
      "Contributed to the development of mathematics and natural sciences in ancient Italy, though much of her work has been lost.",
    source:
      "https://en.wikipedia.org/wiki/Category:5th-century_BC_mathematicians",
    lat: 40.4776,
    lng: 15.7644,
  },
  {
    name: "Echecratia the Philiasian",
    categories: ["Mathematics", "Natural Philosophy"],
    birthYear: -500,
    deathYear: -450,
    location: "Italy",
    contribution:
      "Known for her work in mathematics and natural philosophy, she contributed to early scientific discussions in ancient Greece and Italy.",
    struggles:
      "Like many women in her field, her contributions were often overlooked in favor of male contemporaries.",
    image: "/images/echecratia.png",
    quotes: [],
    artifacts: ["Philosophical texts on early science"],
    impact:
      "Helped lay the foundations for future mathematical discoveries in the region.",
    source: "https://en.wikipedia.org/wiki/Echecratia_the_Philiasian",
    lat: 40.4623,
    lng: 15.7024,
  },
  {
    name: "Elephantis",
    categories: ["Medicine"],
    birthYear: -50,
    deathYear: 50,
    location: "Greece",
    contribution:
      "A physician known for her writings on obstetrics and gynecology, including detailed descriptions of childbirth techniques.",
    struggles: "Faced societal barriers to practicing medicine as a woman.",
    image: "/images/elephantis.png",
    quotes: [],
    artifacts: ["Medical texts on childbirth and obstetrics"],
    impact:
      "Her writings influenced future medical practices in the fields of obstetrics and gynecology.",
    source: "https://en.wikipedia.org/wiki/Elephantis",
    lat: 37.9838,
    lng: 23.7275,
  },
  {
    name: "Enheduanna",
    categories: ["Astronomy", "Poetry"],
    birthYear: -2285,
    deathYear: -2250,
    location: "Sumer (modern-day Iraq)",
    contribution:
      "A Sumerian high priestess and astronomer, she is one of the earliest known female astronomers and writers, contributing to early astronomical knowledge.",
    struggles:
      "As a woman in ancient Sumer, she likely faced significant limitations in her role despite her high status.",
    image: "/images/enheduanna.png",
    quotes: ["The true woman who possesses exceeding wisdom."],
    artifacts: ["Temple hymns and astronomical records"],
    impact:
      "Her contributions to astronomy and literature have made her one of the most important female figures in ancient history.",
    source: "https://en.wikipedia.org/wiki/Enheduanna",
    lat: 31.958,
    lng: 44.166,
  },
  {
    name: "Fabiola",
    categories: ["Medicine"],
    birthYear: 300,
    deathYear: 399,
    location: "Rome, Italy",
    contribution:
      "A Roman physician who established the first public hospital in Rome, contributing significantly to the field of healthcare in the Roman Empire.",
    struggles:
      "Faced challenges in expanding medical care to the poor and overcoming societal expectations of women in medicine.",
    image: "/images/fabiola.png",
    quotes: [],
    artifacts: ["Hospital structures and healthcare records"],
    impact:
      "Her work in healthcare helped lay the groundwork for modern hospital systems.",
    source: "https://en.wikipedia.org/wiki/Fabiola_(saint)",
    lat: 41.9028,
    lng: 12.4964,
  },
];

const seedDatabase = async () => {
  try {
    await Woman.deleteMany(); // Clear existing data
    await Woman.insertMany(women);
    console.log("Women data seeded successfully.");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error populating data: ", error);
    mongoose.connection.close();
  }
};

seedDatabase();
