import { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ReTooltip,
  Legend,
} from "recharts";
import {
  IndianRupee,
  ShoppingCart,
  Package,
  TrendingUp,
  RefreshCw,
} from "lucide-react";
import { getOrderAnalytics } from "@/store/order-slice/analyticsSlice";
import MetaData from "../extras/MetaData";

// Palette for the status pie / bars (kept small and readable on dark + light).
const STATUS_COLORS = {
  PENDING: "#f59e0b",
  SHIPPED: "#3b82f6",
  DELIVERED: "#10b981",
  CANCELLED: "#ef4444",
  UNKNOWN: "#9ca3af",
};
const PIE_FALLBACK = ["#6366f1", "#8b5cf6", "#ec4899", "#14b8a6", "#f97316"];

const formatCurrency = (value) => {
  const n = Number(value) || 0;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
};

const formatNumber = (value) =>
  new Intl.NumberFormat("en-IN").format(Number(value) || 0);

// Reusable summary card.
const StatCard = ({ icon: Icon, label, value, accent }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 flex items-center gap-4">
    <div
      className={`shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${accent}`}
    >
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div className="min-w-0">
      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
        {label}
      </p>
      <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white truncate">
        {value}
      </p>
    </div>
  </div>
);

StatCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  accent: PropTypes.string.isRequired,
};

// Reusable chart frame with title + graceful empty state.
const ChartCard = ({ title, subtitle, isEmpty, emptyText, children }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
    <div className="mb-3">
      <h3 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-100">
        {title}
      </h3>
      {subtitle ? (
        <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
      ) : null}
    </div>
    {isEmpty ? (
      <div className="h-[260px] flex items-center justify-center text-center text-gray-400 dark:text-gray-500 text-sm">
        {emptyText}
      </div>
    ) : (
      <div className="h-[260px] w-full">{children}</div>
    )}
  </div>
);

ChartCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  isEmpty: PropTypes.bool,
  emptyText: PropTypes.string,
  children: PropTypes.node,
};

