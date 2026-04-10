export interface TripExpenseDetail {
  id: number;
  expenseTypeId: number;
  expenseTypeCode: string;
  amount: number;
  description?: string | null;
}

export interface TripExpense {
  id: number;
  tripId: number;
  totalAmount: number;
  notes?: string | null;
  details: TripExpenseDetail[];
}

export interface TripExpensePayload {
  Notes?: string;
  Details: {
    ExpenseTypeId: number;
    Amount: number;
    Description?: string;
  }[];
}
