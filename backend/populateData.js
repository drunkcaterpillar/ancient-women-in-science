const mongoose = require("mongoose");
require("dotenv").config();
const Woman = require("./models/woman.model");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const women = [
  {
    name: "Hypatia",
    subject: "Mathematics",
    birthYear: 370,
    deathYear: 415,
    location: "Alexandria, Egypt",
    contribution: "Philosopher, mathematician, and astronomer",
    image: "/designer.png",
    quotes: [
      "Reserve your right to think, for even to think wrongly is better than not to think at all.",
    ],
    artifacts: ["Hypatia's Commentaries on Diophantus"],
    impact:
      "Influenced the development of mathematics and astronomy in the Hellenistic era.",
    lat: 31.2001,
    lng: 29.9187,
  },
  {
    name: "Ada Lovelace",
    subject: "Mathematics",
    birthYear: 1815,
    deathYear: 1852,
    location: "London, England",
    contribution: "Mathematician and writer, first computer programmer.",
    image: "/designer.png",
    quotes: [
      "That brain of mine is something more than merely mortal; as time will show.",
    ],
    artifacts: ["First Algorithm"],
    impact: "Pioneered the concept of a computing machine and algorithms.",
    lat: 51.5074,
    lng: -0.1278,
  },

  {
    name: "Aglaonice",
    subject: "Astronomy",
    birthYear: -200,
    deathYear: -150,
    location: "Thessaly, Greece",
    contribution:
      "First recorded female astronomer, known for predicting lunar eclipses.",
    image: "/designer.png",
    quotes: ["If I can predict the moon, why can’t I move the earth?"],
    artifacts: ["Records of lunar eclipse predictions"],
    impact: "Paved the way for future women in astronomy.",
    lat: 39.5559,
    lng: 22.3495,
  },
  {
    name: "Fatima al-Fihri",
    subject: "Education",
    birthYear: 800,
    deathYear: 880,
    location: "Fez, Morocco",
    contribution:
      "Founder of the University of Al Quaraouiyine, the world's oldest existing, continually operating university.",
    image: "/designer.png",
    quotes: [
      "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.",
    ],
    artifacts: ["University of Al Quaraouiyine"],
    impact:
      "Her institution became a leading spiritual and educational center in the Muslim world.",
    lat: 34.0331,
    lng: -5.0003,
  },
  {
    name: "Gargi Vachaknavi",
    subject: "Philosophy",
    birthYear: -700,
    deathYear: -600,
    location: "Mithila, India",
    contribution: "Philosopher and author of the Vedic scriptures.",
    image: "/designer.png",
    quotes: ["What is the true essence of reality?"],
    artifacts: ["Brihadaranyaka Upanishad"],
    impact: "Her teachings are fundamental to Indian philosophy.",
    lat: 26.3286,
    lng: 86.0727,
  },
  {
    name: "Hypatia",
    subject: "Mathematics",
    birthYear: 370,
    deathYear: 415,
    location: "Alexandria, Egypt",
    contribution: "Philosopher, mathematician, and astronomer.",
    image: "/designer.png",
    quotes: [
      "Reserve your right to think, for even to think wrongly is better than not to think at all.",
    ],
    artifacts: ["Hypatia's Commentaries on Diophantus"],
    impact:
      "Influenced the development of mathematics and astronomy in the Hellenistic era.",
    lat: 31.2001,
    lng: 29.9187,
  },
  {
    name: "Maria Agnesi",
    subject: "Mathematics",
    birthYear: 1718,
    deathYear: 1799,
    location: "Milan, Italy",
    contribution:
      "First woman to write a mathematics handbook and the first to be appointed as a mathematics professor at a university.",
    image: "/designer.png",
    quotes: [
      "I am no longer concerned about the temporal difficulties and constraints, but only about the pure truth.",
    ],
    artifacts: ["Instituzioni analitiche"],
    impact: "Pioneered early calculus and curve studies.",
    lat: 45.4642,
    lng: 9.19,
  },
  {
    name: "Merit-Ptah",
    subject: "Medicine",
    birthYear: -2700,
    deathYear: -2600,
    location: "Saqqara, Egypt",
    contribution: "First known female physician in history.",
    image: "/designer.png",
    quotes: ["Healing comes from within; the art is to awaken it."],
    artifacts: ["Hieroglyphic inscriptions"],
    impact: "Her work laid foundations for ancient Egyptian medicine.",
    lat: 29.8711,
    lng: 31.2164,
  },
  {
    name: "Miriam the Alchemist",
    subject: "Alchemy",
    birthYear: 1,
    deathYear: 50,
    location: "Alexandria, Egypt",
    contribution: "Pioneered several alchemical apparatus and techniques.",
    image: "/designer.png",
    quotes: [
      "Alchemy is the art of transmutation, the realization of one’s full potential.",
    ],
    artifacts: ["Miriam’s Distillation Apparatus"],
    impact: "Her inventions are still used in modern chemistry labs.",
    lat: 31.2001,
    lng: 29.9187,
  },
  {
    name: "Sophie Germain",
    subject: "Mathematics",
    birthYear: 1776,
    deathYear: 1831,
    location: "Paris, France",
    contribution:
      "Made significant contributions to number theory and elasticity theory.",
    image: "/designer.png",
    quotes: [
      "It matters little who first arrives at an idea, rather what is significant is how far that idea can go.",
    ],
    artifacts: ["Germain’s Proof on Fermat’s Last Theorem"],
    impact: "Her work paved the way for modern mathematical physics.",
    lat: 48.8566,
    lng: 2.3522,
  },
  {
    name: "Theano",
    subject: "Mathematics",
    birthYear: -546,
    deathYear: -480,
    location: "Croton, Italy",
    contribution: "Pythagorean philosopher and mathematician.",
    image: "/designer.png",
    quotes: [
      "All is number; know the numbers and you shall know the universe.",
    ],
    artifacts: ["Theano’s Writings on Pythagoreanism"],
    impact: "Advanced the understanding of mathematics and philosophy.",
    lat: 39.0802,
    lng: 17.1276,
  },
  {
    name: "Trotula of Salerno",
    subject: "Medicine",
    birthYear: 1090,
    deathYear: 1160,
    location: "Salerno, Italy",
    contribution: "Wrote medical texts on women’s health and treatment.",
    image: "/designer.png",
    quotes: [
      "The well-being of the mother is the foundation of the family's health.",
    ],
    artifacts: ["Trotula Major and Trotula Minor"],
    impact:
      "Considered the first gynecologist, her texts were used for centuries.",
    lat: 40.6824,
    lng: 14.7681,
  },
  {
    name: "Wang Zhenyi",
    subject: "Astronomy",
    birthYear: 1768,
    deathYear: 1797,
    location: "Anhui, China",
    contribution:
      "Made significant contributions in astronomy, mathematics, and poetry.",
    image: "/designer.png",
    quotes: ["It is not difficult to see the heavens, if you have the heart."],
    artifacts: ["Theories on Lunar Eclipses"],
    impact: "Broke barriers for women in science during the Qing dynasty.",
    lat: 31.8257,
    lng: 117.2264,
  },
  {
    name: "Yayoi Kiyose",
    subject: "Chemistry",
    birthYear: 1883,
    deathYear: 1950,
    location: "Tokyo, Japan",
    contribution: "Pioneer in polymer chemistry and the study of cellulose.",
    image: "/designer.png",
    quotes: ["The beauty of chemistry is in its transformation."],
    artifacts: ["Studies on Cellulose"],
    impact: "Her research contributed significantly to material science.",
    lat: 35.6895,
    lng: 139.6917,
  },
  {
    name: "Dorothy Vaughan",
    subject: "Mathematics",
    birthYear: 1910,
    deathYear: 2008,
    location: "Kansas City, Missouri, USA",
    contribution:
      "Mathematician and human computer at NASA, contributed to space flight calculations.",
    image: "/designer.png",
    quotes: ["I changed what I could, and what I couldn't, I endured."],
    artifacts: ["Calculations for Mercury and Apollo missions"],
    impact: "Pioneered the use of electronic computers at NASA.",
    lat: 39.0997,
    lng: -94.5786,
  },
  {
    name: "Katherine Johnson",
    subject: "Mathematics",
    birthYear: 1918,
    deathYear: 2020,
    location: "White Sulphur Springs, West Virginia, USA",
    contribution:
      "Mathematician whose calculations of orbital mechanics were critical to the success of the first and subsequent U.S. manned spaceflights.",
    image: "/designer.png",
    quotes: ["Like what you do, and then you will do your best."],
    artifacts: ["Calculations for John Glenn's orbital mission"],
    impact:
      "Her work helped ensure the success of the first U.S. manned spaceflights.",
    lat: 37.796,
    lng: -80.3062,
  },
  {
    name: "Rosalind Franklin",
    subject: "Biophysics",
    birthYear: 1920,
    deathYear: 1958,
    location: "London, England",
    contribution:
      "Her work on X-ray diffraction was critical to understanding the molecular structures of DNA.",
    image: "/designer.png",
    quotes: ["Science and everyday life cannot and should not be separated."],
    artifacts: ["X-ray diffraction images of DNA"],
    impact: "Her photographs led to the discovery of the DNA double helix.",
    lat: 51.5074,
    lng: -0.1278,
  },
  {
    name: "Emmy Noether",
    subject: "Mathematics",
    birthYear: 1882,
    deathYear: 1935,
    location: "Erlangen, Germany",
    contribution:
      "Developed Noether's Theorem which is fundamental in theoretical physics.",
    image: "/designer.png",
    quotes: [
      "If I could prove it, it would be the most beautiful thing in the world.",
    ],
    artifacts: ["Noether's Theorem"],
    impact: "Revolutionized abstract algebra and theoretical physics.",
    lat: 49.5898,
    lng: 11.006,
  },
  {
    name: "Mary Anning",
    subject: "Paleontology",
    birthYear: 1799,
    deathYear: 1847,
    location: "Lyme Regis, England",
    contribution: "Discovered the first complete Ichthyosaurus fossil.",
    image: "/designer.png",
    quotes: [
      "The world has used me so unkindly, I fear it has made me suspicious of everyone.",
    ],
    artifacts: ["Ichthyosaurus Fossil"],
    impact:
      "Her discoveries contributed to the understanding of prehistoric life.",
    lat: 50.7278,
    lng: -2.9378,
  },
];

const populate = async () => {
  try {
    await Woman.deleteMany({});
    await Woman.insertMany(women);
    console.log("Data population successful");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error populating data: ", error);
  }
};

populate();
