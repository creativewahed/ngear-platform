import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tenant } from '@ngear/types';

interface TenantState {
  currentTenant: Tenant | null;
  tenants: Tenant[];
  isLoading: boolean;
}

const initialState: TenantState = {
  currentTenant: null,
  tenants: [],
  isLoading: false,
};

const tenantSlice = createSlice({
  name: 'tenant',
  initialState,
  reducers: {
    setCurrentTenant: (state, action: PayloadAction<Tenant>) => {
      state.currentTenant = action.payload;
    },
    setTenants: (state, action: PayloadAction<Tenant[]>) => {
      state.tenants = action.payload;
    },
    addTenant: (state, action: PayloadAction<Tenant>) => {
      state.tenants.push(action.payload);
    },
    updateTenant: (state, action: PayloadAction<Tenant>) => {
      const index = state.tenants.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.tenants[index] = action.payload;
      }
      if (state.currentTenant?.id === action.payload.id) {
        state.currentTenant = action.payload;
      }
    },
    removeTenant: (state, action: PayloadAction<string>) => {
      state.tenants = state.tenants.filter(t => t.id !== action.payload);
      if (state.currentTenant?.id === action.payload) {
        state.currentTenant = null;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setCurrentTenant,
  setTenants,
  addTenant,
  updateTenant,
  removeTenant,
  setLoading,
} = tenantSlice.actions;

export default tenantSlice.reducer;