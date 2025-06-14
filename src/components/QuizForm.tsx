
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, Check } from "lucide-react";

type FormValues = {
  craving: string;
  feelings: string[];
  scenes: string[];
  emotional_season: string;
  place_type: string;
};

const CRAVINGS = [
  "A fresh start",
  "Deep belonging",
  "Creative inspiration",
  "Emotional healing",
  "High-vibe adventure",
  "Peace and quiet",
  "Something else"
];

const FEELINGS = [
  "Expansive",
  "Cozy",
  "Wild",
  "Grounded",
  "Luxurious",
  "Playful",
  "Serene"
];

const SCENES = [
  "Mountains at sunrise",
  "Neon city nights",
  "Ocean cliffs",
  "Foggy forests",
  "Open desert roads",
  "Hidden cafes in old towns"
];

const EMOTIONAL_SEASONS = [
  "Shedding old skin",
  "Seeking my people",
  "Building something new",
  "Healing quietly",
  "Embracing chaos",
  "Romantic reinvention"
];

const PLACE_TYPES = [
  "Places where no one knows me",
  "Places full of stories and history",
  "Places with a buzz of creativity",
  "Nature-rich, slow-paced towns",
  "Global cities with cultural mashups"
];

export const QuizForm: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, control, formState: { errors }, setValue, watch } = useForm<FormValues>({
    defaultValues: {
      craving: "",
      feelings: [],
      scenes: [],
      emotional_season: "",
      place_type: ""
    }
  });

  const onSubmit = (data: FormValues) => {
    // Pass form data as state to the result page
    navigate("/result", { state: data });
  };

  // Multiselect helpers
  const feelings = watch("feelings");
  const scenes = watch("scenes");

  const toggleMultiSelect = (field: "feelings" | "scenes", value: string) => {
    const current = Array.from(new Set(watch(field) || []));
    if (current.includes(value)) {
      setValue(field, current.filter((v) => v !== value));
    } else {
      setValue(field, [...current, value]);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white/90 rounded-2xl shadow-2xl border border-muted px-8 py-10 flex flex-col gap-8 animate-fadeIn"
      style={{ animationDuration: "1.3s" }}
    >
      <h2 className="text-2xl md:text-3xl font-playfair font-semibold text-gray-900 text-center mb-6">
        Let’s begin the journey inward
      </h2>

      {/* 1. CRAVING */}
      <div>
        <Label className="block text-lg font-playfair mb-2 text-gray-800">
          What are you craving most right now?
          <span className="text-pink-600 ml-1">*</span>
        </Label>
        <div className="relative">
          <select
            {...register("craving", { required: true })}
            className="w-full bg-white border border-muted rounded-lg py-3 px-4 text-base focus:border-honey-dark shadow"
            required
            defaultValue=""
          >
            <option value="" disabled>
              Select an emotion...
            </option>
            {CRAVINGS.map((c) => (
              <option value={c} key={c}>
                {c}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute top-1/2 right-3 -translate-y-1/2 text-muted" size={22} />
        </div>
        {errors.craving && <p className="text-destructive text-sm mt-1">Please choose an answer.</p>}
      </div>

      {/* 2. FEELINGS */}
      <div>
        <Label className="block text-lg font-playfair mb-2 text-gray-800">
          How does your ideal day feel?
          <span className="text-pink-600 ml-1">*</span>
        </Label>
        <div className="flex flex-wrap gap-3">
          {FEELINGS.map((f) => (
            <button
              type="button"
              key={f}
              tabIndex={0}
              className={`rounded-full px-5 py-2 border transition
                ${feelings.includes(f)
                  ? "bg-honey-dark text-white border-honey-dark shadow-md"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-honey-light"}
              `}
              onClick={() => toggleMultiSelect("feelings", f)}
            >
              {feelings.includes(f) && (
                <Check size={18} className="mr-1 mb-0.5 text-white inline-block" />
              )}
              {f}
            </button>
          ))}
        </div>
        {errors.feelings && <p className="text-destructive text-sm mt-1">Select at least one.</p>}
      </div>

      {/* 3. SCENES */}
      <div>
        <Label className="block text-lg font-playfair mb-2 text-gray-800">
          Which scenes light up your soul?
          <span className="text-pink-600 ml-1">*</span>
        </Label>
        <div className="flex flex-wrap gap-3">
          {SCENES.map((s) => (
            <button
              type="button"
              key={s}
              tabIndex={0}
              className={`rounded-full px-5 py-2 border transition
                ${scenes.includes(s)
                  ? "bg-lavender-dark text-white border-lavender-dark shadow-md"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-lavender-light"}
              `}
              onClick={() => toggleMultiSelect("scenes", s)}
            >
              {scenes.includes(s) && (
                <Check size={18} className="mr-1 mb-0.5 text-white inline-block" />
              )}
              {s}
            </button>
          ))}
        </div>
        {errors.scenes && <p className="text-destructive text-sm mt-1">Select at least one.</p>}
      </div>

      {/* 4. EMOTIONAL SEASON */}
      <div>
        <Label className="block text-lg font-playfair mb-2 text-gray-800">
          What emotional season are you in?
          <span className="text-pink-600 ml-1">*</span>
        </Label>
        <div className="relative">
          <select
            {...register("emotional_season", { required: true })}
            className="w-full bg-white border border-muted rounded-lg py-3 px-4 text-base focus:border-blush-dark shadow"
            required
            defaultValue=""
          >
            <option value="" disabled>
              Choose your season...
            </option>
            {EMOTIONAL_SEASONS.map((es) => (
              <option value={es} key={es}>
                {es}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute top-1/2 right-3 -translate-y-1/2 text-muted" size={22} />
        </div>
        {errors.emotional_season && <p className="text-destructive text-sm mt-1">Please choose one.</p>}
      </div>

      {/* 5. PLACE TYPE */}
      <div>
        <Label className="block text-lg font-playfair mb-2 text-gray-800">
          What kind of places make you feel alive?
          <span className="text-pink-600 ml-1">*</span>
        </Label>
        <div className="relative">
          <select
            {...register("place_type", { required: true })}
            className="w-full bg-white border border-muted rounded-lg py-3 px-4 text-base focus:border-ocean-dark shadow"
            required
            defaultValue=""
          >
            <option value="" disabled>
              Choose a place type...
            </option>
            {PLACE_TYPES.map((pt) => (
              <option value={pt} key={pt}>
                {pt}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute top-1/2 right-3 -translate-y-1/2 text-muted" size={22} />
        </div>
        {errors.place_type && <p className="text-destructive text-sm mt-1">Please choose one.</p>}
      </div>

      <Button
        type="submit"
        className="mt-8 w-full py-3 rounded-full bg-blush-dark text-white font-semibold text-lg hover:bg-blush transition duration-200 shadow-lg"
        size="lg"
      >
        Reveal My Soul Country
      </Button>
    </form>
  );
};
