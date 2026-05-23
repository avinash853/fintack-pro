import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Analytics({ expenses }) {

  const categoryData = [];

  const categories = {};

  expenses.forEach((expense) => {

    if (categories[expense.category]) {
      categories[expense.category] += expense.amount;
    } else {
      categories[expense.category] = expense.amount;
    }

  });

  for (let key in categories) {
    categoryData.push({
      name: key,
      value: categories[key],
    });
  }

  const COLORS = [
    "#00C49F",
    "#FF8042",
    "#0088FE",
    "#FFBB28",
    "#FF4444",
  ];

  return (
    <div className="bg-zinc-900 p-6 rounded-2xl mt-8">

      <h2 className="text-3xl font-bold mb-6 text-white">
        Expense Analytics
      </h2>

      {
        expenses.length === 0 ? (

          <p className="text-zinc-400">
            Add expenses to view analytics.
          </p>

        ) : (

          <div className="w-full h-64">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={categoryData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  label
                >
                  {
                    categoryData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))
                  }
                </Pie>

                <Tooltip />
                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

        )
      }

    </div>
  );
}

export default Analytics;