const AdminAnalytics = () => {
  const dispatch = useDispatch();
  const { analytics, loading, error } = useSelector(
    (state) => state.adminAnalytics
  );

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [interval, setIntervalValue] = useState("day");

  useEffect(() => {
    dispatch(getOrderAnalytics({ interval }));
    // initial load only; subsequent loads happen via Apply / interval change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleApply = () => {
    dispatch(getOrderAnalytics({ startDate, endDate, interval }));
  };

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setIntervalValue("day");
    dispatch(getOrderAnalytics({ interval: "day" }));
  };

  const handleIntervalChange = (next) => {
    setIntervalValue(next);
    dispatch(getOrderAnalytics({ startDate, endDate, interval: next }));
  };

  const summary = analytics?.summary;
  const revenueTrend = useMemo(
    () => analytics?.revenueTrend || [],
    [analytics]
  );
  const orderGrowth = useMemo(() => analytics?.orderGrowth || [], [analytics]);
  const topProducts = useMemo(() => analytics?.topProducts || [], [analytics]);
  const statusDistribution = useMemo(
    () => analytics?.statusDistribution || [],
    [analytics]
  );

  const hasAnyData =
    (summary?.totalOrders || 0) > 0 ||
    revenueTrend.length > 0 ||
    orderGrowth.length > 0 ||
    topProducts.length > 0;

  return (
    <div className="space-y-4">
      <MetaData
        title="Order Analytics - Admin | Faith & Fast"
        description="Sales, revenue trends, top-selling products and order growth analytics for administrators."
        keywords="admin, analytics, sales, revenue, orders, dashboard"
      />

      {/* Header + date-range controls */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              Order Analytics
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Sales performance, revenue trends, top products and order growth.
            </p>
          </div>

          <div className="flex flex-wrap items-end gap-3">
            <div className="flex flex-col">
              <label className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                From
              </label>
              <input
                type="date"
                value={startDate}
                max={endDate || undefined}
                onChange={(e) => setStartDate(e.target.value)}
                className="px-2 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-gray-100"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                To
              </label>
              <input
                type="date"
                value={endDate}
                min={startDate || undefined}
                onChange={(e) => setEndDate(e.target.value)}
                className="px-2 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-gray-100"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Group by
              </label>
              <select
                value={interval}
                onChange={(e) => handleIntervalChange(e.target.value)}
                className="px-2 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-gray-100"
              >
                <option value="day">Day</option>
                <option value="month">Month</option>
              </select>
            </div>
            <button
              onClick={handleApply}
              className="px-3 py-1.5 rounded-md bg-yellow-400 hover:bg-yellow-500 dark:bg-red-600 dark:hover:bg-red-700 text-sm font-medium text-gray-900 dark:text-white"
            >
              Apply
            </button>
            <button
              onClick={handleReset}
              className="px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center gap-1"
            >
              <RefreshCw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Loading / error / empty / content */}
      {loading ? (
        <div className="flex justify-center py-20">
          <CircularProgress />
        </div>
      ) : error ? (
        <p className="text-center text-red-500 py-16 text-sm sm:text-base">
          {error}
        </p>
      ) : !hasAnyData ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-16 text-sm sm:text-base">
          No order data available for the selected range yet. Once orders start
          coming in, your analytics will appear here.
        </div>
      ) : (
        <>
          {/* Summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <StatCard
              icon={IndianRupee}
              label="Total Sales"
              value={formatCurrency(summary?.totalRevenue)}
              accent="bg-emerald-500"
            />
            <StatCard
              icon={ShoppingCart}
              label="Total Orders"
              value={formatNumber(summary?.totalOrders)}
              accent="bg-blue-500"
            />
            <StatCard
              icon={TrendingUp}
              label="Avg Order Value"
              value={formatCurrency(summary?.averageOrderValue)}
              accent="bg-purple-500"
            />
            <StatCard
              icon={Package}
              label="Units Sold"
              value={formatNumber(summary?.totalUnits)}
              accent="bg-amber-500"
            />
          </div>

          {/* Charts grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {/* Revenue trend */}
            <ChartCard
              title="Revenue Trend"
              subtitle="Sales over time (excludes cancelled orders)"
              isEmpty={revenueTrend.length === 0}
              emptyText="No revenue in this range."
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={revenueTrend}
                  margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb33" />
                  <XAxis
                    dataKey="period"
                    tick={{ fontSize: 11 }}
                    stroke="#9ca3af"
                  />
                  <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" width={48} />
                  <ReTooltip
                    formatter={(value) => formatCurrency(value)}
                    contentStyle={{ fontSize: 12 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    name="Revenue"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Order growth */}
            <ChartCard
              title="Order Growth"
              subtitle="Order volume over time (all orders)"
              isEmpty={orderGrowth.length === 0}
              emptyText="No orders in this range."
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={orderGrowth}
                  margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="orderGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.6} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb33" />
                  <XAxis
                    dataKey="period"
                    tick={{ fontSize: 11 }}
                    stroke="#9ca3af"
                  />
                  <YAxis
                    tick={{ fontSize: 11 }}
                    stroke="#9ca3af"
                    width={36}
                    allowDecimals={false}
                  />
                  <ReTooltip contentStyle={{ fontSize: 12 }} />
                  <Area
                    type="monotone"
                    dataKey="orders"
                    name="Orders"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    fill="url(#orderGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Top products */}
            <ChartCard
              title="Top-Selling Products"
              subtitle="By units sold (top 5)"
              isEmpty={topProducts.length === 0}
              emptyText="No product sales yet."
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={topProducts}
                  layout="vertical"
                  margin={{ top: 8, right: 16, left: 8, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb33" />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 11 }}
                    stroke="#9ca3af"
                    allowDecimals={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fontSize: 11 }}
                    stroke="#9ca3af"
                    width={110}
                  />
                  <ReTooltip
                    formatter={(value, key) =>
                      key === "revenue"
                        ? formatCurrency(value)
                        : formatNumber(value)
                    }
                    contentStyle={{ fontSize: 12 }}
                  />
                  <Bar
                    dataKey="unitsSold"
                    name="Units sold"
                    fill="#8b5cf6"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Status distribution */}
            <ChartCard
              title="Order Status Distribution"
              subtitle="Share of orders by status"
              isEmpty={statusDistribution.length === 0}
              emptyText="No orders in this range."
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    dataKey="count"
                    nameKey="status"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label={(entry) => `${entry.status}: ${entry.count}`}
                    labelLine={false}
                    fontSize={11}
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell
                        key={entry.status}
                        fill={
                          STATUS_COLORS[entry.status] ||
                          PIE_FALLBACK[index % PIE_FALLBACK.length]
                        }
                      />
                    ))}
                  </Pie>
                  <ReTooltip
                    formatter={(value) => formatNumber(value)}
                    contentStyle={{ fontSize: 12 }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminAnalytics;
