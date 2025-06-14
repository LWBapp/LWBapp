
export const QUESTIONS: {
  question: string;
  options: { label: string; value: string; countryKey: string }[];
}[] = [
  {
    question: "1. What does your inner chaos look like?",
    options: [
      { label: "Loud, passionate, and colorful", value: "a", countryKey: "brazil" },
      { label: "Quiet, mysterious, and intense", value: "b", countryKey: "iceland" },
      { label: "Energetic, creative, ever-changing", value: "c", countryKey: "japan" },
      { label: "Orderly, thoughtful, but with wild streaks", value: "d", countryKey: "switzerland" },
      { label: "Dreamy, poetic, unpredictable", value: "e", countryKey: "ireland" },
    ],
  },
  {
    question: "2. You’re at your messiest when:",
    options: [
      { label: "Your feelings explode out of you", value: "a", countryKey: "brazil" },
      { label: "You isolate & go cold", value: "b", countryKey: "iceland" },
      { label: "You jump into new projects & leave a creative wake", value: "c", countryKey: "japan" },
      { label: "You stress-clean or overthink everything", value: "d", countryKey: "switzerland" },
      { label: "You write a poem/novel/manifesto in your head at 2am", value: "e", countryKey: "ireland" },
    ],
  },
  {
    question: "3. Your friends describe you as:",
    options: [
      { label: "Expressive, vibrant, funny", value: "a", countryKey: "brazil" },
      { label: "Elusive, enigmatic, intriguing", value: "b", countryKey: "iceland" },
      { label: "Inventive, quirky, surprising", value: "c", countryKey: "japan" },
      { label: "Reliable, calm, with a playful secret side", value: "d", countryKey: "switzerland" },
      { label: "Romantic, soulful, a little unhinged", value: "e", countryKey: "ireland" },
    ],
  },
  {
    question: "4. A perfect day reinventing yourself is:",
    options: [
      { label: "Dancing until sunrise", value: "a", countryKey: "brazil" },
      { label: "A solo hike, lost in thought", value: "b", countryKey: "iceland" },
      { label: "Learning a new craft/art/skill", value: "c", countryKey: "japan" },
      { label: "Planning a mini-adventure (with snacks packed)", value: "d", countryKey: "switzerland" },
      { label: "Spontaneous road trip with friends and good music", value: "e", countryKey: "ireland" },
    ],
  },
  {
    question: "5. Your chaos superpower is:",
    options: [
      { label: "Joyful intensity", value: "a", countryKey: "brazil" },
      { label: "Deep introspection", value: "b", countryKey: "iceland" },
      { label: "Reinvention", value: "c", countryKey: "japan" },
      { label: "Hidden passion, strong boundaries", value: "d", countryKey: "switzerland" },
      { label: "Magnetic imagination", value: "e", countryKey: "ireland" },
    ],
  },
];
