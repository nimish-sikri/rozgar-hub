import citiesList from "@/lib/cities-list";
import { forwardRef, useMemo, useState } from "react";
import { Input } from "./ui/input";
    
interface LocationInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onLocationSelected: (location: string) => void;
  }
  
  export default forwardRef<HTMLInputElement, LocationInputProps>(function LocationInput({ onLocationSelected, ...props }, ref) {


  const [locationSearchInput, setLocationSearchInput] = useState(""); //stores the input value for searching locations.
  const [hasFocus, setHasFocus] = useState(false); //tracks whether the input field has focus.

    //This prevents unnecessary re-computation of the cities list on every render.
    const cities = useMemo(() => {
        // Memoized logic for filtering cities based on search input
        if (!locationSearchInput.trim()) return [];

        const searchWords = locationSearchInput.split(" ");
  
        return citiesList
          .map((city) => `${city.name}, ${city.subcountry}, ${city.country}`)
          .filter(
            (city) =>
              city.toLowerCase().startsWith(searchWords[0].toLowerCase()) &&
              searchWords.every((word) =>
                city.toLowerCase().includes(word.toLowerCase()),
              ),
          )
          .slice(0, 5);
      }, [locationSearchInput]);
      
      return (
        <div className="relative">
          <Input
            placeholder="Search for a city..."
            type="search"
            value={locationSearchInput}
            onChange={(e) => setLocationSearchInput(e.target.value)}
            onFocus={() => setHasFocus(true)}
            onBlur={() => setHasFocus(false)}
            {...props}
            ref={ref}
          />
          {/* Render dropdown if search input is not empty and input is focused */}
          {locationSearchInput.trim() && hasFocus && (
            <div className="absolute z-20 w-full divide-y rounded-b-lg border-x border-b bg-background shadow-xl">
              {!cities.length && <p className="p-3">No results found.</p>}
              {/* Map through the filtered cities array and render each city as a button in the dropdown menu. */}
              {cities.map((city) => (
                <button
                  key={city}
                  className="block w-full p-2 text-start"
                //   Attach an onMouseDown event handler to each button to handle city selection and clearing the input field.
                  onMouseDown={(e) => {
                    e.preventDefault();
                    onLocationSelected(city);
                    setLocationSearchInput("");
                  }}
                >
                  {city}
                </button>
              ))}
            </div>
          )}
        </div>
      );
    },
  );
  
  