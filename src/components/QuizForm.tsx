
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, Check } from "lucide-react";

type FormValues = {
  about_you: string; // Q1
  energy_craving: string; // Q2
  environment: string; // Q3
  climate: string; // Q4
  stimulation: string; // Q5
  cultural_energy: string; // Q6
  ideal_day: string; // Q7
  structure_spontaneity: string; // Q8
  people: string; // Q9
};

const ENERGY_CRAVING = [
  "A fresh start",
  "Deeper connection",
  "More creative energy",
  "Peace and spaciousness",
  "A sense of adventure",
  "To rebuild or reimagine myself",
];

const ENVIRONMENTS = [
  {
    label: "Lush forests and lakes",
    value: "Lush forests and lakes",
    // img: "your-img-path" // Consider adding images in future!
  },
  {
    label: "Open deserts and stillness",
    value: "Open deserts and stillness",
  },
  {
    label: "Salty ocean air and crashing waves",
    value: "Salty ocean air and crashing waves",
  },
  {
    label: "Cozy hills, vineyards, and countryside",
    value: "Cozy hills, vineyards, and countryside",
  },
  {
    label: "Buzzing cities full of culture and color",
    value: "Buzzing cities full of culture and color",
  },
  {
    label: "High mountains and clean alpine air",
    value: "High mountains and clean alpine air",
  },
];

const CLIMATES = [
  "Warm and sunny",
  "Cool and misty",
  "Four distinct seasons",
  "Tropical and humid",
  "I don’t mind — it’s more about the energy",
];

const STIMULATION = [
  "High — I love vibrant places with lots happening",
  "Medium — I like variety but need rest",
  "Low — I need stillness to feel like myself",
];

const CULTURAL_ENERGY = [
  "Creative, expressive, and colorful",
  "Intellectual and thoughtful",
  "Grounded, warm, and communal",
  "Independent and self-reflective",
  "Fast-paced and ambitious",
  "Soft, spiritual, and slow",
];

const IDEAL_DAY = [
  "In a café in a beautiful historic city",
  "On a trail or in the woods",
  "Watching waves crash near a quiet beach",
  "Wandering a market full of color and life",
  "Working from a cozy home in the countryside",
  "In a place I’ve never been, letting the day unfold",
];

const STRUCTURE_SPONTANEITY = [
  "Structure — I feel good with routines",
  "Spontaneity — I follow where the day takes me",
  "A bit of both",
];

const PEOPLE = [
  "Artists, creatives, free spirits",
  "Deep thinkers and listeners",
  "Hustlers, doers, energetic people",
  "Warm, generous, grounded humans",
  "Curious wanderers and fellow seekers",
];

