import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { fetchBudget } from "../../utils/budget-utils"

const Budget = () => {
  const {budget, setBudget} = useContext(AppContext)

  // Fetch expenses on component mount
  useEffect(() => {
    loadBudget();
    }, []);
  
  // Function to load expenses and handle errors
  const loadBudget = async () => {
  try {
    const budget = await fetchBudget();
    setBudget(budget);
  } catch (err: any) {
    console.log(err.message);
  }
  };

  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      <div data-testid="Budget">Budget: ${budget}</div>
    </div>
  );
};

export default Budget;
