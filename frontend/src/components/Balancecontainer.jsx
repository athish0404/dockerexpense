const BalanceContainer = ({ transactions }) => {
  // Calculate total income
  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  // Calculate total expense (amounts are negative)
  const expense = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0);

  // Balance = income + expense (since expense is negative)
  const balance = income + expense;

  return (
    <div className="balance-container">
      <div className="current-item">
        <div className="title">Income</div>
        <div className="amount" style={{ color: "#4CAF50" }}>
          ₹{income}
        </div>
      </div>

      <div className="current-item">
        <div className="title">Expense</div>
        <div className="amount" style={{ color: "#F44336" }}>
          ₹{Math.abs(expense)} {/* show expense as positive */}
        </div>
      </div>

      <div className="current-item">
        <div className="title">Balance</div>
        <div className="amount" style={{ color: "#FFC107" }}>
          ₹{balance}
        </div>
      </div>
    </div>
  );
};

export default BalanceContainer;
