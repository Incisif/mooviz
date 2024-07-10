export default function formatBudget(budget) {
    if (budget >= 1000000000) {
      return Math.round(budget / 1000000000) + "B";
    }
    else if (budget >= 1000000) {
      return Math.round(budget / 1000000) + "M";
    }
    else if (budget >= 1000) {
      return Math.round(budget / 1000) + "K";
    }
    return budget.toString();
  }
  
  