// src/store/slices/petSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pet, PetInfo } from 'api/petApi';

interface PetState {
  pets: Pet[];
  petDetails: PetInfo | null;
  selectedPetId: number | null;
}

const initialState: PetState = {
  pets: [],
  petDetails: null,
  selectedPetId: null,
};

const petSlice = createSlice({
  name: 'pets',
  initialState,
  reducers: {
    addPet: (state, action: PayloadAction<Pet>) => {
      state.pets.push(action.payload);
    },
    setPets: (state, action: PayloadAction<Pet[]>) => {
      state.pets = action.payload;
    },
    updatePet: (state, action: PayloadAction<Pet>) => {
      const index = state.pets.findIndex((pet) => pet.id === action.payload.id);
      if (index !== -1) {
        state.pets[index] = action.payload;
      }
    },
    removePet: (state, action: PayloadAction<number>) => {
      state.pets = state.pets.filter((pet) => pet.id !== action.payload);
    },
    setPetDetails: (state, action: PayloadAction<PetInfo>) => {
      state.petDetails = action.payload;
    },
    setSelectedPetId: (state, action: PayloadAction<number | null>) => {
      state.selectedPetId = action.payload;
    },
  },
});

export const { addPet, setPets, updatePet, removePet, setPetDetails, setSelectedPetId } =
  petSlice.actions;
export default petSlice.reducer;
