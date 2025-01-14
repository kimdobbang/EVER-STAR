import { createSlice } from '@reduxjs/toolkit';

interface cheeringState {
  cheeringInfo: CheeringInfo;
}

const initialState: cheeringState = {
  cheeringInfo: {
    //threeJs 고려 후 작성
  },
};

export interface CheeringInfo {
  //threeJs 고려 후 작성
}

export const cheeringSlice = createSlice({
  name: 'cheering',
  initialState,
  reducers: {
    //  응메 정보 저장 액션 (편지 읽기 : SetLetter)
    //응메 삭제 액션 (DeleteLetter)
  },
});

// export const {} = cheeringSlice.actions;

export default cheeringSlice.reducer;