export const QuizForm: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, watch } =
    useForm<FormValues>({
      defaultValues: {
        about_you: "",
        energy_craving: "",
        environment: "",
        climate: "",
        stimulation: "",
        cultural_energy: "",
        ideal_day: "",
        structure_spontaneity: "",
        people: "",
      },
    });

  const onSubmit = (data: FormValues) => {
    navigate("/result", { state: data });
  };

  // UI helpers
  const environmentValue = watch("environment");
  const idealDayValue = watch("ideal_day");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white/90 rounded-2xl shadow-2xl border border-muted px-8 py-10 flex flex-col gap-8 animate-fadeIn"
      style={{ animationDuration: "1.3s" }}
    >
      {/* Intro */}
      <div>
        <h2 className="text-2xl md:text-3xl font-playfair font-semibold text-gray-900 text-center mb-4">
          Onboarding Quiz
        </h2>
        <p className="text-base text-charcoal-soft text-center max-w-xl mx-auto mb-6">
          ✨ Let’s find the place that mirrors who you are — not just where you want to go, but where you might finally feel at home.<br /><br />
          This isn’t about tourist guides or expat hotspots. This is about energy, emotion, reinvention.<br /><br />
          Answer with your gut. There are no wrong answers.
        </p>
      </div>

      {/* 1. Who are you, right now? */}
      <div>
        <Label className="block text-lg font-playfair mb-2 text-gray-800">
          🧬 Who are you, right now?
        </Label>
        <Input
          type="text"
          {...register("about_you")}
          placeholder="(Optional) A sentence or two about what you're craving, healing, or hoping for…"
          className="mt-1"
        />
        <p className="text-sm text-muted-foreground mt-2">
          You can share anything you want your “soul country” to understand about you.
        </p>
      </div>

      {/* 2. What energy are you craving in this season of life? */}
      <div>
        <Label className="block text-lg font-playfair mb-2 text-gray-800">
          💫 What energy are you craving in this season of life? <span className="text-pink-600">*</span>
        </Label>
        <div className="flex flex-col gap-2">
          {ENERGY_CRAVING.map((option) => (
            <label
              key={option}
              className={`flex items-center gap-3 px-4 py-2 rounded-md border cursor-pointer transition
                ${
                  watch("energy_craving") === option
                    ? "bg-honey-dark text-white border-honey-dark shadow"
                    : "bg-white border-gray-300 text-gray-800 hover:bg-honey-light"
                }
              `}
            >
              <input
                type="radio"
                value={option}
                {...register("energy_craving", { required: true })}
                className="form-radio accent-soul-purple"
              />
              {option}
            </label>
          ))}
        </div>
        {errors.energy_craving && (
          <p className="text-destructive text-sm mt-1">Please choose one.</p>
        )}
      </div>

      {/* 3. What kind of environment makes you feel most alive? */}
      <div>
        <Label className="block text-lg font-playfair mb-2 text-gray-800">
          🌱 What kind of environment makes you feel most alive? <span className="text-pink-600">*</span>
        </Label>
        <div className="flex flex-wrap gap-3">
          {ENVIRONMENTS.map((env) => (
            <button
              type="button"
              key={env.value}
              tabIndex={0}
              onClick={() =>
                // Since this is required, clicking sets the radio value
                (document.getElementsByName("environment")).forEach((el: any) => {
                  if (el.value === env.value) el.checked = true;
                }) ||
                // Set form value for react-hook-form watcher
                (typeof window !== "undefined" && document.activeElement?.blur(), 
                  (document.activeElement as HTMLElement)?.blur?.(), 
                  window.requestAnimationFrame(() =>
                    window.dispatchEvent(new Event("input"))
                  ),
                  // Register the radio
                  (document as any).activeElement?.focus?.())
                ||
                null ||
                register("environment", { required: true }).onChange({
                  target: { value: env.value },
                })
              }
              className={`rounded-full px-5 py-2 border transition
                ${environmentValue === env.value
                  ? "bg-lavender-dark text-white border-lavender-dark shadow-md"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-lavender-light"}
              `}
              style={{ minWidth: "200px" }}
            >
              <input
                type="radio"
                name="environment"
                value={env.value}
                {...register("environment", { required: true })}
                checked={environmentValue === env.value}
                onChange={() => {}}
                className="hidden"
                aria-label={env.label}
              />
              {environmentValue === env.value && (
                <Check size={18} className="mr-1 mb-0.5 text-white inline-block" />
              )}
              {env.label}
            </button>
          ))}
        </div>
        {errors.environment && (
          <p className="text-destructive text-sm mt-1">Please choose one.</p>
        )}
      </div>

      {/* 4. What climate feels right for your soul? */}
      <div>
        <Label className="block text-lg font-playfair mb-2 text-gray-800">
          🌤️ What climate feels right for your soul? <span className="text-pink-600">*</span>
        </Label>
        <div className="flex flex-col gap-2">
          {CLIMATES.map((option) => (
            <label
              key={option}
              className={`flex items-center gap-3 px-4 py-2 rounded-md border cursor-pointer transition
                ${
                  watch("climate") === option
                    ? "bg-blush-dark text-white border-blush-dark shadow"
                    : "bg-white border-gray-300 text-gray-800 hover:bg-blush-peach"
                }
              `}
            >
              <input
                type="radio"
                value={option}
                {...register("climate", { required: true })}
                className="form-radio accent-soul-purple"
              />
              {option}
            </label>
          ))}
        </div>
        {errors.climate && (
          <p className="text-destructive text-sm mt-1">Please choose one.</p>
        )}
      </div>

      {/* 5. How much stimulation do you enjoy in daily life? */}
      <div>
        <Label className="block text-lg font-playfair mb-2 text-gray-800">
          🔊 How much stimulation do you enjoy in daily life? <span className="text-pink-600">*</span>
        </Label>
        <div className="flex flex-col gap-2">
          {STIMULATION.map((option) => (
            <label
              key={option}
              className={`flex items-center gap-3 px-4 py-2 rounded-md border cursor-pointer transition
                ${
                  watch("stimulation") === option
                    ? "bg-lavender-dark text-white border-lavender-dark shadow"
                    : "bg-white border-gray-300 text-gray-800 hover:bg-lavender-mist"
                }
              `}
            >
              <input
                type="radio"
                value={option}
                {...register("stimulation", { required: true })}
                className="form-radio accent-soul-purple"
              />
              {option}
            </label>
          ))}
        </div>
        {errors.stimulation && (
          <p className="text-destructive text-sm mt-1">Please choose one.</p>
        )}
      </div>

      {/* 6. What kind of cultural energy do you feel most at home in? */}
      <div>
        <Label className="block text-lg font-playfair mb-2 text-gray-800">
          🎭 What kind of cultural energy do you feel most at home in?
          <span className="text-pink-600">*</span>
        </Label>
        <div className="flex flex-col gap-2">
          {CULTURAL_ENERGY.map((option) => (
            <label
              key={option}
              className={`flex items-center gap-3 px-4 py-2 rounded-md border cursor-pointer transition
                ${
                  watch("cultural_energy") === option
                    ? "bg-honey-dark text-white border-honey-dark shadow"
                    : "bg-white border-gray-300 text-gray-800 hover:bg-honey-light"
                }
              `}
            >
              <input
                type="radio"
                value={option}
                {...register("cultural_energy", { required: true })}
                className="form-radio accent-soul-purple"
              />
              {option}
            </label>
          ))}
        </div>
        {errors.cultural_energy && (
          <p className="text-destructive text-sm mt-1">Please choose one.</p>
        )}
      </div>

      {/* 7. When you picture your ideal day, where are you? */}
      <div>
        <Label className="block text-lg font-playfair mb-2 text-gray-800">
          ⏳ When you picture your ideal day, where are you? <span className="text-pink-600">*</span>
        </Label>
        <div className="flex flex-wrap gap-3">
          {IDEAL_DAY.map((place) => (
            <button
              type="button"
              key={place}
              tabIndex={0}
              onClick={() =>
                // Set value for react-hook-form watcher
                (document.getElementsByName("ideal_day")).forEach((el: any) => {
                  if (el.value === place) el.checked = true;
                }) ||
                register("ideal_day", { required: true }).onChange({
                  target: { value: place },
                })
              }
              className={`rounded-full px-5 py-2 border transition
                ${idealDayValue === place
                  ? "bg-peach-puff text-charcoal border-peach-puff shadow-md"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-soft-apricot"}
              `}
              style={{ minWidth: "200px" }}
            >
              <input
                type="radio"
                name="ideal_day"
                value={place}
                {...register("ideal_day", { required: true })}
                checked={idealDayValue === place}
                onChange={() => {}}
                className="hidden"
                aria-label={place}
              />
              {idealDayValue === place && (
                <Check size={18} className="mr-1 mb-0.5 text-charcoal inline-block" />
              )}
              {place}
            </button>
          ))}
        </div>
        {errors.ideal_day && (
          <p className="text-destructive text-sm mt-1">Please choose one.</p>
        )}
      </div>

      {/* 8. Do you lean more toward structure or spontaneity? */}
      <div>
        <Label className="block text-lg font-playfair mb-2 text-gray-800">
          🧭 Do you lean more toward structure or spontaneity? <span className="text-pink-600">*</span>
        </Label>
        <div className="flex flex-col gap-2">
          {STRUCTURE_SPONTANEITY.map((option) => (
            <label
              key={option}
              className={`flex items-center gap-3 px-4 py-2 rounded-md border cursor-pointer transition
                ${
                  watch("structure_spontaneity") === option
                    ? "bg-soul-purple text-white border-soul-purple shadow"
                    : "bg-white border-gray-300 text-gray-800 hover:bg-lavender-mist"
                }
              `}
            >
              <input
                type="radio"
                value={option}
                {...register("structure_spontaneity", { required: true })}
                className="form-radio accent-soul-purple"
              />
              {option}
            </label>
          ))}
        </div>
        {errors.structure_spontaneity && (
          <p className="text-destructive text-sm mt-1">Please choose one.</p>
        )}
      </div>

      {/* 9. What kinds of people do you feel most alive around? */}
      <div>
        <Label className="block text-lg font-playfair mb-2 text-gray-800">
          🤝 What kinds of people do you feel most alive around? <span className="text-pink-600">*</span>
        </Label>
        <div className="flex flex-col gap-2">
          {PEOPLE.map((option) => (
            <label
              key={option}
              className={`flex items-center gap-3 px-4 py-2 rounded-md border cursor-pointer transition
                ${
                  watch("people") === option
                    ? "bg-corral-pink text-white border-coral-pink shadow"
                    : "bg-white border-gray-300 text-gray-800 hover:bg-peach-puff"
                }
              `}
            >
              <input
                type="radio"
                value={option}
                {...register("people", { required: true })}
                className="form-radio accent-soul-purple"
              />
              {option}
            </label>
          ))}
        </div>
        {errors.people && (
          <p className="text-destructive text-sm mt-1">Please choose one.</p>
        )}
      </div>

      {/* Final CTA */}
      <div className="text-center mt-6">
        <p className="font-playfair text-lg mb-4">
          That’s it! Your answers are weaving together a place that mirrors the version of you that’s ready to emerge.
        </p>
        <Button
          type="submit"
          className="mt-4 w-full py-3 rounded-full bg-blush-dark text-white font-semibold text-lg hover:bg-blush transition duration-200 shadow-lg"
          size="lg"
        >
          Let’s find your soul country ✈️
        </Button>
      </div>
    </form>
  );
};

// NOTE: This file is over 250 lines and getting long! Please consider asking me to refactor it into smaller, maintainable components.
